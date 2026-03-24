import { fail } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import micromatch from 'micromatch';

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

		const files = formData.getAll('file');

		if (files.length <= 0) {
			return fail(400, {
				error: true,
				message: 'You must provide a directory to upload'
			});
		}

		for (const file of files) {
			const fileToUpload = file as File;

			// Check if it's garbage
			if (shouldIgnoreFile(fileToUpload)) return

			// Write the file to the data folder
			// TODO: do this asynchronously
			writeFileSync(`data/${fileToUpload.name}`, Buffer.from(await fileToUpload.arrayBuffer()));
		}

		return {
			success: true
		};
	}
};
