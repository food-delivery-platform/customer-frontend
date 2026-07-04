import type { OrderItem } from "./OrderItem";
import type { OrderStatus } from "./OrderStatus";

export type Order = {
  id: string;
  customerId: string;
  venueId: string;
  deliveryAddressId: string;
  courierId: string | null;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
  specialInstructions: string | null;
  estimatedDeliveryAt: string | null;
  restaurantConfirmationDeadline: string | null;
  cancelledReason: string | null;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
};
