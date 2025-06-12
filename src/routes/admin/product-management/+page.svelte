<script lang="ts">
  import { invalidate } from '$app/navigation';
  import type { Product } from '$lib/stores/product';
  import { onMount } from 'svelte';

  import AddProductModal from '$lib/components/CreateProductModal.svelte';
  import EditProductModal from '$lib/components/EditProductModal.svelte';
	import DeleteModal from '$lib/components/DeleteProductModal.svelte';

  import { showPopup } from '$lib/stores/toast';

  let token: string | null = null;

  onMount(() => {
    token = localStorage.getItem('token');
  })

  export let data: { products: Product[] };
  $: products = data.products;

  let showAddModal = false;

  function openAddModal() { showAddModal = true; }
  function closeAddModal() { showAddModal = false; }

  async function handleCreate(event: CustomEvent<{name: string; price: string; description: string; category: string; image?: File }>) {
    const { name, price, description, category, image } = event.detail;
    if (!token) {
      alert('Token tidak ditemukan!');
      return;
    }

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('token', token);

    if (image) formData.set('image', image);

    const res = await fetch(`?/create`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(JSON.stringify(data.errors || data.message || 'Gagal menambah produk'));
      return;
    }
    await invalidate('/admin/product-management');
    showPopup('Produk berhasil ditambahkan!');
    closeAddModal();
  }

  let showEditModal = false;
  let productToEdit: Product | null = null;

  function openEditModal(product: Product) {
  productToEdit = product;
  showEditModal = true;
  }

  function closeEditModal() {
    showEditModal = false;
    productToEdit = null;
  }

  async function handleEditSave(event: CustomEvent<{ id: string; name: string; price: string; description: string; category: string; image?: File }>) {
    const { id, name, price, description, category, image } = event.detail;
    if (!id || !token) {
      alert('ID produk atau token tidak ditemukan!');
      return;
    }

    const formData = new FormData();
    formData.set('id', id);
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('token', token);

    if (image) formData.set('image', image);

    const res = await fetch(`?/edit`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(JSON.stringify(data.errors || data.message || 'Gagal mengedit produk'));
      return;
    }
    await invalidate('/admin/product-management');
    showPopup('Produk berhasil diubah!');
    closeEditModal();
  }

  let showDeleteModal = false;
  let productToDelete: Product | null = null;

   function openDeleteModal(product: Product) {
    productToDelete = product;
    showDeleteModal = true;
  }

  function closeDeleteModal() {
    showDeleteModal = false;
    productToDelete = null;
  }

  async function confirmDelete() {
    if (!productToDelete || !token){
      console.error('Product to delete or token is missing');
      return;
    }
    
    // Submit the delete form programmatically
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '?/delete';

    const idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.name = 'id';
    idInput.value = String(productToDelete.id);
    form.appendChild(idInput);

    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token';
    tokenInput.value = token ?? '';
    form.appendChild(tokenInput);

    document.body.appendChild(form);
    form.submit();
    showPopup('Produk berhasil dihapus!');
    closeDeleteModal();
  }

  
</script>

<div class="ml-[250px] p-8 bg-gray-50 min-h-screen">
  <h2 class="mb-4 text-2xl font-semibold">Manajemen Produk</h2>

  <!-- Form Tambah/Edit Produk -->
<button on:click={openAddModal} class="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded mb-4 cursor-pointer">Tambah Produk</button>

  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded shadow-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border-b border-gray-200 text-left">Nama Produk</th>
          <th class="px-4 py-2 border-b border-gray-200 text-left">Harga</th>
          <th class="px-4 py-2 border-b border-gray-200 text-left">Deskripsi</th>
          <th class="px-4 py-2 border-b border-gray-200 text-left">Kategori</th>
          <th class="px-4 py-2 border-b border-gray-200 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each products as product}
          <tr class="hover:bg-yellow-50">
            <td class="px-4 py-2 border-b border-gray-100">{product.name}</td>
            <td class="px-4 py-2 border-b border-gray-100">Rp {product.price}</td>
            <td class="px-4 py-2 border-b border-gray-100">
                {(product.description ?? '').length > 40
                ? (product.description ?? '').slice(0, 40) + '...'
                : (product.description ?? '')}
            </td>
            <td class="px-4 py-2 border-b border-gray-100">{product.category}</td>
            <td class="px-4 py-2 border-b border-gray-100 flex gap-2">
              <button
                type="button"
                class="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded transition-colors text-sm cursor-pointer"
                on:click={() => openEditModal(product)}
              >
                Edit
              </button>
              <button
                type="submit"
                class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition-colors text-sm cursor-pointer"
                on:click={() => openDeleteModal(product)}
              >
                Hapus
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <AddProductModal
    open={showAddModal}
    on:create={handleCreate}
    on:close={closeAddModal}
  />

  <EditProductModal
    open={showEditModal}
    product={productToEdit}
    on:save={handleEditSave}
    on:close={closeEditModal}
  />

  <DeleteModal
    open={showDeleteModal}
    productName={productToDelete?.name ?? ''}
    onConfirm={confirmDelete}
    onCancel={closeDeleteModal}
  />
</div>