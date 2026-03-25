<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	import styles from './account.module.scss';

	// Source - https://stackoverflow.com/a/77398427
	// Posted by galatians
	// Retrieved 2026-03-25, License - CC BY-SA 4.0

	async function digest(message: string, algo = 'SHA-256') {
		return Array.from(
			new Uint8Array(await crypto.subtle.digest(algo, new TextEncoder().encode(message))),
			(byte) => byte.toString(16).padStart(2, '0')
		).join('');
	}
</script>

<svelte:head>
	<title>Account - Furiyomi</title>
</svelte:head>

<h1>Account</h1>

<div class={styles.login}>
	<form
		method="post"
		use:enhance={({ formData }) => {
			const password = formData.get('password') as string;
			// Hash password before sending
			digest(password).then(passwordHash => formData.set('password', passwordHash));

			// `result` is an `ActionResult` object
			return async ({ result }) => {
				if (result.type === 'redirect') {
					// eslint-disable-next-line svelte/no-navigation-without-resolve
					goto(result.location);
				} else {
					await applyAction(result);
				}
			};
		}}
		enctype="multipart/form-data"
	>
		<div>
			<label for="username">Username:</label>
			<input type="text" id="username" name="username" required />
			<br /><br />
			<label for="password">Password:</label>
			<input type="password" id="password" name="password" />
		</div>
		<br />
		<button type="submit">Login</button>
	</form>
</div>

<h3>Don't have an account? Ask an admin to create one!</h3>
