<script lang="ts">
	import styles from './Page.module.scss';
	import type { Block, Page } from '$lib/db/mokuro';

	interface PageInterface {
		page: Page;
		pageIndex: number;
	}

	let { page, pageIndex }: PageInterface = $props();

	const minFontSize = 12;
	const maxFontSize = 48;
	const loader = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="%23F26E84" stroke="%23F26E84" stroke-width="7" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="%23F26E84" stroke="%23F26E84" stroke-width="7" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="%23F26E84" stroke="%23F26E84" stroke-width="7" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="1.2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>')`;

	function clamp(num: number, lower: number, upper: number): number {
		return Math.min(Math.max(num, lower), upper);
	}

	function calcFontSize(num: number): number {
		return clamp(num, minFontSize, maxFontSize);
	}

	function idFromText(line: string, block: Block, index: number): string {
		// TODO: actual pseudo-random id generation

		const id: number = line.length * block.lines_coords[0][0][0];
		const toReturn = `${line}-${id}${index}`;

		return toReturn;
	}

	// TODO: z-index calculation so small textboxes aren't underneath larger ones
</script>

<div class="{styles.page} page" id="page-{pageIndex}">
	<div
		class={styles.pageContainer}
		style="width: {page.img_width}px; height: {page.img_height}px; background-image: {loader}"
	>
		{#each page.blocks as block (block.lines_coords)}
			<div
				class={styles.textBox}
				style="left: {block.box[0]}px; top: {block.box[1]}px; width: {block.box[2] -
					block.box[0]}px; height: {block.box[3] - block.box[1]}px; font-size: {calcFontSize(
					block.font_size
				)}px; z-index: 12; {block.vertical ? 'writing-mode: vertical-rl;' : ''}"
			>
				{#each block.lines as line, index (idFromText(line, block, index))}
					<p>{line}</p>
				{/each}
			</div>
		{/each}
	</div>
</div>
