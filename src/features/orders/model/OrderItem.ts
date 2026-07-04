export type OrderItem = {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  specialInstructions: string | null;
  menuItemName: string;
  createdAt: string;
};
