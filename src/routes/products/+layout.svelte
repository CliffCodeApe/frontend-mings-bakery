<script lang="ts">
  import Toast from '$lib/components/Toast.svelte';
	import type { Product } from '$lib/stores/product';
  export let data: { products: Product[] };
  
</script>
<Toast />

<slot {data} />