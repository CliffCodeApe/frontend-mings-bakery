import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Order } from '$lib/stores/order';

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('token');
    if (!token) {
        throw error(401, { message: 'Unauthorized' });
    }

    const res = await fetch('https://mings-bakery-production.up.railway.app/api/orders/all', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const response = await res.json();

    if (!res.ok) {
        throw error(res.status, {
            message: response.message || 'Failed to fetch orders'
        });
    }

    if (!response?.orders || !Array.isArray(response.orders)) {
        throw error(500, { message: 'Invalid response format' });
    }

    return { orders: response.orders as Order[] };
};