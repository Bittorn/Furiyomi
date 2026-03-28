import { dbMangaPath, updateManga, type Manga, type Volumes } from '$lib/db/helpers';
import { error } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { existsSync, readdirSync } from 'fs';
import micromatch from 'micromatch';

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
				title: fileName.replace(".html", "")
			});
		}
	});

	const cover = readdirSync(`${dirPath}/${volumes[0].title}`)[0];

	const manga: Manga = {
		id,
		uuid: randomUUID(),
		anilist_id: '',
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

	updateManga(manga);
}

export function downloadMetadata() {}
