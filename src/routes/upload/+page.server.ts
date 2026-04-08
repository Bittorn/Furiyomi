import { fail } from '@sveltejs/kit';
import { betterPrint } from '$lib/logs/logger.js';
import { uploadFile } from '$lib/db/mongo.js';
import { writeManga, type Manga } from '$lib/db/mongo.js';
import { processUpload } from '$lib/import/metadata.js';
import { generateID, isVolume } from '$lib/upload/helpers.js';

export const actions = {
	default: async ({ request }) => {
		const sig = '/upload/server';
		const formData = await request.formData();

		const files = formData.getAll('fileToUpload');

		betterPrint(`Received upload request: ${files.length} items`, sig);

		if (files.length <= 0) {
			return fail(400, {
				error: true,
				message: 'You must provide a directory to upload'
			});
		}

		const manga: Manga = {
			ref: '',
			upload_date: new Date().getTime(),
			anilist_id: 0,
			title: {
				romaji: '',
				english: '',
				native: ''
			},
			year: 0,
			genres: [],
			tags: [],
			cover: '',
			link: '',
			description: '',
			volumes: []
		};

		for (const file of files) {
			const pFile = file as File;

			const fileNameArray = pFile.name.split('/');

			if (manga.title.romaji == '') {
				manga.title.romaji = fileNameArray[0];
			}

			fileNameArray[0] = generateID(fileNameArray[0]);

			if (manga.ref == '') {
				manga.ref = fileNameArray[0];
			}

			const fileName = fileNameArray.join('/');

			// Check if it's garbage
			// if (shouldIgnoreFile(fileName)) return;

			if (isVolume(fileName)) {
				const array = fileName.split('/');
				manga.volumes.push({
					title: array[array.length - 1].replace('.mokuro', '')
				});
			}

			await uploadFile(fileName, Buffer.from(await pFile.arrayBuffer()), manga);
		}

		betterPrint('File upload complete', sig);
		betterPrint('Updating manga collection...', sig);

		await writeManga(manga);

		betterPrint('File processing complete!', sig);

		processUpload(manga);

		return {
			success: true
		};
	}
};
