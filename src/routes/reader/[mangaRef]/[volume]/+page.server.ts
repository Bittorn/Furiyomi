import { error } from '@sveltejs/kit';
import { betterPrint, betterPrintWarning } from '$lib/logs/logger';
import { getImageData, mangaCollection } from '$lib/db/mongo';
import type { Manga } from '$lib/db/mongo';
import { fetchMokuro, type Mokuro } from '$lib/db/mokuro';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const sig = '/reader/[mangaRef]/[volume]/server';

	const manga: Manga | null = await mangaCollection.findOne({
		ref: params.mangaRef
	});

	if (!manga) {
		betterPrintWarning(`Manga not found: ${params.mangaRef}`, sig);
		throw error(404, 'Manga not found, please try again.');
	}

	// strip ObjectId so stinky SvelteKit doesn't complain
	// about non-POJO objects even when it literally is
	manga._id = undefined;

	const volumePath = `${params.mangaRef}/${params.volume}`

	const mokuroPath = `${volumePath}.mokuro`;

	betterPrint(`Requesting Mokuro: ${mokuroPath}`, sig);

	const mokuro: Mokuro = await fetchMokuro(mokuroPath);

	const images: string[] = []

	for (const page of mokuro.pages) {
		images.push(await getImageData(`${volumePath}/${page.img_path}`))
	}

	return {
		manga,
		mokuro,
		images
	};
};
