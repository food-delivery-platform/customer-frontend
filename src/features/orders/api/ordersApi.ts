import { apiGatewayProtectedRequest } from "@/shared/api/apiGatewayClient";
import type { Order } from "../model/Order";

export function getOrders(init?: RequestInit) {
  return apiGatewayProtectedRequest<Order[]>("/orders", init);
}
