<script lang="ts">
  export let open = false;
  export let onConfirm: () => void;
  export let onCancel: () => void;
  export let productName: string = '';
</script>

{#if open}
  <div class="fixed inset-0 backdrop-blur bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded shadow-lg p-6 w-full max-w-sm">
      <h3 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
      <p class="mb-6">Yakin ingin menghapus produk <span class="font-bold">{productName}</span>?</p>
      <div class="flex justify-end gap-2">
        <button class="px-4 py-2 rounded bg-gray-300" on:click={onCancel}>Batal</button>
        <button class="px-4 py-2 rounded bg-red-500 text-white" on:click={onConfirm}>Hapus</button>
      </div>
    </div>
  </div>
{/if}