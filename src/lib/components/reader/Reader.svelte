<script lang="ts">
	import styles from './Reader.module.scss';
	import Page from './Page.svelte';
	import type { Mokuro } from '$lib/db/mokuro';
	import { betterPrintWarning } from '$lib/logs/logger';
	import { onMount } from 'svelte';

	const sig = 'components/reader';

	interface ReaderInterface {
		mokuro: Mokuro;
		images: string[];
	}

	let { mokuro, images }: ReaderInterface = $props();

	let leftScreen, rightScreen, leftPage, rightPage: HTMLAnchorElement;

	let pagesContainer: HTMLDivElement;

	let curPageIndex = 0;
	let curPage2Index = -1;

	const pages: HTMLElement[] = [];

	// svelte-ignore state_referenced_locally
	if (mokuro.pages.length == 0) {
		betterPrintWarning('Mokuro has no pages', sig);
	}

	onMount(() => {
		for (let i = 0; i < mokuro.pages.length; i++) {
			pages[i] = document.getElementById(`page-${i}`)!;
		}

		updatePage(curPageIndex);
	});

	function updateTransform() {
		let scale_x = window.innerWidth / pagesContainer.offsetWidth;
		let scale_y = window.innerHeight / pagesContainer.offsetHeight;
		let scale = Math.min(scale_x, scale_y);
		let offset = pagesContainer.clientWidth - mokuro.pages[curPageIndex].img_width / 2;

		if (curPage2Index == -1) {
			offset /= 3
		} else {
			offset /= 5
		}

		pagesContainer.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${offset}, 0)`;
	}

	function onKeyDown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowRight':
			case 'Right':
				prevPage();
				break;

			case 'ArrowLeft':
			case 'Left':
				nextPage();
				break;

			case 'Home':
				firstPage();
				break;

			case 'End':
				lastPage();
				break;

			case ' ':
				nextPage();
				break;
		}
	}

	function isPageFirstOfPair(pageIndex: number) {
		// if (state.singlePageView) {
		// 	return true;
		// } else {
		// 	if (state.hasCover) {
		return pageIndex === 0 || pageIndex % 2 === 1;
		// 	} else {
		// 		return page_idx % 2 === 0;
		// 	}
		// }
	}

	function firstPage() {
		updatePage(0);
	}

	function lastPage() {
		updatePage(pages.length - 1);
	}

	function prevPage() {
		updatePage(curPageIndex - 2);
	}

	function nextPage() {
		updatePage(curPageIndex + 2);
	}

	function updatePage(pageIndex: number) {
		pageIndex = Math.min(Math.max(pageIndex, 0), pages.length - 1);

		pages[curPageIndex].style.display = 'none';

		if (curPage2Index >= 0) {
			pages[curPage2Index].style.display = 'none';
		}

		if (isPageFirstOfPair(pageIndex)) {
			curPageIndex = pageIndex;
		} else {
			curPageIndex = pageIndex - 1;
		}

		pages[curPageIndex].style.display = 'inline-block';
		pages[curPageIndex].style.order = '2'; // it's a number, idiot

		if (pageIndex < pages.length - 1 && !isPageFirstOfPair(pageIndex + 1)) {
			curPage2Index = curPageIndex + 1;
			pages[curPage2Index].style.display = 'inline-block';
			pages[curPage2Index].style.order = '1'; // refer to previous comment
		} else {
			curPage2Index = -1;
		}

		updateTransform()
	}
</script>

<svelte:document onkeydown={onKeyDown} onresize={() => updateTransform()}/>

<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<a bind:this={leftScreen} id={styles.leftScreen} onclick={() => nextPage()} title="Go left a screen"
></a>
<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<a
	bind:this={rightScreen}
	id={styles.rightScreen}
	onclick={() => prevPage()}
	title="Go right a screen"
></a>

<div bind:this={pagesContainer} id={styles.pagesContainer}>
	{#each mokuro.pages as page, pageIndex (page.img_path)}
		<Page {page} {pageIndex} image={images[pageIndex]} />
	{/each}

	<!-- svelte-ignore a11y_missing_attribute -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<a bind:this={leftPage} id={styles.leftPage} onclick={() => nextPage()} title="Go left a page"
	></a>
	<!-- svelte-ignore a11y_missing_attribute -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<a bind:this={rightPage} id={styles.rightPage} onclick={() => prevPage()} title="Go right a page"
	></a>
</div>
