<script>
  import '../app.css';
  import { page } from '$app/state';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

{#if !page.url.pathname.startsWith('/admin')}
    <Navbar />
{/if}

<slot { ...$$props}/>

{#if !page.url.pathname.startsWith('/admin')}
    <Footer />
{/if}
