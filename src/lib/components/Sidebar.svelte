<script>
    export let activePage = "";

    function logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // If you use a user store, reset it here as well
      window.location.href = '/auth/login';
    }
    
</script>

<div class="fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg flex flex-col p-6 z-30">
    <h4 class="mb-8 text-xl font-bold text-yellow-700"><a href="/">Ming's Bakery</a></h4>
    <ul class="flex flex-col gap-2">
        <li>
            <a href="/admin" class="flex items-center px-4 py-2 rounded transition-colors
                text-gray-700 hover:bg-yellow-50 hover:text-yellow-700
                {activePage === 'dashboard' ? 'bg-yellow-100 font-semibold text-yellow-700' : ''}">
                <span class="material-icons-outlined mr-3 text-xl">dashboard</span>
                Dashboard
            </a>
        </li>
        <li>
            <a href="/admin/order-management" class="flex items-center px-4 py-2 rounded transition-colors
                text-gray-700 hover:bg-yellow-50 hover:text-yellow-700
                {activePage === 'order-management' ? 'bg-yellow-100 font-semibold text-yellow-700' : ''}">
                <span class="material-icons-outlined mr-3 text-xl">assignment_turned_in</span>
                Manajemen Pesanan
            </a>
        </li>
        <li>
            <a href="/admin/product-management" class="flex items-center px-4 py-2 rounded transition-colors
                text-gray-700 hover:bg-yellow-50 hover:text-yellow-700
                {activePage === 'product-management' ? 'bg-yellow-100 font-semibold text-yellow-700' : ''}">
                <span class="material-icons-outlined mr-3 text-xl">inventory_2</span>
                Manajemen Produk
            </a>
        </li>
        <li>
            <button on:click={logout} class="flex items-center px-4 py-2 rounded transition-colors
                text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 w-full text-left">
                <span class="material-icons-outlined mr-3 text-xl">logout</span>
                Logout
            </button>
        </li>
    </ul>
</div>