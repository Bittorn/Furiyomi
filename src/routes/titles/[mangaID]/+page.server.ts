import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchDB } from '$lib/db/helpers';

export const load: PageServerLoad = async ({ params }) => {
	const db = fetchDB()

	const foundManga = db.manga.find((manga: { id: string; }): boolean => manga.id === params.mangaID);

	if (foundManga) {
		return {
			title_romaji: foundManga.title.romaji,
			title_kana: foundManga.title.native,
			title_en: foundManga.title.english,
			anilist_link: foundManga.link,
			description: foundManga.description
		};
	}

	throw error(404, 'Manga not found, please try again.');
};
