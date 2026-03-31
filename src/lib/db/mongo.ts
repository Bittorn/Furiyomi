import { env } from '$env/dynamic/private';
import { GridFSBucket, MongoClient } from 'mongodb';
import type { Manga, User } from './helpers';

const client = new MongoClient(env.MONGO_URL);

// connect to the database
export async function startMongo(): Promise<MongoClient> {
	return client.connect();
}

export const db = client.db('furiyomi');

export const mangaCollection = db.collection<Manga>('manga');
export const usersCollection = db.collection<User>('users');

export const mangaBucket = new GridFSBucket(db);
