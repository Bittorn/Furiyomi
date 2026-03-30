import { fail } from '@sveltejs/kit';
import { generateID, shouldIgnoreFile } from '$lib/upload/helpers.js';
import { processUpload } from '$lib/import/metadata.js';
import { betterPrint } from '$lib/logs/logger.js';
import { mangaBucket } from '$lib/db/mongo.js';

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

		let mangaRef, mangaRomaji;

		for (const file of files) {
			const pFile = file as File

			const fileNameArray = pFile.name.split('/');
			mangaRomaji = fileNameArray[0];
			fileNameArray[0] = generateID(fileNameArray[0]);
			mangaRef = fileNameArray[0];
			const fileName = fileNameArray.join('/');

			// Check if it's garbage
			if (shouldIgnoreFile(pFile)) return;

			// writeFileSync(fileName, Buffer.from(await fileToUpload.arrayBuffer()));

			mangaBucket.openUploadStream(fileName, {
				chunkSizeBytes: 1048576,
				metadata: { manga_romaji: mangaRomaji, manga_ref: mangaRef}
			}).write(Buffer.from(await pFile.arrayBuffer()));
		}

		betterPrint('File upload complete!', sig);

		processUpload(mangaRef!, mangaRomaji!);

		return {
			success: true
		};
	}
};
