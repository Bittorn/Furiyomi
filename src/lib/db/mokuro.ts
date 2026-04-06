import { betterPrint } from '$lib/logs/logger';
import { mangaBucket } from './mongo';
import { fs } from 'memfs';

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

export async function fetchMokuro(mokuroPath: string): Promise<Mokuro> {
	const sig = 'db/mokuro:fetchMokuro';

	betterPrint(`Fetching Mokuro file: ${mokuroPath}`, sig);

	const id = Math.ceil(Math.random() * 65535);
	const destPath = `/mokuro-temp-${id}`;

	await new Promise((resolve, reject) => {
		const writeStream = fs.createWriteStream(destPath);
		const downloadStream = mangaBucket.openDownloadStreamByName(mokuroPath);

		downloadStream.pipe(writeStream);

		writeStream.on('finish', () => {
			betterPrint(`Write stream finished successfully`, sig);
			resolve(destPath);
		});

		downloadStream.on('error', reject);
		writeStream.on('error', reject);
	});

	const mokuroFile: Mokuro = JSON.parse(
		fs.readFileSync(destPath, { encoding: 'utf-8' }).toString()
	);

	betterPrint(`Parsed Mokuro file: ${mokuroPath}`, sig);

	fs.unlinkSync(destPath);

	betterPrint(`Removed temporary file`, sig);

	return mokuroFile;
}
