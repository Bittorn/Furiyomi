import { env } from '$env/dynamic/private';
import { GridFSBucket, MongoClient } from 'mongodb';
import { betterPrint, betterPrintError, betterPrintWarning } from '$lib/logs/logger';
import type { ObjectId } from 'mongodb';
import { createWriteStream } from 'node:fs';
import { readFile, unlink } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

// #region Interface - Database
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

const client = new MongoClient(env.MONGO_URL);

// connect to the database
export async function startMongo(): Promise<MongoClient> {
	return client.connect();
}

export const db = client.db('furiyomi');

export const mangaCollection = db.collection<Manga>('manga');
export const usersCollection = db.collection<User>('users');

export const mangaBucket = new GridFSBucket(db);

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

export async function getImage(imagePath: string): Promise<string> {
	const sig = 'db/mongo:getImage';

	betterPrint(`Getting image: ${imagePath}`, sig);

	const id = Math.ceil(Math.random() * 65535);

	mangaBucket.openDownloadStreamByName(imagePath).pipe(createWriteStream(`./image-temp-${id}`));

	// Literally the worst way to do this.

	betterPrint(`Waiting for timeout (stupid)`, sig);

	await setTimeout(4);

	betterPrint(`Timeout complete, attempting to parse...`, sig);

	// So stupid and bad.

	const image: string = Buffer.from(await readFile('./file-temp')).toString('base64');

	await unlink(`./image-temp-${id}`);

	betterPrint(`Removed temporary file`, sig);

	return image;
}

export async function getImageArray(imagesPath: string): Promise<string[]> {
	// NOT CURRENTLY IMPLEMENTED
	const sig = 'db/mongo:getImageArray';

	const imagesArray: string[] = []

	betterPrint(`Getting image array: ${imagesPath}`, sig);

	return imagesArray;
}
