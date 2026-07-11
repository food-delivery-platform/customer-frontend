import { getSession } from "next-auth/react";

const API_GATEWAY_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

type ApiGatewayErrorKind = "Authentication" | "Forbidden" | "Request";

export class ApiGatewayRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly kind: ApiGatewayErrorKind,
  ) {
    super(message);
    this.name = "ApiGatewayRequestError";
  }
}

function getApiGatewayUrl(path: string) {
  if (!API_GATEWAY_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_GATEWAY_URL is not configured");
  }

  if (/^[a-z][a-z\d+\-.]*:/i.test(path)) {
    throw new Error("API Gateway request paths must be relative");
  }

  const baseUrl = API_GATEWAY_BASE_URL.endsWith("/")
    ? API_GATEWAY_BASE_URL
    : `${API_GATEWAY_BASE_URL}/`;
  const relativePath = path.startsWith("/") ? path.slice(1) : path;

  return new URL(relativePath, baseUrl).toString();
}

function getRequestHeaders(headers?: HeadersInit) {
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  return requestHeaders;
}

async function parseJsonResponse<TResponse>(response: Response): Promise<TResponse> {
  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiGatewayRequestError("API Gateway authentication failed", 401, "Authentication");
    }

    if (response.status === 403) {
      throw new ApiGatewayRequestError("API Gateway request forbidden", 403, "Forbidden");
    }

    throw new ApiGatewayRequestError(
      `API Gateway request failed with status ${response.status}`,
      response.status,
      "Request",
    );
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const body = await response.text();

  if (!body) {
    return undefined as TResponse;
  }

  return JSON.parse(body) as TResponse;
}

export async function apiGatewayPublicRequest<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(getApiGatewayUrl(path), {
    ...init,
    headers: getRequestHeaders(init?.headers),
  });

  return parseJsonResponse<TResponse>(response);
}

export async function apiGatewayProtectedRequest<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const session = await getSession();
  const googleIdToken = session?.googleIdToken;

  if (!googleIdToken) {
    throw new Error("Google ID token is required for protected API Gateway requests");
  }

  const headers = getRequestHeaders(init?.headers);
  headers.set("Authorization", `Bearer ${googleIdToken}`);

  const response = await fetch(getApiGatewayUrl(path), {
    ...init,
    headers,
  });

  return parseJsonResponse<TResponse>(response);
}
