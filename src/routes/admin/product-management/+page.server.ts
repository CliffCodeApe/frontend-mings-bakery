import type {Actions} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import type { Product } from '$lib/stores/product';
import { error } from '@sveltejs/kit';


export const load: PageServerLoad = async () => {
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

    return { products: response.data as Product[]};
};

export const actions: Actions = {
    // Tambah produk
    create: async ({ request }) => {
        const formData = await request.formData();
        const token = formData.get('token') as string || '';
        if (!token) {
            throw error(401, 'Unauthorized: Token is required');
        }


        const price = Number(formData.get('price'));
      
        const backendForm = new FormData();
        backendForm.set('name', formData.get('name') as string);
        backendForm.set('price', price.toString());
        backendForm.set('description', formData.get('description') as string);
        backendForm.set('category', formData.get('category') as string);

        const image = formData.get('image');
        if (image && image instanceof File && image.name) {
            if (image.size > 2 * 1024 * 1024) {
                throw error(400, 'Bad Request: Image size must be less than 2MB');
            }

            backendForm.append('image', new File([image], image.name, { type: image.type }));
        }

        const res = await fetch('http://127.0.0.1:8000/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: backendForm
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw error(res.status, data.errors || data.message || 'Gagal menambah produk');
        }
        return { success: true, product: data.product };
    },

    edit: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const token = formData.get('token') as string || '';

        const price = Number(formData.get('price'));

        const backendForm = new FormData();
        if (formData.get('name')) backendForm.set('name', formData.get('name') as string);
        if (formData.get('price')) backendForm.set('price', price.toString());
        if (formData.get('description')) backendForm.set('description', formData.get('description') as string);
        if (formData.get('category')) backendForm.set('category', formData.get('category') as string);
        backendForm.set('_method', 'PUT');

        const image = formData.get('image');
        if (image && image instanceof File && image.name) {
            if (image.size > 2 * 1024 * 1024) {
                throw error(400, 'Bad Request: Image size must be less than 2MB');
            }

            backendForm.append('image', new File([image], image.name, { type: image.type }));
        }

        const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: backendForm
        });


        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw error(res.status, data.errors || data.message || 'Gagal mengedit produk');
        }
        return { success: true, product: data.product };
    },

    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const token = formData.get('token') as string || '';

        const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw error(res.status, data.errors || data.message || 'Gagal menghapus produk');
        }
        return { success: true };
    }
};