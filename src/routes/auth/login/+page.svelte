<script lang="ts">
    import { onMount } from 'svelte';
    
    let email = '';
    let password = '';
    let formError = '';
    let successMessage = '';
    let isLoading = false;
    
    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('success') === '1') {
            successMessage = 'User registered successfully. Please log in.';
        }
    });

    async function handleSubmit() {
        formError = '';
        isLoading = true;
        try {
            const res = await fetch('mings-bakery-production.up.railway.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.errors) {
                    formError = data.errors;
                } else {
                    formError = data.message || 'Login failed.';
                }
                return;
            }

            // Save JWT token to localStorage (or cookie if you prefer)
            if (data.token && data.user) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // assuming your backend returns user info

                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;

                if (data.user.is_admin) {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/';
                }
            } else {
                formError = 'No token received from server.';
            }
        } catch (error: any) {
            formError = error.message || 'An error occurred.';
        } finally {
            isLoading = false;
        }
    }
</script>


<div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="flex flex-col md:flex-row bg-white rounded shadow-lg max-w-4xl w-full overflow-hidden">
        <div class="md:w-1/2 p-8 flex flex-col justify-center">
            {#if successMessage}
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
                    {successMessage}
                </div>
            {/if}
            <a href="/" class="block mb-4">
                <h1 class="text-center text-3xl font-bold text-yellow-700" id="logo">Ming's Bakery</h1>
            </a>
            <h2 class="text-center text-2xl font-semibold mb-6">Login</h2>
            {#if formError}
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
                    {formError}
                </div>
            {/if}
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div>
                    <label for="email" class="block text-gray-700 mb-1">Email</label>
                    <input name="email" type="email" id="email" bind:value={email} required
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                    <label for="password" class="block text-gray-700 mb-1">Password</label>
                    <input name="password" type="password" id="password" bind:value={password} required
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <button type="submit"
                    class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition flex items-center justify-center"
                    disabled={isLoading}>
                    {#if isLoading}
                        <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        Signing In...
                    {:else}
                        Sign In
                    {/if}
                </button>
            </form>
            <p class="text-center mt-4 text-gray-600">
                <a href="/auth/register" class="text-yellow-700 hover:underline">Or Create an account</a>
            </p>
        </div>
        <div class="md:w-1/2 flex items-center justify-center bg-yellow-50 p-0">
            <img src="../../../asset/img/bg.png" alt="Ming's Bakery" class="object-cover w-full h-full rounded-r" />
        </div>
    </div>
</div>