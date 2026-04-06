import { command } from '$app/server';
import { dropMangaBucket, dropMangaCollection, dropUsersCollection } from '$lib/db/mongo';

export const dropMangaCollectionRemote = command(async () => {
	dropMangaCollection();
});
export const dropUsersCollectionRemote = command(async () => {
	dropUsersCollection();
});
export const dropMangaBucketRemote = command(async () => {
	dropMangaBucket();
});
export const dropDatabaseRemote = command(async () => {
	dropMangaBucket();
	dropMangaCollection();
	dropUsersCollection();
});
