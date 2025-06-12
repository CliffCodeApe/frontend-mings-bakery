<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { user, loadUserFromStorage } from '$lib/stores/user';
    import { goto } from '$app/navigation';
    import ShoppingCartModal from '$lib/components/ShoppingCartModal.svelte';

    let showCart = false;
    
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        user.set(null);
        goto('/auth/login');
    }

    onMount(() => {
        loadUserFromStorage();
    });

    // Navigation items
    const navItems = [
        { path: '/', name: 'Home' },
        { path: '/products', name: 'Products' },
        { path: '/about', name: 'About' }
    ];
</script>

<nav class="w-full flex justify-between items-center px-8 py-4 bg-gray-100 shadow">
    <div class="logo">
        <a href="/" class="text-2xl font-bold text-gray-800 no-underline">Ming's Bakery</a>
    </div>

    <div class="nav-items flex gap-6">
        {#each navItems as item}
            <a
                href={item.path}
                class="px-3 py-2 rounded transition-colors duration-200 text-gray-700 hover:bg-gray-200 hover:text-gray-900 {$page.url.pathname === item.path ? 'bg-gray-200 font-semibold' : ''}"
            >
                {item.name}
            </a>
        {/each}
    </div>

    <div class="auth-section flex gap-4 items-center">
        {#if $user}
            <span class="italic text-gray-600">Welcome, {$user.name}</span>
            <button class="px-3 py-2 rounded transition-colors duration-200 text-gray-700 hover:bg-gray-200 hover:text-gray-900" on:click={logout}>Logout</button>
            <a 
                href="/cart" 
                class="px-3 py-2 rounded text-yellow-700 hover:bg-yellow-100" 
                title="Cart"
                aria-label="Cart"
                on:click|preventDefault={() => showCart = true}
            >
                <svg class="inline w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                </svg>
            </a>
            {#if showCart}
                <ShoppingCartModal on:click_outside={() => showCart = false} />
            {/if}
        {:else}
            <a
                href="/auth/login"
                class="px-3 py-2 rounded transition-colors duration-200 text-gray-700 hover:bg-gray-200 hover:text-gray-900 { $page.url.pathname === '/auth/login' ? 'bg-gray-200 font-semibold' : '' }"
            >
                Login
            </a>
        {/if}
    </div>
</nav>