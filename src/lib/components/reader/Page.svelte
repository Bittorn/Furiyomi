<script lang="ts">
	import styles from './Page.module.scss';
	import type { Block, Page } from '$lib/db/mokuro';

	interface PageInterface {
		page: Page;
	}

	let { page }: PageInterface = $props();

	const minFontSize = 12;
	const maxFontSize = 32;

	function clamp(num: number, lower: number, upper: number) {
		return Math.min(Math.max(num, lower), upper);
	}

	function calcFontSize(num: number) {
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

<div class={styles.page}>
	<div
		class={styles.pageContainer}
		style="width: {page.img_width}; height: {page.img_height}; background-image: url('{page.img_path}')"
	>
		{#each page.blocks as block (block.lines)}
			<div
				class={styles.textBox}
				style="left: {block.box[0]}; top: {block.box[1]}; width: {block.box[2] -
					block.box[0]}; height: {block.box[3] - block.box[1]}; font-size: {calcFontSize(
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
