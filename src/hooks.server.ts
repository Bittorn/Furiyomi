import { startMongo } from '$lib/db/mongo';
import { betterPrint, betterPrintError } from '$lib/logs/logger';

// Connect to MongoDB before starting the server
betterPrint('Connecting to MongoDB...', 'hooks.server.ts')
startMongo()
	.then((): void => {
		betterPrint('Connected to MongoDB', 'hooks.server.ts');
	})
	.catch((e) => {
		betterPrintError('Failed to connect to MongoDB', 'hooks.server.ts');
		console.error(e);
	});