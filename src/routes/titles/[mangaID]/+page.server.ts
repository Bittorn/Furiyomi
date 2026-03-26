import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchDB } from '$lib/db/helpers';

export const load: PageServerLoad = async ({ params }) => {
	const db = fetchDB()

	const foundManga = db.manga.find((manga: { id: string; }): boolean => manga.id === params.mangaID);

	if (foundManga) {
		return {
			id: foundManga.id,
			title_romaji: foundManga.title.romaji,
			title_native: foundManga.title.native,
			title_english: foundManga.title.english,
			cover: foundManga.cover,
			link: foundManga.link,
			description: foundManga.description,
			volumes: foundManga.volumes
		};
	}

	throw error(404, 'Manga not found, please try again.');
};
