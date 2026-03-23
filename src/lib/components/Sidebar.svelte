<script lang="ts">
	import SidebarLink from './SidebarLink.svelte';
	import styles from './Sidebar.module.scss';
</script>

<nav class={styles.nav__cont}>
	<ul class={styles.nav}>
		<SidebarLink href="/">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M13 19h6V9.978l-7-5.444l-7 5.444V19h6v-6h2zm8 1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79z"
				/></svg
			>
			<span>Home</span>
		</SidebarLink>
		<SidebarLink href="/discover">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m3.5-11.5l-2 5l-5 2l2-5z"
				/></svg
			>
			<span>Discover</span>
		</SidebarLink>
		<SidebarLink href="/ocr">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M4.998 15v4h4v2h-6v-6zm16 0v6h-6v-2h4v-4zm-8.001-9l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3H6.598l4.399-11zm-1 2.885L10.75 12h2.492zM8.998 3v2h-4v4h-2V3zm12 0v6h-2V5h-4V3z"
				/></svg
			>
			<span>OCR</span>
		</SidebarLink>
		<SidebarLink href="/upload">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="m12 12.586l4.243 4.242l-1.415 1.415L13 16.415V22h-2v-5.587l-1.828 1.83l-1.415-1.415zM12 2a7 7 0 0 1 6.954 6.194A5.5 5.5 0 0 1 18 18.978v-2.014a3.5 3.5 0 1 0-1.111-6.91a5 5 0 1 0-9.777 0a3.5 3.5 0 0 0-1.292 6.88l.18.03v2.014a5.5 5.5 0 0 1-.954-10.784A7 7 0 0 1 12 2"
				/></svg
			>
			<span>Upload</span>
		</SidebarLink>
		<SidebarLink href="/account">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m.16 14a6.98 6.98 0 0 0-5.147 2.256A7.97 7.97 0 0 0 12 20a7.97 7.97 0 0 0 5.167-1.892A6.98 6.98 0 0 0 12.16 16M12 4a8 8 0 0 0-6.384 12.821A8.98 8.98 0 0 1 12.16 14a8.97 8.97 0 0 1 6.362 2.634A8 8 0 0 0 12 4m0 1a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4"
				/></svg
			>
			<span>Account</span>
		</SidebarLink>
	</ul>
</nav>
