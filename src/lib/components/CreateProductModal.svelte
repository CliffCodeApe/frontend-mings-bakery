<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let open = false;

  const dispatch = createEventDispatcher();

  let name = '';
  let price: string | number = '';
  let description = '';
  let category = '';
  let image: File | null = null;
  let imagePreview: string | null = null;

  function handleFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    image = files && files.length > 0 ? files[0] : null;
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(image);
    } else {
      imagePreview = null;
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    dispatch('create', { name, price, description, category, image });
  }

  function handleClose() {
    dispatch('close');
    // Reset form jika perlu
    name = '';
    price = '';
    description = '';
    category = '';
    image = null;
    imagePreview = null;
  }
</script>

{#if open}
  <div class="fixed inset-0 backdrop-blur bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded shadow-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4">Tambah Produk</h3>
      <form on:submit={handleSubmit} class="flex flex-col gap-3">
        <input
          class="border px-3 py-2 rounded"
          name="name"
          placeholder="Nama Produk"
          bind:value={name}
          required
        />
        <input
          class="border px-3 py-2 rounded"
          name="price"
          type="number"
          placeholder="Harga"
          bind:value={price}
          required
        />
        <textarea
          class="border px-3 py-2 rounded"
          name="description"
          placeholder="Deskripsi"
          bind:value={description}
          required
          rows="3"
        ></textarea>
        <input
          class="border px-3 py-2 rounded"
          name="category"
          placeholder="Kategori"
          bind:value={category}
          required
        />
        <input
          class="border px-3 py-2 rounded"
          type="file"
          name="image"
          accept="image/*"
          on:change={handleFileChange}
        />
        {#if imagePreview}
          <img src={imagePreview} alt="Preview" class="w-32 h-32 object-cover rounded mx-auto border" />
        {/if}
        <div class="flex justify-end gap-2 mt-2">
          <button type="button" class="px-4 py-2 rounded bg-gray-300" on:click={handleClose}>Batal</button>
          <button type="submit" class="px-4 py-2 rounded bg-green-500 text-white">Tambah</button>
        </div>
      </form>
    </div>
  </div>
{/if}