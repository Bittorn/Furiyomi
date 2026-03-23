<script lang="ts">
	import { enhance } from '$app/forms';
	import './upload.module.scss';
</script>

<svelte:head>
	<title>Upload - Furiyomi</title>
</svelte:head>

<h1>Upload</h1>

<form method="post" use:enhance enctype="multipart/form-data">
	<div>
		<label for="file">Select file: </label>
		<input type="file" id="file" name="fileToUpload" required />
	</div>
	<br />
	<button type="submit">Upload</button>
</form>
