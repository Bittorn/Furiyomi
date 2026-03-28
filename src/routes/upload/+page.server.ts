import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fail } from '@sveltejs/kit';
import { generateID, shouldIgnoreFile } from '$lib/upload/helpers.js';
import { processUpload } from '$lib/import/metadata.js';
import { dbMangaPath } from '$lib/db/helpers.js';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const files = formData.getAll('fileToUpload');

		console.log(`Received upload request: ${files.length} items`);

		if (files.length <= 0) {
			return fail(400, {
				error: true,
				message: 'You must provide a directory to upload'
			});
		}

		let mangaID, mangaRomaji;

		// #region Upload files

		for (const file of files) {
			// TODO: do all this asynchronously

			const fileToUpload = file as File;

			// eslint-disable-next-line prefer-const
			let fileNameArray = fileToUpload.name.split('/');
			mangaRomaji = fileNameArray[0]
			fileNameArray[0] = generateID(fileNameArray[0]);
			mangaID = fileNameArray[0]
			const fileName = fileNameArray.join('/');

			const filePath = `${dbMangaPath}/${fileName}`;
			console.log(filePath);

			// Check if it's garbage
			if (shouldIgnoreFile(fileToUpload)) return;

			// Create directory if it doesn't exist
			const fileDir = path.dirname(filePath);

			if (!existsSync(fileDir)) {
				mkdirSync(fileDir, { recursive: true });
				console.log(`Directory ${fileDir} (and parents) created`);
			}

			// Write the file to the data folder
			writeFileSync(filePath, Buffer.from(await fileToUpload.arrayBuffer()));
		}

		// #endregion

		console.log('File upload complete');

		processUpload(mangaID!, mangaRomaji!)

		return {
			success: true
		};
	}
};
