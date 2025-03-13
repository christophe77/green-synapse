import initCollections from './scrappers';

async function main() {
	try {
		const initializationDone = await initCollections();

		if (initializationDone) {
			console.log('initialization done');
		}
	} catch (error) {
		console.log(String(error));
	}
}
main();
