export type Order = {
  id: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  total: number;
};
