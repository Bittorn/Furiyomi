import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { betterPrintWarning } from '$lib/logs/logger';
import { mangaCollection } from '$lib/db/mongo';
import type { Manga } from '$lib/db/mongo';

export const load: PageServerLoad = async ({ params }) => {
	const sig = '/titles/[mangaRef]/server';

	const foundManga: Manga | null = await mangaCollection.findOne({
		ref: params.mangaRef
	});

	if (foundManga) {
		foundManga._id = undefined;

		return {
			manga: foundManga
		};
	}

	betterPrintWarning(`Manga not found: ${params.mangaRef}`, sig);
	throw error(404, 'Manga not found, please try again.');
};
