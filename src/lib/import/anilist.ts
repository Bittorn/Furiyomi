import type { Title } from '$lib/db/mongo';
import { betterPrint, betterPrintError } from '$lib/logs/logger';

export interface AniList {
	data: Data;
}

export interface Data {
	Page: Page;
}

export interface Media {
	id: number;
	siteUrl: string;
	description: string;
	title: Title;
	startDate: StartDate;
	genres: string[];
	tags: Tags[];
}

export interface Page {
	media: Media[];
}

export interface StartDate {
	year: number;
}

export interface Tags {
	name: string;
	isMediaSpoiler: boolean;
}

const query = `
	query ($search: String!) {
		Page {
			media(search: $search, type: MANGA) {
				id
				siteUrl
				description
				title {
					romaji
					english
					native
				}
				startDate {
					year
				}
				genres
				tags {
					name
					isMediaSpoiler
				}
			}
		}
	}
`;

export async function queryAnilist(search: string): Promise<void | AniList> {
	betterPrint(`Querying AniList for: ${search}`, 'server:queryAnilist');

	// From https://docs.anilist.co/guide/graphql/

	// Define our query variables and values that will be used in the query request
	const variables = {
		search
	};

	// Define the config we'll need for our Api request
	const url = 'https://graphql.anilist.co',
		options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: query,
				variables: variables
			})
		};

	// Make the HTTP Api request
	return await fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
}

function handleResponse(response: { json: () => Promise<AniList>; ok: unknown }) {
	return response.json().then(function (json) {
		return response.ok ? json : Promise.reject(json);
	});
}

function handleData(data: AniList) {
	betterPrint(`Response received!`, 'server:handleData');
	return data;
}

function handleError(err: unknown) {
	betterPrintError(
		`Error when querying AniList: ${JSON.stringify(err, null, 2)}`,
		'server:handleError'
	);
}
