<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Furiyomi</title>
</svelte:head>

<NavBar />

{@render children()}
