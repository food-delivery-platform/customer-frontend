import { httpClient } from "@/shared/api/httpClient";
import type { Order } from "../model/order";

export function getOrders() {
  return httpClient<Order[]>("/orders");
}
