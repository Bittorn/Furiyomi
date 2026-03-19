import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const blogArticles = [
		{
			titleID: `lonely-girl-ni-sakaraenai`,
			title_romaji: `Lonely Girl ni Sakaraenai`,
			title_kana: `ロンリーガールに逆らえない`,
			title_en: `I Can't Say No to the Lonely Girl`,
			anilist_link: `https://anilist.co/manga/112621/Lonely-Girl-ni-Sakaraenai/`,
			description: `In this juicy yuri manga, the goody-goody high school girl Sakurai meets a lonely girl—and ends
		up entangled in a web of blackmail that might just lead to romance. It's hard to keep up with
		school when you can never say no to a devious classmate!`
		}
	];

	const foundManga = blogArticles.find((manga): boolean => manga.titleID === params.mangaTitle);

	if (foundManga) {
		return {
			title_romaji: foundManga.title_romaji,
			title_kana: foundManga.title_kana,
			title_en: foundManga.title_en,
			anilist_link: foundManga.anilist_link,
			description: foundManga.description
		};
	}

	throw error(404, 'Manga not found, please try again');
};
