<script lang="ts">
	import NavLink from './NavLink.svelte';
	import styles from './NavBar.module.scss';

	var overlay: HTMLDivElement;

	function openMenu() {
		overlay.classList.add(styles.overlay_active);
	}

	function closeMenu() {
		overlay.classList.remove(styles.overlay_active);
	}
</script>

<header>
	<nav class={styles.navbar}>
		<ul class={styles.nav__links}>
			<NavLink href="/">Home</NavLink>
			<NavLink href="/discover">Discover</NavLink>
			<NavLink href="/settings">Settings</NavLink>
		</ul>
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<p class="{styles.menu} {styles.cta}" onclick={openMenu} onkeydown={openMenu}>Menu</p>
	</nav>
</header>
<div class="{styles.overlay}" bind:this={overlay}>
	<!-- svelte-ignore a11y_missing_attribute -->
	<a class={styles.close} onclick={closeMenu} onkeydown={closeMenu} role="button" tabindex="0"
		>&times;</a
	>
	<div class={styles.overlay__content}>
		<NavLink href="/" onclick={closeMenu}>Home</NavLink>
		<NavLink href="/discover" onclick={closeMenu}>Discover</NavLink>
		<NavLink href="/settings" onclick={closeMenu}>Settings</NavLink>
	</div>
</div>
