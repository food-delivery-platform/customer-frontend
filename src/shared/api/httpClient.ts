import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function httpClient<TResponse>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  try {
    const response = await client.request<TResponse>({ ...config, url: path });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(`Request failed with status ${err.response.status}`);
    }

    throw err;
  }
}
