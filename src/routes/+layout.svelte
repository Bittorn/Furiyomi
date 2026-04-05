<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '$lib/app.scss';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Furiyomi</title>
</svelte:head>

{#if !page.url.pathname.includes('/reader')}
	<Sidebar />
{/if}

{@render children()}
