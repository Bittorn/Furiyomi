import { fetchDB } from '$lib/db/helpers.js';
import { betterPrint } from '$lib/logs/logger.js';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
	const user = cookies.get('user');

	return { user };
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const db = fetchDB();

		const username = formData.get('username') as string;
		betterPrint(`User attempting login: ${username}`, 'server:userLogin');

		try {
			for (const user of db.users) {
				if (user.username == username) {
					betterPrint(`User found: ${user.username}`, 'server:userLogin');
					cookies.set('user', user.username, { path: '/' });
				}
			}
		} catch {
			return fail(500, {
				error: true,
				message: 'Unable to parse user data.'
			});
		}

		return {
			success: true
		};
	}
};
