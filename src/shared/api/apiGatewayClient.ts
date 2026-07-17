import axios from "axios";
import type { AxiosRequestConfig } from "axios";
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

function assertRelativePath(path: string) {
  if (/^[a-z][a-z\d+\-.]*:/i.test(path)) {
    throw new Error("API Gateway request paths must be relative");
  }
}

function getApiGatewayClient() {
  if (!API_GATEWAY_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_GATEWAY_URL is not configured");
  }

  return axios.create({
    baseURL: API_GATEWAY_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function throwApiGatewayError(err: unknown): never {
  if (axios.isAxiosError(err) && err.response) {
    const { status } = err.response;

    if (status === 401) {
      throw new ApiGatewayRequestError("API Gateway authentication failed", 401, "Authentication");
    }

    if (status === 403) {
      throw new ApiGatewayRequestError("API Gateway request forbidden", 403, "Forbidden");
    }

    throw new ApiGatewayRequestError(
      `API Gateway request failed with status ${status}`,
      status,
      "Request",
    );
  }

  throw err;
}

function unwrapResponseData<TResponse>(response: { status: number; data: unknown }): TResponse {
  if (response.status === 204 || response.data === "") {
    return undefined as TResponse;
  }

  return response.data as TResponse;
}

export async function apiGatewayPublicRequest<TResponse>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  assertRelativePath(path);

  try {
    const response = await getApiGatewayClient().request<TResponse>({ ...config, url: path });

    return unwrapResponseData<TResponse>(response);
  } catch (err) {
    throwApiGatewayError(err);
  }
}

export async function apiGatewayProtectedRequest<TResponse>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  assertRelativePath(path);

  const session = await getSession();
  const googleIdToken = session?.googleIdToken;

  if (!googleIdToken) {
    throw new Error("Google ID token is required for protected API Gateway requests");
  }

  try {
    const response = await getApiGatewayClient().request<TResponse>({
      ...config,
      url: path,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${googleIdToken}`,
      },
    });

    return unwrapResponseData<TResponse>(response);
  } catch (err) {
    throwApiGatewayError(err);
  }
}
