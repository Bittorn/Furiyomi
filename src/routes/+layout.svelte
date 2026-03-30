<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '$lib/app.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="google" content="notranslate" />
	<title>Furiyomi</title>
</svelte:head>

<Sidebar />

{@render children()}
