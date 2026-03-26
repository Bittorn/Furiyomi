import { fetchDB } from '$lib/db/helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const db = fetchDB();

	return {
        mangaList: db.manga
	};
};
