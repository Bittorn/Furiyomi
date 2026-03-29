import { error } from '@sveltejs/kit';
import { existsSync, readFileSync, writeFileSync } from 'fs';

export const dbJsonPath = `static/data/db.json`;
export const dbMangaPath = `static/data/manga`

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
	console.log(`Checking database...`);
	if (existsSync(dbJsonPath)) {
		console.log(`Database JSON found at ${dbJsonPath}`);
		console.log(`Attempting to parse...`);
		db = fetchDB();
		if (db) {
			console.log(`Database parsed`);
		} else {
			console.error('Unable to parse database', 500);
		}
	} else {
		console.log(`Database not found, recreating...`);
		db = {
			manga: [],
			users: []
		};
	}

	console.log(`Writing database...`);

	try {
		writeFileSync(dbJsonPath, JSON.stringify(db, null, 2));
	} catch {
		console.error(`Unable to write database`, 500);
		throw error(500, 'Unable to write database');
	}

	console.log(`Database checked successfully!`);
}

export function fetchDB(): Database {
	if (!existsSync(dbJsonPath)) checkDB()
	try {
		const dbFile = readFileSync(dbJsonPath, { encoding: 'utf8', flag: 'r' });
		const dbJson: Database = JSON.parse(dbFile);
		return dbJson;
	} catch {
		console.error('Unable to parse database', 500);
		throw error(500, 'Unable to parse database');
	}
}

export function updateManga(manga: Manga) {
	const db = fetchDB();

	let updateExisting = false;

	console.log(`Updating manga...`);

	for (const entry of db.manga) {
		if (entry.uuid == manga.uuid || entry.id == manga.id) {
			console.log(`Found existing entry: ${entry.id}`);
			updateExisting = true;
			// if UUID is different, whilst having same ID
			manga.uuid = entry.uuid;
			db.manga[db.manga.indexOf(entry)] = manga;
		}
	}

	if (!updateExisting) {
		console.log(`No entry found, creating...`);
		db.manga.push(manga);
	}

	writeDB(db);
}

function writeDB(db: Database) {
	console.log(`Writing database...`);

	try {
		writeFileSync(dbJsonPath, JSON.stringify(db, null, 2));
	} catch {
		console.error(`Unable to write database`, 500);
		throw error(500, 'Unable to write database');
	}

	console.log(`Database written successfully!`);
}
