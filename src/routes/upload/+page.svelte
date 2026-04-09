<script lang="ts">
	import { betterPrint, betterPrintError } from '$lib/logs/logger';
	import styles from './upload.module.scss';

	let fileInput: HTMLInputElement;
	let loadingDiv: HTMLDivElement;
	let dataForm: HTMLFormElement;

	let loadingText = $state('Starting upload...');

	async function timeoutLoading() {
		await new Promise((resolve) => setTimeout(resolve, 5000));
		loadingDiv.classList.add(styles.hidden);
	}

	async function doUploads(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		const sig = '/upload:doUploads';
		event.preventDefault();

		betterPrint('Uploading files...', sig);
		loadingDiv.classList.remove(styles.hidden);

		let request = new XMLHttpRequest();

		request.open('POST', '/api/upload');

		const formData = new FormData(dataForm);

		request.upload.onprogress = (pe) => {
			if (pe.lengthComputable) {
				loadingText = `Uploading (${Math.ceil((pe.loaded / pe.total) * 100)}% complete)`;

				if (Math.floor((pe.loaded / pe.total) * 100) == 100) {
					loadingText = 'Processing upload...';
				}
			}
		};

		request.onloadend = () => {
			if (request.status == 200) {
				loadingDiv.classList.add(styles.success);
				loadingText = 'Upload complete!';
				betterPrint('Received 200 response', sig);
				timeoutLoading();
			} else {
				loadingDiv.classList.add(styles.error);
				loadingText = `Error: received ${request.status} response`;
				betterPrintError(`Received ${request.status} response`, sig);
				timeoutLoading();
			}
		};

		request.onerror = () => {
			loadingDiv.classList.add(styles.error);
			loadingText = 'Upload failed';
			betterPrintError('Event encountered an error', sig);
			timeoutLoading();
		};

		request.send(formData);
	}
</script>

<svelte:head>
	<title>Upload | Furiyomi</title>
</svelte:head>

<h1>Upload</h1>

<form onsubmit={doUploads} bind:this={dataForm} enctype="multipart/form-data">
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
