<script lang="ts">
	import styles from './Reader.module.scss';
	import Page from './Page.svelte';
	import type { Mokuro } from '$lib/db/mokuro';
	import { betterPrintWarning } from '$lib/logs/logger';

	const sig = 'components/reader';

	interface ReaderInterface {
		mokuro: Mokuro;
	}

	let { mokuro }: ReaderInterface = $props();

	let leftScreen, rightScreen, leftPage, rightPage: HTMLAnchorElement;

	let pagesContainer: HTMLDivElement;

	// svelte-ignore state_referenced_locally
	if (mokuro.pages.length == 0) {
		betterPrintWarning('Mokuro has no pages', sig)
	}
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<a bind:this={leftScreen} id={styles.leftScreen} title="Go left a screen"></a>
<!-- svelte-ignore a11y_missing_attribute -->
<a bind:this={rightScreen} id={styles.rightScreen} title="Go right a screen"></a>

<div bind:this={pagesContainer} id={styles.pagesContainer}>

	{#each mokuro.pages as page (page.img_path)}
		<Page {page}/>
	{/each}

	<!-- svelte-ignore a11y_missing_attribute -->
	<a bind:this={leftPage} id={styles.leftPage} title="Go left a page"></a>
	<!-- svelte-ignore a11y_missing_attribute -->
	<a bind:this={rightPage} id={styles.rightPage} title="Go right a page"></a>
</div>
