<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { betterPrint } from '$lib/logs/logger';
	import styles from './upload.module.scss';

	let fileInput: HTMLInputElement;
	let loadingDiv: HTMLDivElement;

	let loadingText = $state('Uploading...');

	async function timeoutLoading() {
		await new Promise(resolve => setTimeout(resolve, 3000))
		loadingDiv.classList.add(styles.hidden);
	}
</script>

<svelte:head>
	<title>Upload | Furiyomi</title>
</svelte:head>

<h1>Upload</h1>

<form
	method="post"
	use:enhance={() => {
		betterPrint('Uploading files...', 'fileUpload');
		loadingDiv.classList.remove(styles.hidden);

		return async ({ result }) => {
			// `result` is an `ActionResult` object

			if (result.type === 'redirect') {
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				goto(result.location);
			} else if (result.type === 'success') {
				loadingDiv.classList.add(styles.success);
				loadingText = 'Upload complete!';
				betterPrint(loadingText, 'fileUpload');
				timeoutLoading();
				await applyAction(result);
			} else {
				loadingDiv.classList.add(styles.error);
				loadingText = 'Upload failed';
				betterPrint(loadingText, 'fileUpload');
				timeoutLoading();
				await applyAction(result);
			}
		};
	}}
	enctype="multipart/form-data"
>
	<div class={styles.upload}>
		<label
			for="file"
			class={styles.dropcontainer}
			ondragover={(e) => e.preventDefault()}
			ondrop={(e) => {
				e.preventDefault();
				fileInput.files = e.dataTransfer!.files;
			}}
		>
			<span class={styles.droptitle}>Drop directory here</span>
			or
			<input
				bind:this={fileInput}
				type="file"
				id="file"
				name="fileToUpload"
				webkitdirectory
				multiple
				required
			/>
		</label>
	</div>
	<br />
	<button class={styles.uploadbutton} type="submit">Upload</button>
</form>

<div bind:this={loadingDiv} class={`${styles.status} ${styles.hidden}`}>
	<h1>{loadingText}</h1>
</div>

<div class={styles.information}>
	<h1>⚠️ Before Uploading ⚠️</h1>
	<ul>
		<li>This app is intended for use only with <b>manga pre-processed with Mokuro.</b></li>
		<li>
			When uploading, be sure to select the directory .mokuro files are located in, and <b>not</b> any
			child or parent directories.
		</li>
		<li>
			Ensure the name of the directory matches the manga you are uploading, as this will be used for
			metadata fetching.
		</li>
	</ul>
</div>
