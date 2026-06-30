<script lang="ts">
	import styles from './Reader.module.scss';
	import Page from './Page.svelte';
	import type { Mokuro } from '$lib/db/mokuro';
	import { betterPrint, betterPrintWarning } from '$lib/logs/logger';
	import { onMount } from 'svelte';
	import type { Manga } from '$lib/db/mongo';

	const sig = 'components/reader';

	interface ReaderInterface {
		mokuro: Mokuro;
		manga: Manga;
		volume: string;
	}

	let { mokuro, manga, volume }: ReaderInterface = $props();

	let leftScreen, rightScreen, leftPage, rightPage: HTMLAnchorElement;

	let pagesContainer: HTMLDivElement;

	let curPageIndex = 0;
	let curPage2Index = -1;

	const pages: HTMLDivElement[] = [];

	// svelte-ignore state_referenced_locally
	if (mokuro.pages.length == 0) {
		betterPrintWarning('Mokuro has no pages', sig);
	}

	async function getImage(imagePath: string): Promise<string> {
		const response = await fetch(`/api/image?image=${manga.ref}%2F${volume}%2F${imagePath}`, {});

		return await response.json();
	}

	onMount(() => {
		for (let i = 0; i < mokuro.pages.length; i++) {
			pages[i] = document.getElementById(`page-${i}`)! as HTMLDivElement;
		}

		updatePage(curPageIndex);
	});

	async function updateImages() {
		for (let i = curPageIndex - 5; i <= curPageIndex + 5; i++) {
			if (i >= 0 && i <= pages.length - 2) {
				const page = pages[i].getElementsByTagName('div')[0];
				if (!page.style.backgroundImage.includes('.svg')) {
					page.style.backgroundImage = `url('${await getImage(mokuro.pages[i].img_path)}')`;
				}
			}
		}
	}

	function updateTransform() {
		const scale = Math.min(
			window.innerWidth / pagesContainer.offsetWidth,
			window.innerHeight / pagesContainer.offsetHeight
		);

		const scaledWidth = pagesContainer.offsetWidth * scale;
		const translateX = (window.innerWidth - scaledWidth) / 2;

		pagesContainer.style.transform =
			`translateX(${translateX}px) scale(${scale})`;
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
		if (curPageIndex === 1) {
			updatePage(0);
		} else {
			updatePage(curPageIndex - 2);
		}
	}

	function nextPage() {
		if (curPageIndex === 0) {
			updatePage(1);
		} else {
			updatePage(curPageIndex + 2);
		}
	}

	function updatePage(pageIndex: number) {
		const sig = 'components/reader/Reader:updatePage';
		pageIndex = Math.min(Math.max(pageIndex, 0), pages.length - 1);

		betterPrint(`Updating page to: ${pageIndex}`, sig);

		pages[curPageIndex].style.display = 'none';

		if (curPage2Index >= 0) {
			pages[curPage2Index].style.display = 'none';
		}

		if (isPageFirstOfPair(pageIndex)) {
			curPageIndex = pageIndex;
			betterPrint(`Page is first of pair, curPageIndex = ${curPageIndex}`, sig);
		} else {
			curPageIndex = pageIndex - 1;
			betterPrint(`curPageIndex = ${curPageIndex}`, sig);
		}

		pages[curPageIndex].style.display = 'inline-block';
		pages[curPageIndex].style.order = '2'; // it's a number, idiot

		if (curPageIndex === 0) {
			// cover is shown by itself
			curPage2Index = -1;
		} else if (curPageIndex + 1 < pages.length) {
			curPage2Index = curPageIndex + 1;
			pages[curPage2Index].style.display = 'inline-block';
			pages[curPage2Index].style.order = '1';
		} else {
			curPage2Index = -1;
		}

		updateTransform();
		updateImages();
	}
</script>

<svelte:document onkeydown={onKeyDown} onresize={() => updateTransform()} />

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
		<Page {page} {pageIndex} />
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
