import type { AxiosRequestConfig } from "axios";
import { apiGatewayProtectedRequest } from "@/shared/api/apiGatewayClient";
import type { Order } from "../model/Order";

export function getOrders(config?: AxiosRequestConfig) {
  return apiGatewayProtectedRequest<Order[]>("/orders", config);
}
