import { writeManga, type Manga } from '$lib/db/helpers';
import { queryAnilist, type AniList, type Tags } from './anilist';
import { betterPrint, betterPrintError } from '$lib/logs/logger';

export async function downloadMetadata(manga: Manga) {
	const sig = 'import/metadata:downloadMetadata'

	betterPrint(`Querying AniList: ${manga.ref}`, sig)

	const data: AniList | void = await queryAnilist(manga.title.romaji);
	if (!data) {
		betterPrintError(`Unable to download metadata`, 'server:downloadMetadata', 500);
		return;
	}

	const anilist_data = data.data.Page.media[0];

	manga.anilist_id = anilist_data.id;
	manga.title = anilist_data.title;
	manga.year = anilist_data.startDate.year;
	manga.link = anilist_data.siteUrl;
	manga.genres = anilist_data.genres;
	manga.tags = await processTags(anilist_data.tags);
	manga.description = await formatDescription(anilist_data.description);

	writeManga(manga)
}

async function formatDescription(description: string): Promise<string> {
	const sig = 'import/metadata:formatDescription'

	// just get rid of all HTML tags
	// and anilist-specific stuff
	betterPrint('Formatting AniList description...', sig)
	description = description.replace(/(<([^>]+)>)/gi, '').split('(Source')[0];
	return description;
}

async function processTags(tags: Tags[]): Promise<string[]> {
	const sig = 'import/metadata:processTags'

	betterPrint('Processing AniList tags...', sig)
	const toReturn: string[] = [];
	for (const tag of tags) {
		if (!tag.isMediaSpoiler) toReturn.push(tag.name);
	}
	return toReturn;
}
