<script lang="ts">
    
interface CartItem {
    title?: string;
    name?: string;
    price: number;
    quantity: number;
}

  export let cartItems: CartItem[] = [];

  // Function to update the quantity of an item
  function updateQuantity(index: number, amount: number) {
    cartItems[index].quantity = Math.max(1, cartItems[index].quantity + amount);
  }

  // Function to remove an item from the cart
  function removeItem(index: number) {
    cartItems.splice(index, 1);
  }

  // Calculate the total price of the cart
  $: totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle checkout (POST to backend)
  async function checkout() {
    try {
      const res = await fetch('http://localhost/api/backend/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems })
      });
      if (!res.ok) throw new Error('Checkout failed');
      alert('Checkout successful!');
      cartItems = [];
    } catch (e: any) {
      alert(e.message);
    }
  }
</script>

<!-- Modal Overlay -->
<div class="fixed inset-0 bg-black bg-opacity-40 z-40" style="display: {cartItems.length > 0 ? 'block' : 'none'}"></div>

<!-- Shopping Cart Modal -->
<div class="fixed inset-0 flex items-center justify-center z-50" style="display: {cartItems.length > 0 ? 'flex' : 'none'}">
  <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl">
    <div class="flex justify-between items-center border-b px-6 py-4">
      <h5 class="text-xl font-bold">Shopping Cart</h5>
      <button class="text-gray-500 hover:text-gray-700 text-2xl" on:click={() => cartItems = []}>&times;</button>
    </div>
    <div class="p-6">
      {#if cartItems.length > 0}
        <ul class="divide-y">
          {#each cartItems as item, index}
            <li class="flex justify-between items-center py-4">
              <div>
                <h6 class="font-semibold">{item.title || item.name}</h6>
                <p class="text-gray-500 text-sm">Price: Rp {item.price}</p>
              </div>
              <div class="flex items-center gap-2">
                <button class="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300" on:click={() => updateQuantity(index, -1)}>-</button>
                <input
                  type="text"
                  class="w-12 text-center border rounded"
                  value={item.quantity}
                  readonly
                />
                <button class="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300" on:click={() => updateQuantity(index, 1)}>+</button>
                <button class="ml-3 px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600" on:click={() => removeItem(index)}>Remove</button>
              </div>
            </li>
          {/each}
        </ul>
        <div class="mt-6 flex justify-between items-center">
          <h5 class="text-lg font-bold">Total: Rp {totalPrice}</h5>
          <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded" on:click={checkout}>Checkout</button>
        </div>
      {:else}
        <p class="text-center text-gray-500">Your cart is empty.</p>
      {/if}
    </div>
  </div>
</div>