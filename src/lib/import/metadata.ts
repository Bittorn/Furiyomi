import { dbMangaPath, updateManga, type Manga, type Volumes } from '$lib/db/helpers';
import { error } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { existsSync, readdirSync } from 'fs';
import micromatch from 'micromatch';
import { queryAnilist, type Tags } from './anilist';

export function processUpload(id: string, romaji: string) {
	console.log(`Downloading metadata for: ${id}`);
	const dirPath = `${dbMangaPath}/${id}`;
	if (!existsSync(dirPath)) {
		console.error(`Path does not exist`, 500);
		throw error(500, 'Path does not exist');
	}

	const volumes: Volumes[] = [];

	const fileNames = readdirSync(dirPath);
	fileNames.forEach((fileName) => {
		if (micromatch.isMatch(fileName, '*.html')) {
			volumes.push({
				title: fileName.replace('.html', '')
			});
		}
	});

	const cover = readdirSync(`${dirPath}/${volumes[0].title}`)[0];

	const manga: Manga = {
		id,
		uuid: randomUUID(),
		anilist_id: 0,
		title: {
			romaji,
			english: '',
			native: ''
		},
		year: 0,
		genres: [],
		tags: [],
		cover,
		link: '',
		description: 'This manga has no description.',
		volumes
	};

	downloadMetadata(manga);

	updateManga(manga);
}

export async function downloadMetadata(manga: Manga) {
	const data = await queryAnilist(manga.title.romaji);
	if (!data) {
		console.error(`Unable to download metadata`, 500);
		return;
	}

	const mangaData = data.data.Page.media[0];

	manga.anilist_id = mangaData.id;
	manga.title = mangaData.title;
	manga.year = mangaData.startDate.year;
	manga.link = mangaData.siteUrl;
	manga.genres = mangaData.genres;
	manga.tags = processTags(mangaData.tags);
	manga.description = formatDescription(mangaData.description);

	updateManga(manga);
}

function formatDescription(description: string): string {
	// just get rid of all HTML tags
	// and anilist-specific stuff
	description = description.replace(/(<([^>]+)>)/ig, '').split("(Source")[0];
	return description;
}

function processTags(tags: Tags[]): string[] {
	const toReturn: string[] = [];
	for (const tag of tags) {
		if (!tag.isMediaSpoiler) toReturn.push(tag.name);
	}
	return toReturn;
}
