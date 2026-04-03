import { betterPrint, betterPrintError } from '$lib/logs/logger';
import { createWriteStream } from 'node:fs';
import { mangaBucket } from './mongo';
import { readFile, unlink } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

// #region Interface - Mokuro
export interface Mokuro {
	version: string;
	title: string;
	title_uuid: string;
	volume: string;
	volume_uuid: string;
	pages: Page[];
}

export interface Page {
	version: string;
	img_width: number;
	img_height: number;
	blocks: Block[];
	img_path: string;
}

export interface Block {
	box: number[];
	vertical: boolean;
	font_size: number;
	lines_coords: number[][][];
	lines: string[];
}
// #endregion

export async function fetchMokuro(ref: string, volume: string): Promise<Mokuro> {
	const sig = 'db/mokuro:fetchMokuro';

	betterPrint(`Fetching Mokuro file: ${ref}/${volume}.mokuro`, sig);

	try {
		// OK, so this part? Dogwash.

		mangaBucket
			.openDownloadStreamByName(`${ref}/${volume}.mokuro`)
			.pipe(createWriteStream('./temp'));

		// Literally the worst way to do this.

		betterPrint(`Waiting for timeout (stupid)`, sig);

		await setTimeout(4);

		betterPrint(`Timeout complete, attempting to parse...`, sig);

		// So stupid and bad.

		const mokuroFile: Mokuro = JSON.parse(
			JSON.stringify(await readFile('./temp', { encoding: 'utf-8' }))
		);

		betterPrint(`Parsed Mokuro file: ${ref}/${volume}.mokuro`, sig);

		await unlink('./temp');

		betterPrint(`Removed temporary file`, sig);

		return mokuroFile;
	} catch {
		betterPrintError(`Error parsing Mokuro file`, sig);
		throw new Error('Error parsing Mokuro file');
	}
}
