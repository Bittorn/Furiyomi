import { betterPrint, betterPrintError, betterPrintWarning } from '$lib/logs/logger';
import { error } from '@sveltejs/kit';
import { existsSync, readFileSync, writeFileSync } from 'fs';

export const dbJsonPath = `static/data/db.json`;
export const dbMangaPath = `static/data/manga`;

// #region Interfaces
export interface Database {
	manga: Manga[];
	users: Users[];
}

export interface Manga {
	id: string;
	uuid: string;
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
}

export interface Users {
	username: string;
	password: string;
}
// #endregion

export function checkDB() {
	let db: Database;
	betterPrint(`Checking database...`, 'server:checkDB');
	if (existsSync(dbJsonPath)) {
		betterPrint(`Database JSON found at ${dbJsonPath}`, 'server:checkDB');
		betterPrint(`Attempting to parse...`, 'server:checkDB');
		db = fetchDB();
		if (db) {
			betterPrint(`Database parsed`, 'server:checkDB');
		} else {
			betterPrintError('Unable to parse database', 'server:checkDB', 500);
		}
	} else {
		betterPrintWarning(`Database not found, recreating...`, 'server:checkDB');
		db = {
			manga: [],
			users: []
		};
	}

	betterPrint(`Writing database...`, 'server:checkDB');

	try {
		writeFileSync(dbJsonPath, JSON.stringify(db, null, 2));
	} catch {
		betterPrintError(`Unable to write database`, 'server:checkDB', 500);
		throw error(500, 'Unable to write database');
	}

	betterPrint(`Database checked successfully!`, 'server:checkDB');
}

export function fetchDB(): Database {
	if (!existsSync(dbJsonPath)) checkDB();
	try {
		const dbFile = readFileSync(dbJsonPath, { encoding: 'utf8', flag: 'r' });
		const dbJson: Database = JSON.parse(dbFile);
		return dbJson;
	} catch {
		betterPrintError('Unable to parse database', 'server:fetchDB', 500);
		throw error(500, 'Unable to parse database');
	}
}

export function updateManga(manga: Manga) {
	const db = fetchDB();

	let updateExisting = false;

	betterPrint(`Updating manga...`, 'server:updateManga');

	for (const entry of db.manga) {
		if (entry.uuid == manga.uuid || entry.id == manga.id) {
			betterPrint(`Found existing entry: ${entry.id}`, 'server:updateManga');
			updateExisting = true;
			// if UUID is different, whilst having same ID
			manga.uuid = entry.uuid;
			db.manga[db.manga.indexOf(entry)] = manga;
		}
	}

	if (!updateExisting) {
		betterPrint(`No entry found, creating...`, 'server:updateManga');
		db.manga.push(manga);
	}

	writeDB(db);
}

function writeDB(db: Database) {
	betterPrint(`Writing database...`, 'server:writeDB');

	try {
		writeFileSync(dbJsonPath, JSON.stringify(db, null, 2));
	} catch {
		betterPrintError(`Unable to write database`, 'server:writeDB', 500);
		throw error(500, 'Unable to write database');
	}

	console.log(`Database written successfully!`);
}
