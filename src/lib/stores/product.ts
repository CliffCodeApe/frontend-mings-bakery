export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  category: string;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}