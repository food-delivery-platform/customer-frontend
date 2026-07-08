import { httpClient } from "@/shared/api/httpClient";
import type { Order } from "../model/Order";

export function getOrders() {
  return httpClient<Order[]>("/orders");
}
