import { env } from '$env/dynamic/private';
import { GridFSBucket, MongoClient } from 'mongodb';

// const client = new MongoClient(env.MONGO_URL, {
// 	compressors: ['zstd']
// });

const client = new MongoClient(env.MONGO_URL);

// connect to the database
export async function startMongo(): Promise<MongoClient> {
	return client.connect();
}

export const db = client.db('furiyomi');

export const mangaCollection = db.collection('manga');
export const usersCollection = db.collection('users');

export const mangaBucket = new GridFSBucket(db);
