export type Restaurant = {
  id: string;
  ownerId: string;
  addressId: string;
  name: string;
  slug: string | null;
  description: string | null;
  cuisineTags: string[];
  isOpen: boolean;
  rating: number | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
