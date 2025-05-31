import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export interface Product {
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

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/products');
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw error(res.status, {
        message: errorData.message || 'Failed to fetch products'
      });
    }

    const response = await res.json();
    
    if (!response?.data || !Array.isArray(response.data)) {
      throw error(500, { message: 'Invalid response format' });
    }

    return { products: response.data };
  } catch (err) {
    if (err instanceof Error) {
      throw error(500, { message: err.message });
    }
    throw error(500, { message: 'Unknown error occurred' });
  }
};