<script lang="ts">
	import styles from './Snackbar.module.scss';

	let snackbar: HTMLDivElement;
	let text = $state('Placeholder');

	export function showToast(message: string) {
		snackbar.className = styles.snackbarshow;
        text = message;
		
		setTimeout(function () {
			snackbar.className = snackbar.className.replace(styles.snackbarshow, '');
		}, 3000);
	}
</script>

<div bind:this={snackbar} id={styles.snackbar}>{text}</div>
