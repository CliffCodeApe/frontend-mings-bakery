<script lang="ts">
  import ProductModal from '$lib/components/ProductModal.svelte';
  import type { Product } from './+page.ts';

  export let data: { products: Product[] };
  let selectedProduct: Product | null = null;
  
  function openProductModal(product: Product) {
    selectedProduct = product;
  }
  let search = "";

</script>

<div class="max-w-7xl mx-auto mt-10 px-4 flex flex-col md:flex-row gap-8">
  <!-- Sidebar -->
  <aside class="md:w-1/4 w-full mb-8 md:mb-0">
    <div class="bg-white rounded shadow p-6">
      <h5 class="text-lg font-semibold mb-4">What We Serve</h5>
      <ul class="space-y-2">
        <li><a href="#" class="hover:underline text-gray-700">All Products</a></li>
        <li><a href="#" class="hover:underline text-gray-700">Breads</a></li>
        <li><a href="#" class="hover:underline text-gray-700">Traditional Snacks</a></li>
        <li><a href="#" class="hover:underline text-gray-700">Cakes</a></li>
      </ul>
    </div>
  </aside>

  <!-- Product List -->
  <main class="flex-1">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h4 class="text-2xl font-bold">Our Products</h4>
      <input
        type="text"
        bind:value={search}
        class="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2"
        placeholder="Search products..."
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.products as product}
        <div class="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col">
          <button
            class="p-0 border-0 bg-transparent mb-4 focus:outline-none"
            on:click={() => openProductModal(product)}
            style="cursor: pointer;"
          >
            <img
              src={product.image_url}
              alt={product.name}
              class="w-full h-48 object-cover rounded"
            />
          </button>
          <div class="flex-1 flex flex-col items-center">
            <h5 class="text-lg font-semibold mb-1">{product.name}</h5>
            <p class="text-gray-500 text-sm mb-2">{product.category}</p>
            <p class="text-gray-700 font-bold mb-2">Rp {product.price}</p>
            <button
              class="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      {/each}
    </div>
  </main>

    {#if selectedProduct}
    <ProductModal
      title={selectedProduct.name}
      price={`Rp ${selectedProduct.price}`}
      imgSrc={selectedProduct.image_url ?? ''}
      description={selectedProduct.description ?? ''}
      on:close={() => (selectedProduct = null)}
    />
  {/if}
</div>