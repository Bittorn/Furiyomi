import { fail } from '@sveltejs/kit';
import { readFileSync } from 'fs';

const userJsonPath = `data/users.json`;

export function load({ cookies }) {
	const user = cookies.get('user');

	return {user};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		let userJson;

		try {
			const userFile = readFileSync(userJsonPath, { encoding: 'utf8', flag: 'r' });
			userJson = JSON.parse(userFile);
		} catch {
			return fail(500, {
				error: true,
				message: 'Could not load users.'
			});
		}

		const username = formData.get('username') as string;
		// const password = formData.get('password') as string;

		// console.log(password);

		// // The password should be hashed already, but do it again for safety
		// const passwordHash = pbkdf2Sync(password, username, 100000, 64, 'sha512').toString('base64');

		// console.log(passwordHash);

		try {
			for (const user of userJson.users) {
				if (user.username == username) {
					console.log(`User found: ${user.username}`);
					cookies.set('user', user.username, { path: '/' })

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
				message: 'User data was malformed.'
			});
		}

		return {
			success: true
		};
	}
};
