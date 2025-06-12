<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { showPopup } from '$lib/stores/toast';

  export let data: { orders: any[] };

  // Contoh update status (panggil endpoint PATCH/PUT)
  async function updateStatus(orderId: number, status: string) {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ status })
        });
            // Refresh data (invalidate jika pakai SvelteKit load)
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            alert(JSON.stringify(data.errors || data.message || 'Gagal update status'));
            return;
        }

        await invalidate('/admin/order-management');
        showPopup(`Status pesan berhasil diupdate ke ${status}`);
    }

</script>

<div class="ml-[250px] p-8 bg-gray-50 min-h-screen">
  <h2 class="mb-4 text-2xl font-semibold">Manajemen Pesanan</h2>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded shadow-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border-b border-gray-200 text-left">Nama Pelanggan</th>
          <th class="px-4 py-2 border-b border-gray-200 text-left">Total</th>
          <th class="px-4 py-2 border-b border-gray-200 text-left">Status</th>
          <th class="px-4 py-2 border-b border-gray-200 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each data.orders as order}
          <tr class="hover:bg-yellow-50">
            <td class="px-4 py-2 border-b border-gray-100">{order.user?.name ?? '-'}</td>
            <td class="px-4 py-2 border-b border-gray-100">Rp {order.total}</td>
            <td class="px-4 py-2 border-b border-gray-100 capitalize">{order.status}</td>
            <td class="px-4 py-2 border-b border-gray-100 flex gap-2">
              <button
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                on:click={() => updateStatus(order.id, 'completed')}
              >Selesaikan</button>
              <button
                class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                on:click={() => updateStatus(order.id, 'pending')}
              >Tunda</button>
              <button
                class="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
                on:click={() => updateStatus(order.id, 'cancelled')}
              >Cancel</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>