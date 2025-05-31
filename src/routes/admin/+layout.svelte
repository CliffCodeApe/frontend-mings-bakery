<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!token || !userStr) {
            goto('/auth/login');
            return;
        }
        const user = JSON.parse(userStr);
        if (!user.is_admin) {
            goto('/');
        }
    });
</script>

<Sidebar activePage="" />

<slot />