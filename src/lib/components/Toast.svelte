<script lang="ts">
  import { toast } from '$lib/stores/toast';

  let message = '';
  let show = false;

  toast.subscribe(value => {
    message = value.message;
    show = value.show;
  });
</script>

{#if show}
  <div class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 z-50 flex items-center">
    <span class="flex-1">{message}</span>
    <button
      class="ml-4 text-white hover:text-gray-200 focus:outline-none text-lg font-bold"
      aria-label="Close"
      on:click={() => show = false}
    >
      &times;
    </button>
  </div>
{/if}