import type { AxiosRequestConfig } from "axios";
import { apiGatewayProtectedRequest } from "@/shared/api/apiGatewayClient";
import type { Order } from "../model/Order";

const ORDER_SERVICE_URL =
  process.env.NEXT_PUBLIC_ORDER_SERVICE_URL ?? "https://kgig1rjcpj.execute-api.us-east-1.amazonaws.com";

export function getOrders(config?: AxiosRequestConfig) {
  return apiGatewayProtectedRequest<Order[]>("/orders", config);
}

export type CreateOrderItem = {
  menuItemId: string;
  quantity: number;
};

export type DeliveryAddress = {
  street: string;
  city: string;
  postalCode: string;
  latitude?: number | null;
  longitude?: number | null;
  notes?: string | null;
};

export type CreateOrderRequest = {
  customerId: string;
  restaurantId: string;
  items: CreateOrderItem[];
  deliveryAddress: DeliveryAddress;
  deliveryAddressId?: string;
};

export type OrderServiceStatus =
  | "CREATED"
  | "PENDING_PAYMENT"
  | "PAID"
  | "READY"
  | "PICKED_UP"
  | "DELIVERED"
  | "PAYMENT_FAILED"
  | "CANCELLED"
  | "FAILED";

export type OrderServiceItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderServiceResponse = {
  orderId: string;
  customerId: string;
  restaurantId: string;
  status: OrderServiceStatus;
  items: OrderServiceItem[];
  total: number;
  createdAt: string | null;
  updatedAt: string | null;
};

export class OrderServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "OrderServiceError";
  }
}

export async function createOrder(
  request: CreateOrderRequest,
  googleIdToken?: string,
): Promise<OrderServiceResponse> {
  const response = await fetch(`${ORDER_SERVICE_URL}/api/v1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(googleIdToken ? { Authorization: `Bearer ${googleIdToken}` } : {}),
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    if (response.status === 501) {
      throw new OrderServiceError("The order service is not available yet. Please try again later.", 501);
    }

    const body = (await response.json().catch(() => null)) as { message?: string } | null;

    throw new OrderServiceError(
      body?.message ?? `Order request failed with status ${response.status}`,
      response.status,
    );
  }

  return response.json() as Promise<OrderServiceResponse>;
}
