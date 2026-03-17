<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';

	interface NavLinkInterface {
		children: Snippet;
		href: string;
		[key: string]: unknown; // for all other properties
	}

	let { href, children, ...rest }: NavLinkInterface = $props();

	let selected = () => {
		// stupid fix for '/'
		if (page.url.pathname == href && href == '/') return 'current';
		// the actual good code
		return page.url.pathname == href + '/' ? 'current' : '';
		// TODO: Allow for pages on children to be marked as current
	};
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<li><a {href} class={selected()} {...rest}>{@render children()}</a></li>
