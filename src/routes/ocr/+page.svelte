<script lang="ts">
	import styles from './ocr.module.scss';
	import { createWorker } from 'tesseract.js';

	let fileInput: HTMLInputElement;
	let debugOutput: HTMLParagraphElement;

	var output: string;

	function doOCR() {
		(async () => {
			const worker = await createWorker('eng');

			output = '';

			if (!fileInput.files) return;
			for (let file of fileInput.files) {
				const ret = await worker.recognize(file);
				console.log(file);
				console.log(ret.data.text);
				output += ret.data.text + '<br><br>';
			}

			// i mean true, but who cares
			// eslint-disable-next-line svelte/no-dom-manipulating
			debugOutput.innerHTML = output;
			await worker.terminate();
		})();
	}
</script>

<svelte:head>
	<title>OCR - Furiyomi</title>
</svelte:head>

<h1>OCR</h1>

<label for="file" style="margin-right: 4px;">Select file(s):</label>
<input bind:this={fileInput} type="file" id="file" name="file" multiple accept="image/*" /><br /><br
/>
<button class={styles.submit} onclick={doOCR}>Submit</button><br /><br />

<h2>OCR debug output</h2>
<div class={styles.debug}>
	<p bind:this={debugOutput}></p>
</div>
