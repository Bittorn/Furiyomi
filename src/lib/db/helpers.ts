import { error } from '@sveltejs/kit';
import { readFileSync } from 'fs';

const dbJsonPath = `static/data/db.json`;

export function fetchDB() {
	try {
		const dbFile = readFileSync(dbJsonPath, { encoding: 'utf8', flag: 'r' });
		const dbJson = JSON.parse(dbFile);
		return dbJson;
	} catch {
		console.error('Unable to parse database', 500);
		throw error(500, 'Unable to parse database');
	}
}

// export function updateDB() {
// 	let db = fetchDB();
// }
