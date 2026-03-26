// import { updateDB } from '$lib/db/helpers.js';
import { fail } from '@sveltejs/kit';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import micromatch from 'micromatch';
import path from 'path';

const DEFAULT_FILES_TO_IGNORE = [
	'.DS_Store', // OSX indexing file
	'.ds_store',
	'Thumbs.db', // Windows indexing file
	'.*~',
	'~$*',
	'.~lock.*',
	'~*.tmp',
	'*.~*',
	'._*',
	'.*.sw?',
	'.*.*sw?',
	'.TemporaryItems',
	'.Trashes',
	'.DocumentRevisions-V100',
	'.Trash-*',
	'.fseventd',
	'.apdisk',
	'.directory',
	'*.part',
	'*.filepart',
	'*.crdownload',
	'*.kate-swp',
	'*.gnucash.tmp-*',
	'.synkron.*',
	'.sync.ffs_db',
	'.symform',
	'.symform-store',
	'.fuse_hidden*',
	'*.unison',
	'.nfs*'
];

function shouldIgnoreFile(file: File) {
	return micromatch.isMatch(file.name, DEFAULT_FILES_TO_IGNORE);
}

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

		for (const file of files) {
			// TODO: do all this asynchronously

			const fileToUpload = file as File;
			const filePath = `static/data/manga/${fileToUpload.name}`;
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

		

		return {
			success: true
		};
	}
};
