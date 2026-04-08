import { getImageData } from '$lib/db/mongo';
import { betterPrint, betterPrintError } from '$lib/logs/logger.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	// Handle query parameters
	const image = url.searchParams.get('image');
	const sig = '/api/image/server';

	betterPrint(`Received API image request: ${image}`, sig);

	if (image) {
		const imageData = await getImageData(image);
		return json(imageData);
	}

	betterPrintError(`Invalid API request`, sig);

	return new Response(null, { status: 204 });
}
