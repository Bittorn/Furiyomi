import { betterPrint } from '$lib/logs/logger';

const filesToIgnore = [
	'.DS_Store',
	'.ds_store',
	'.Thumbs.db',
	'.tmp',
	'.TemporaryItems',
	'.Trashes',
	'.Trash',
	'.fseventd',
	'.nfs',
	'_ocr'
];

export function shouldIgnoreFile(name: string): boolean {
	const sig = 'upload/helpers:shouldIgnoreFile';

	let isMatch = false;

	for (const test of filesToIgnore) {
		// TODO: fix this

		if (!isMatch) {
			isMatch = name.includes(test);
			betterPrint(`File ${name} matched pattern ${test}, ignoring`, sig);
		}
	}

	return isMatch;
}

export function isVolume(name: string): boolean {
	const sig = 'upload/helpers:isVolume';

	if (name.endsWith('.mokuro')) {
		betterPrint(`File ${name} matched pattern ${name}`, sig);
		return true;
	} else {
		return false;
	}
}

export function generateID(name: string): string {
	const id = name.toLowerCase().replaceAll(' ', '-');
	return id;
}
