export function queryAnilist(search: string) {
	// From https://docs.anilist.co/guide/graphql/

	// Here we define our query as a multi-line string
	// Storing it in a separate .graphql/.gql file is also possible
	const query = `
        query ($search: String!) {
            Page {
                media(search: $search, type: MANGA) {
                id
                title {
                    romaji
                    english
                    native
                }
                    startDate {
                        day
                        month
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
	fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
}

function handleResponse(response: { json: () => Promise<unknown>; ok: unknown }) {
	return response.json().then(function (json) {
		return response.ok ? json : Promise.reject(json);
	});
}

function handleData(data: unknown) {
	console.log(data);
}

function handleError(err: unknown) {
	console.error('Error when querying AniList:', err);
}
