<script lang="ts">
	import type { Product } from './+page.ts';
  export let data: { products: Product[] };
  
</script>

<slot {data} />