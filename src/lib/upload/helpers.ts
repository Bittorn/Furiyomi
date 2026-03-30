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
	'.nfs*',
	'*_ocr*'
];

export function shouldIgnoreFile(file: File) {
	return micromatch.isMatch(file.name, DEFAULT_FILES_TO_IGNORE);
}

export function generateID(title: string): string {
	return title.toLowerCase().replaceAll(' ', '-');
}