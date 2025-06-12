import { writable } from 'svelte/store';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export const cartItems = writable<CartItem[]>([]);