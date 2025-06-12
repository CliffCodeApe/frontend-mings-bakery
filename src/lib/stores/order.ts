import { writable } from 'svelte/store';

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  product?: {
    id: number;
    name: string;
    // tambahkan field lain jika perlu
  };
};

export type Order = {
  id: number;
  user_id: number;
  delivery_address?: string;
  type: 'pickup' | 'delivery';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  scheduled_date: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    // field user lain jika perlu
  };
  items?: OrderItem[];
};

export const orders = writable<Order[]>([]);
export const selectedOrder = writable<Order | null>(null);