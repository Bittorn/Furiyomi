import type { Manga } from '$lib/db/mongo';
import { getImageData, mangaCollection } from '$lib/db/mongo';
import { betterPrintWarning } from '$lib/logs/logger';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const sig = '/titles/server';
	
	const mangaCount = await mangaCollection.countDocuments();

	if (!mangaCount) {
		betterPrintWarning('Manga collection is empty', sig);
	}

	const mangaList: Manga[] = await mangaCollection.find().toArray()
	const mangaCovers: string[] = []

	for (const manga of mangaList) {
		manga._id = undefined
		mangaCovers.push(await getImageData(manga.cover))
	}

	return {
		mangaCount,
		mangaList,
		mangaCovers
	};
};
