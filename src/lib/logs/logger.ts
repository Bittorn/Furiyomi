export function betterPrint(message: string, trace: string) {
	console.log(`${new Date().toLocaleTimeString()} [${trace}]: ${message}`);
}

export function betterPrintWarning(message: string, trace: string) {
	console.log(`%c${new Date().toLocaleTimeString()} [${trace}][WARN]: ${message}`, 'color:yellow;');
}

export function betterPrintError(message: string, trace: string, error?: number) {
	if (!error) error = 0;
	console.error(
		`%c${new Date().toLocaleTimeString()} [${trace}][ERROR #%d]: ${message}`,
		'color:red;font-weight:bold;',
		error
	);
}
