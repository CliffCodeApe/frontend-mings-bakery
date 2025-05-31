<script lang="ts">
  import { onMount } from 'svelte';
  
  export let title: string = "Product Title";
  export let price: string = "Rp 0";
  export let imgSrc: string = "";
  export let description: string = "Product description goes here...";
  export let qty: number = 1;

  // Emit close event for parent to hide modal
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function changeQty(amount: number) {
    qty = Math.max(1, qty + amount);
  }

  function addToCart() {
    alert(`${qty} x ${title} added to cart!`);
    dispatch("add", { qty });
    dispatch("close");
  }

  function closeModal() {
    dispatch("close");
  }

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  
</script>

<!-- Modal Overlay -->
<div class="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 flex items-center justify-center" tabindex="-1" aria-modal="true" role="dialog">
  <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 relative">
    <!-- Close Button -->
    <button
      class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
      aria-label="Close"
      on:click={closeModal}
      type="button"
      tabindex="-1" 
      aria-modal="true" 
      role="dialog"
      aria-labelledby="modal-title"
    >&times;</button>
    <div class="flex flex-col md:flex-row gap-6 p-6">
      <div class="md:w-1/2 flex items-center justify-center">
        <img src={imgSrc} alt="Product Image" class="w-full h-64 object-cover rounded shadow" />
      </div>
      <div class="md:w-1/2 flex flex-col justify-between">
        <div>
          <h5 class="text-2xl font-bold mb-2">{title}</h5>
          <p class="mb-4 text-gray-700">{description}</p>
          <h4 class="text-xl font-semibold mb-4">{price}</h4>
        </div>
        <div class="flex items-center mb-4">
          <button class="px-3 py-1 rounded-l bg-gray-200 hover:bg-gray-300 text-lg" on:click={() => changeQty(-1)}>-</button>
          <input type="text" class="w-14 text-center border-y border-gray-300" value={qty} readonly />
          <button class="px-3 py-1 rounded-r bg-gray-200 hover:bg-gray-300 text-lg" on:click={() => changeQty(1)}>+</button>
        </div>
        <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded w-full transition" on:click={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>