import type { PageLoad } from './$types';
import type { Product } from '$lib/stores/product';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch('mings-bakery-production.up.railway.app/api/products');
    
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

    return { products: response.data as Product[]};
  } catch (err) {
    if (err instanceof Error) {
      throw error(500, { message: err.message });
    }
    throw error(500, { message: 'Unknown error occurred' });
  }
};