import { fail } from '@sveltejs/kit';

// export function load({ cookies }) {
// 	const user = cookies.get('user');

// 	return { user };
// }

export const actions = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	default: async ({ request, cookies }) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const formData = await request.formData();

		// do some stuff

		try {
			// do something that can throw an error
		} catch {
			return fail(500, {
				error: true,
				message: 'An error occurred'
			});
		}

		return {
			success: true
		};
	}
};
