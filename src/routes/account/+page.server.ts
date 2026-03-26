import { fetchDB } from '$lib/db/helpers.js';
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
		// const password = formData.get('password') as string;

		// console.log(password);

		// // The password should be hashed already, but do it again for safety
		// const passwordHash = pbkdf2Sync(password, username, 100000, 64, 'sha512').toString('base64');

		// console.log(passwordHash);

		try {
			for (const user of db.users) {
				if (user.username == username) {
					console.log(`User found: ${user.username}`);
					cookies.set('user', user.username, { path: '/' });

					// if (user.password == passwordHash || !user.password) {
					// 	console.log(`Password valid!`);
					// } else {
					// 	console.log(`Password invalid`);
					// }
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
