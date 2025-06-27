import { writable } from 'svelte/store';

export const user = writable<{ name: string } | null>(null);

export async function loadUserFromStorage() {
    const token = localStorage.getItem('token');
    if (!token) {
        user.set(null);
        return;
    }

    try {
        const res = await fetch('https://mings-bakery-production.up.railway.app/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (res.ok && data.user) {
            user.set(data.user);
            // Simpan ke localStorage jika ingin
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            user.set(null);
            localStorage.removeItem('user');
        }
    } catch {
        user.set(null);
        localStorage.removeItem('user');
    }
}