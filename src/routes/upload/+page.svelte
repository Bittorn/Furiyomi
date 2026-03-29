<script lang="ts">
	import { enhance } from '$app/forms';
	import styles from './upload.module.scss';

	let fileInput: HTMLInputElement;
</script>

<svelte:head>
	<title>Upload - Furiyomi</title>
</svelte:head>

<h1>Upload</h1>

<form method="post" use:enhance enctype="multipart/form-data">
	<div class={styles.upload}>
		<label
			for="file"
			class={styles.dropcontainer}
			on:dragover={(e) => e.preventDefault()}
			on:drop={(e) => {
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
		<li>
			Currently, upload progress is not shown. If the page reloads or the input field resets, <b
				>the upload most likely succeeded.</b
			>
		</li>
	</ul>
</div>
