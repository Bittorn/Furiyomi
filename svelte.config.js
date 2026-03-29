import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Output directory for the built server
			out: 'build',
			// Listen on all interfaces inside Docker
			host: '0.0.0.0',
			port: 3796
		})
	}
};

export default config;
