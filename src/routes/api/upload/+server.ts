import { uploadFile, writeManga, type Manga } from '$lib/db/mongo';
import { processUpload } from '$lib/import/metadata';
import { betterPrint } from '$lib/logs/logger';
import { generateID, isVolume } from '$lib/upload/helpers';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return new Response(null, { status: 200 });
};

export const POST: RequestHandler = async ({ request }) => {
	const sig = '/api/upload/server';

	betterPrint(`Received upload request`, sig);

	const formData = await request.formData();

	const files = formData.getAll('fileToUpload');

	if (files.length <= 0) {
		return new Response('No files provided', {
			status: 400
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
		try {
			await uploadFile(fileName, Buffer.from(await pFile.arrayBuffer()), manga);
		} catch {
			return new Response('Unable to write to disk', { status: 400 });
		}
	}

	betterPrint('File upload complete', sig);
	betterPrint('Updating manga collection...', sig);

	await writeManga(manga);

	betterPrint('File processing complete!', sig);

	processUpload(manga);

	return new Response(null, { status: 200 });
};
