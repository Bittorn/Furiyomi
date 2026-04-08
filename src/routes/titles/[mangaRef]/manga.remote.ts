import { command } from '$app/server';
import { mangaCollection, type Manga } from '$lib/db/mongo';
import { downloadMetadata } from '$lib/import/metadata';

export const refreshMetadata = command('unchecked', async (manga: Manga) => {
	const foundManga: Manga | null = await mangaCollection.findOne({
		ref: manga.ref
	});

	if (foundManga) {
		await downloadMetadata(foundManga);
	}
});
