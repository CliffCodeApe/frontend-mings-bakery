<script lang="ts">
  import { cartItems } from '$lib/stores/cart';
  import { orders } from '$lib/stores/order';
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  let activeTab: 'cart' | 'orders' = 'cart';
    let deliveryAddress = '';
  let orderType: 'pickup' | 'delivery' = 'pickup';
  let scheduledDate = new Date().toISOString().split('T')[0];
  const dispatch = createEventDispatcher();

  // Fetch user orders when switching to "orders" tab
  async function fetchOrders() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch('mings-bakery-production.up.railway.app/api/orders/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      orders.set(data.orders ?? []);
    }
  }

  function switchTab(tab: 'cart' | 'orders') {
    activeTab = tab;
    if (tab === 'orders') fetchOrders();
  }

  // Cart actions
  function updateQuantity(index: number, amount: number) {
    cartItems.update(items => {
      const updated = [...items];
      updated[index].quantity = Math.max(1, updated[index].quantity + amount);
      return updated;
    });
  }

  function removeItem(index: number) {
    cartItems.update(items => {
      const updated = [...items];
      updated.splice(index, 1);
      return updated;
    });
  }

async function checkout() {
  let items: any[] = [];
  const unsubscribe = cartItems.subscribe(val => items = val);
  unsubscribe();
  if (!items.length) return;
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in!');
    return;
  }
  if (!deliveryAddress || !orderType || !scheduledDate) {
    alert('Please fill all order details!');
    return;
  }
  const res = await fetch('mings-bakery-production.up.railway.app/api/orders/make', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      delivery_address: deliveryAddress,
      type: orderType,
      scheduled_date: scheduledDate,
      items: items.map(i => ({
        product_id: i.id,
        quantity: i.quantity
      }))
    })
  });
  if (res.ok) {
    cartItems.set([]);
    alert('Order placed!');
    switchTab('orders');
  } else {
    const err = await res.json().catch(() => ({}));
    alert(err.message || 'Failed to place order');
  }
}

  // Modal close logic
  function handleBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      dispatch('click_outside');
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      dispatch('click_outside');
    }
  }

    function handleBackgroundKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            dispatch('click_outside');
        }
    }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });
  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div
  class="fixed inset-0 backdrop-blur bg-opacity-40 flex items-center justify-center z-50"
  role="button"
  tabindex="0"
  aria-label="Close modal"
  on:click={handleBackgroundClick}
  on:keydown={handleBackgroundKeydown}
>
  <div
    class="bg-white rounded-lg shadow-lg w-full max-w-2xl"
    on:click|stopPropagation
    role="dialog"
    tabindex="0"
    aria-modal="true"
    on:keydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
      }
    }}
  >
    <div class="flex border-b">
      <button
        class="flex-1 py-3 text-center font-semibold focus:outline-none hover:bg-gray-100 transition-colors"
        class:selected={activeTab === 'cart'}
        on:click={() => switchTab('cart')}
        aria-current={activeTab === 'cart' ? 'page' : undefined}
      >Current Order</button>
      <button
        class="flex-1 py-3 text-center font-semibold focus:outline-none hover:bg-gray-100 transition-colors"
        class:selected={activeTab === 'orders'}
        on:click={() => switchTab('orders')}
        aria-current={activeTab === 'orders' ? 'page' : undefined}
      >Order History</button>
    </div>
    <div class="mb-4 space-y-2">
  <label class="block">
    <span class="text-sm font-medium">Delivery Address</span>
    <input
      class="mt-1 block w-full border rounded px-2 py-1"
      bind:value={deliveryAddress}
      placeholder="Enter delivery address"
      required
    />
  </label>
  <label class="block">
    <span class="text-sm font-medium">Type</span>
    <select
      class="mt-1 block w-full border rounded px-2 py-1"
      bind:value={orderType}
      required
    >
      <option value="pickup">Pickup</option>
      <option value="delivery">Delivery</option>
    </select>
  </label>
  <label class="block">
    <span class="text-sm font-medium">Scheduled Date</span>
    <input
      type="date"
      class="mt-1 block w-full border rounded px-2 py-1"
      bind:value={scheduledDate}
      min={new Date().toISOString().split('T')[0]}
      required
    />
  </label>
</div>
    <div class="p-6">
      {#if activeTab === 'cart'}
        {#if $cartItems.length > 0}
          <ul>
            {#each $cartItems as item, index}
              <li class="flex justify-between items-center py-2 border-b">
                <div>
                  <div class="font-semibold">{item.title}</div>
                  <div class="text-sm text-gray-500">Rp {item.price}</div>
                </div>
                <div class="flex items-center gap-2">
                  <button class="px-2" on:click={() => updateQuantity(index, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button class="px-2" on:click={() => updateQuantity(index, 1)}>+</button>
                  <button class="ml-4 text-red-500" on:click={() => removeItem(index)}>Remove</button>
                </div>
              </li>
            {/each}
          </ul>
          <div class="mt-4 flex justify-between items-center">
            <span class="font-bold">Total: Rp {$cartItems.reduce((t, i) => t + i.price * i.quantity, 0)}</span>
            <button class="bg-green-500 text-white px-4 py-2 rounded" on:click={checkout}>Checkout</button>
          </div>
        {:else}
          <p class="text-center text-gray-500">Your cart is empty.</p>
        {/if}
      {:else}
        {#if $orders.length > 0}
          <ul>
            {#each $orders as order}
              <li class="mb-4 border-b pb-2">
                <div class="flex justify-between">
                  <span class="font-semibold">Order #{order.id}</span>
                  <span class="capitalize">{order.status}</span>
                </div>
                <div class="text-sm text-gray-500">Total: Rp {order.total} | {order.scheduled_date}</div>
                <ul class="ml-4 mt-2 text-sm">
                  {#each order.items ?? [] as item}
                    <li>- {item.product?.name} x {item.quantity}</li>
                  {/each}
                </ul>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="text-center text-gray-500">No orders found.</p>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  button[selected], button[class~="selected"] {
    border-bottom: 2px solid #38a169;
    color: #38a169;
    background: #f0fff4;
  }
</style>