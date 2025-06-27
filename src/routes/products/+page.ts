import type { PageLoad } from './$types';
import type { Product } from '$lib/stores/product';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch('https://mings-bakery-production.up.railway.app/api/products');
    const response = await res.json();
    console.log(response);

    if (!res.ok) {
      throw error(res.status, {
        message: response.message || 'Failed to fetch products'
      });
    }

    if (!response?.data || !Array.isArray(response.data)) {
      throw error(500, { message: 'Invalid response format' });
    }

    return { products: response.data as Product[] };
  } catch (err) {
    if (err instanceof Error) {
      throw error(500, { message: err.message });
    }
    throw error(500, { message: 'Unknown error occurred' });
  }
};