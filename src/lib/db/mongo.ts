import { env } from '$env/dynamic/private';
import { GridFSBucket, MongoClient } from 'mongodb';
import { betterPrint, betterPrintError, betterPrintWarning } from '$lib/logs/logger';
import type { ObjectId } from 'mongodb';
import { fs } from 'memfs';

// #region Interfaces
export interface Manga {
	_id?: ObjectId;
	ref: string;
	upload_date: number;
	anilist_id: number;
	title: Title;
	year: number;
	genres: string[];
	tags: string[];
	cover: string;
	link: string;
	description: string;
	volumes: Volume[];
}

export interface Title {
	romaji: string;
	english: string;
	native: string;
}

export interface Volume {
	title: string;
	cover?: string;
}

export interface User {
	_id?: ObjectId;
	username: string;
	password: string;
}
// #endregion

// #region Setup
const client = new MongoClient(env.MONGO_URL);

export async function startMongo(): Promise<MongoClient> {
	return client.connect();
}

export const db = client.db('furiyomi');

export const mangaCollection = db.collection<Manga>('manga');
export const usersCollection = db.collection<User>('users');

export const mangaBucket = new GridFSBucket(db);
// #endregion

// #region Write
export async function writeManga(manga: Manga) {
	const sig = 'db/mongo:writeManga';

	const result = await mangaCollection.updateOne(
		{ ref: manga.ref },
		{ $set: manga },
		{ upsert: true }
	);

	if (result.upsertedCount) {
		// why is this backwards?
		betterPrint(`Manga ${manga.ref} created`, sig);
	} else {
		betterPrint(`Manga ${manga.ref} updated`, sig);
	}
}

export async function writeUser(user: User) {
	const sig = 'db/mongo:writeUser';

	const result = await mangaCollection.updateOne(
		{ ref: user.username },
		{ $set: user },
		{ upsert: true }
	);

	if (result.upsertedCount) {
		// because it works !! (don't ask, i don't know)
		betterPrint(`User ${user.username} created`, sig);
	} else {
		betterPrint(`User ${user.username} updated`, sig);
	}
}
// #endregion

// #region Drop/Delete
export async function deleteFile(file_id: ObjectId) {
	const sig = 'db/mongo:deleteFile';

	await mangaBucket.delete(file_id);
	betterPrint(`Deleted file: ${file_id}`, sig);
}

export async function deleteManga(manga: Manga) {
	const sig = 'db/mongo:deleteManga';

	const result = await mangaCollection.deleteOne(manga);
	if (!result.acknowledged) {
		betterPrintError(`Delete request not acknowledged: ${manga.ref}`, sig);
	} else if (!result.deletedCount) {
		betterPrintWarning(`No manga found to be deleted: ${manga.ref}`, sig);
	} else {
		betterPrint(`Deleted manga: ${manga.ref}`, sig);
	}
}

export async function deleteUser(user: User) {
	const sig = 'db/mongo:deleteUser';

	const result = await usersCollection.deleteOne(user);
	if (!result.acknowledged) {
		betterPrintError(`Delete request not acknowledged: ${user.username}`, sig);
	} else if (!result.deletedCount) {
		betterPrintWarning(`No user found to be deleted: ${user.username}`, sig);
	} else {
		betterPrint(`Deleted user: ${user.username}`, sig);
	}
}

export async function dropMangaCollection() {
	const sig = 'db/mongo:dropMangaCollection';

	await mangaCollection.drop();
	betterPrint('Dropped manga collection', sig);
}

export async function dropUsersCollection() {
	const sig = 'db/mongo:dropUsersCollection';

	await usersCollection.drop();
	betterPrint('Dropped users collection', sig);
}

export async function dropMangaBucket() {
	const sig = 'db/mongo:dropMangaBucket';

	await mangaBucket.drop();
	betterPrint('Dropped manga bucket', sig);
	betterPrintWarning('Manga collection will be out-of-date, consider dropping', sig);
}
// #endregion

// #region Upload
export async function uploadFile(fileName: string, buffer: Buffer<ArrayBuffer>, manga: Manga) {
	// This works, so it's fine, but it's stupid, so it's not fine
	const sig = 'db/mongo:uploadFile';

	betterPrint(`Uploading file: ${fileName}`, sig);

	const id = Math.ceil(Math.random() * 65535);
	const destPath = `/file-temp-${id}`;

	fs.writeFileSync(destPath, buffer);

	await new Promise((resolve) =>
		fs
			.createReadStream(destPath)
			.pipe(
				mangaBucket.openUploadStream(fileName, {
					chunkSizeBytes: 1048576,
					metadata: manga
				})
			)
			.on('close', resolve)
	);

	betterPrint(`File uploaded to: ${destPath}`, sig);

	fs.unlinkSync(destPath);
}
// #endregion

// #region Get
export async function getImageData(imagePath: string): Promise<string> {
	// This works, so it's fine, but it's stupid, so it's not fine
	const sig = 'db/mongo:getImage';

	betterPrint(`Getting image: ${imagePath}`, sig);

	const id = Math.ceil(Math.random() * 65535);
	const destPath = `/image-temp-${id}`;

	let image = '';
	try {
		await new Promise((resolve, reject) => {
			const writeStream = fs.createWriteStream(destPath);
			const downloadStream = mangaBucket.openDownloadStreamByName(imagePath);

			downloadStream.pipe(writeStream);

			writeStream.on('finish', () => {
				betterPrint(`Write stream finished successfully!`, sig);
				resolve(destPath);
			});

			downloadStream.on('error', reject);
			writeStream.on('error', reject);
		});
	} catch (error) {
		betterPrintError(`${error}`, sig);
	}

	try {
		image = Buffer.from(fs.readFileSync(destPath)).toString('base64'); // Check how async version works

		fs.unlinkSync(destPath); // Check how async version works

		betterPrint(`Removed temporary file`, sig);
	} catch (error) {
		betterPrintError(`${error}`, sig);
	}

	if (image != '') return `data:image;base64,${image}`;
	else return '';
}

export async function getImageDataArray(imagePaths: string[]): Promise<string[]> {
	const sig = 'db/mongo:getImageArray';

	const imagesArray: string[] = [];

	betterPrint(`Getting image array of ${imagePaths.length} item(s)`, sig);

	for (const image of imagePaths) {
		imagesArray.push(await getImageData(image));
	}

	betterPrint(`Completed getting image array, returning ${imagesArray.length} item(s)`, sig);

	return imagesArray;
}
// #endregion
