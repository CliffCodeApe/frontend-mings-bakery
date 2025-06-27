<script lang="ts">
    let name = '';
    let email = '';
    let phone_number = '';
    let password = '';
    let password_confirmation = '';
    let formErrors: string[] = [];
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        formErrors = [];
        try {
            const res = await fetch('mings-bakery-production.up.railway.app/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone_number,
                    password,
                    password_confirmation
                })
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    formErrors = Object.values(data.errors).flat() as string[];
                } else {
                    formErrors = [data.message || 'Registration failed.'];
                }
                return;
            }

            // Registration successful
            window.location.href = '/auth/login?success=1';
        } catch (error: any) {
            formErrors = [error.message || 'An error occurred.'];
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="flex flex-col md:flex-row bg-white rounded shadow-lg max-w-4xl w-full overflow-hidden">
        <div class="md:w-1/2 p-8 flex flex-col justify-center">
            <a href="/" class="block mb-4">
                <h1 class="text-center text-3xl font-bold text-yellow-700" id="logo">Ming's Bakery</h1>
            </a>
            <h2 class="text-center text-2xl font-semibold mb-6">Register</h2>
            {#if formErrors.length}
                <ul class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-left list-disc list-inside">
                    {#each formErrors as err}
                        <li>{err}</li>
                    {/each}
                </ul>
            {/if}
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div>
                    <label for="firstName" class="block text-gray-700 mb-1">Your Name</label>
                    <input name="name" type="text" id="firstName" bind:value={name} required
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                    <label for="email" class="block text-gray-700 mb-1">Email</label>
                    <input name="email" type="email" id="email" bind:value={email} required
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                    <label for="phone" class="block text-gray-700 mb-1">Phone Number</label>
                    <input name="phone_number" type="text" id="phone" bind:value={phone_number} required
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                    <label for="password" class="block text-gray-700 mb-1">Password</label>
                    <input name="password" type="password" id="password" bind:value={password} required
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                    <label for="confirmPassword" class="block text-gray-700 mb-1">Confirm Password</label>
                    <input type="password" id="confirmPassword" bind:value={password_confirmation} required
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <button type="submit" disabled={isLoading}
                    class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition flex items-center justify-center">
                    {#if isLoading}
                        <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        Registering...
                    {:else}
                        Register
                    {/if}
                </button>
            </form>
            <p class="text-center mt-4 text-gray-600">
                If you already have an account, <a href="/auth/login" class="text-yellow-700 hover:underline">log in here</a>.
            </p>
        </div>
        <div class="md:w-1/2 flex items-center justify-center bg-yellow-50 p-0">
            <img src="../../../../asset/img/bg.png" alt="Ming's Bakery" class="object-cover w-full h-full rounded-r" />
        </div>
    </div>
</div>