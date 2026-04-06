<script lang="ts">
	import styles from './Page.module.scss';
	import type { Block, Page } from '$lib/db/mokuro';

	interface PageInterface {
		page: Page;
		pageIndex: number;
		image: string;
	}

	let { page, pageIndex, image }: PageInterface = $props();

	const minFontSize = 12;
	const maxFontSize = 32;

	function clamp(num: number, lower: number, upper: number): number {
		return Math.min(Math.max(num, lower), upper);
	}

	function calcFontSize(num: number): number {
		return clamp(num, minFontSize, maxFontSize);
	}

	function idFromText(line: string, block: Block): string {
		// TODO: actual pseudo-random id generation

		const id: number = line.length * block.lines_coords[0][0][0];

		return `${line}-${id}`;
	}

	// TODO: z-index calculation so small textboxes aren't underneath larger ones
	// TODO: image parsing
</script>

<div class='{styles.page} page' id='page-{pageIndex}'>
	<div
		class={styles.pageContainer}
		style="width: {page.img_width}px; height: {page.img_height}px; background-image: url('{image}')"
	>
		{#each page.blocks as block (block.lines)}
			<div
				class={styles.textBox}
				style="left: {block.box[0]}px; top: {block.box[1]}px; width: {block.box[2] -
					block.box[0]}px; height: {block.box[3] - block.box[1]}px; font-size: {calcFontSize(
					block.font_size
				)}px; z-index: 12; {block.vertical ? 'writing-mode: vertical-rl;' : ''}"
			>
				{#each block.lines as line (idFromText(line, block))}
					<p>{line}</p>
				{/each}
			</div>
		{/each}
	</div>
</div>
