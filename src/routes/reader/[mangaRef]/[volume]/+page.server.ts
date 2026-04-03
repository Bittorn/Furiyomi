import { error } from '@sveltejs/kit';
import { betterPrintWarning } from '$lib/logs/logger';
import { mangaCollection } from '$lib/db/mongo';
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

	// strip ObjectId so SK doesnt complain about non-POJO objects
	manga._id = undefined;

	const mokuro: Mokuro = await fetchMokuro(params.mangaRef, params.volume)

	if (mokuro.pages.length == 0) {
		betterPrintWarning('Mokuro has no pages', sig)
	}

	return {
		manga,
		mokuro
	};
};
