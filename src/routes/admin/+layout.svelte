<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Toast from '$lib/components/Toast.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let token: string | null = null;

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
<Toast />

<Sidebar activePage="" />

<slot />