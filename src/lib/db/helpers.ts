import { betterPrint, betterPrintError, betterPrintWarning } from '$lib/logs/logger';
import type { ObjectId } from 'mongodb';
import { mangaBucket, mangaCollection, usersCollection } from './mongo';

// #region Interfaces
export interface Manga {
	_id?: ObjectId;
	ref: string;
	upload_date: string;
	anilist_id: number;
	title: Title;
	year: number;
	genres: string[];
	tags: string[];
	cover: string;
	link: string;
	description: string;
	volumes: Volumes[];
}

export interface Title {
	romaji: string;
	english: string;
	native: string;
}

export interface Volumes {
	title: string;
	cover: string;
}

export interface Users {
	_id?: ObjectId;
	username: string;
	password: string;
}
// #endregion

// #region MongoDB
export async function writeManga(manga: Manga) {
	const sig = 'db/helpers:writeManga';

	const result = await mangaCollection.updateOne(
		{ ref: manga.ref },
		{ $set: manga },
		{ upsert: true }
	);

	if (result.upsertedCount) {
		betterPrint(`Manga ${manga.ref} updated`, sig);
	} else {
		betterPrint(`Manga ${manga.ref} created`, sig);
	}
}

export async function writeUser(user: Users) {
	const sig = 'db/helpers:writeUser';

	const result = await mangaCollection.updateOne(
		{ ref: user.username },
		{ $set: user },
		{ upsert: true }
	);

	if (result.upsertedCount) {
		betterPrint(`Manga ${user.username} updated`, sig);
	} else {
		betterPrint(`Manga ${user.username} created`, sig);
	}
}

export async function deleteFile(file_id: ObjectId) {
	const sig = 'db/helpers:deleteFile'
	
	await mangaBucket.delete(file_id)
	betterPrint(`Deleted file: ${file_id}`, sig);
}

export async function deleteManga(manga: Manga) {
	const sig = 'db/helpers:deleteManga';

	const result = await mangaCollection.deleteOne(manga);
	if (!result.acknowledged) {
		betterPrintError(`Delete request not acknowledged: ${manga.ref}`, sig);
	} else if (!result.deletedCount) {
		betterPrintWarning(`No manga found to be deleted: ${manga.ref}`, sig);
	} else {
		betterPrint(`Deleted manga: ${manga.ref}`, sig);
	}
}

export async function deleteUser(user: Users) {
	const sig = 'db/helpers:deleteUser';

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
	// why would you ever use this?!?
	const sig = 'db/helpers:dropMangaCollection';

	await mangaCollection.drop();
	betterPrint('Dropped manga collection', sig);
}

export async function dropUsersCollection() {
	// again, why would you ever use this?!?
	const sig = 'db/helpers:dropUsersCollection';

	await usersCollection.drop();
	betterPrint('Dropped users collection', sig);
}

export async function dropMangaBucket() {
	const sig = 'db/helpers:dropMangaBucket';

	await mangaBucket.drop();
	betterPrint('Dropped manga bucket', sig);
	betterPrintWarning('Manga collection will not be out-of-date, consider dropping', sig);
}
// #endregion
