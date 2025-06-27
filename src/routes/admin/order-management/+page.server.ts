import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Order } from '$lib/stores/order';

export const load: PageServerLoad = async ({cookies}) => {
    const token = cookies.get('token');
    if (!token) {
        throw error(401, { message: 'Unauthorized' });
    }

    const res = await fetch('mings-bakery-production.up.railway.app/api/orders/all', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw error(res.status, {
        message: errorData.message || 'Failed to fetch orders'
      });
    }

    const response = await res.json();
    
    if (!response?.orders || !Array.isArray(response.orders)) {
      throw error(500, { message: 'Invalid response format' });
    }

    return { orders: response.orders as Order[] };
};