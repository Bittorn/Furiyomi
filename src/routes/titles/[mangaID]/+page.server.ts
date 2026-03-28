import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchDB } from '$lib/db/helpers';

export const load: PageServerLoad = async ({ params }) => {
	const db = fetchDB();

	const foundManga = db.manga.find((manga: { id: string }): boolean => manga.id === params.mangaID);

	if (foundManga) {
		return {
			manga: foundManga
		};
	}

	throw error(404, 'Manga not found, please try again.');
};
