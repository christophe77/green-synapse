import initZamnesiaCollection from './zamnesia';
import initRqsCollection from './rqs';

export default async function initCollection():Promise<boolean> {
	try {
		console.log('Collections initialization...');
		await initZamnesiaCollection();
		await initRqsCollection();
		return true;
	} catch (error) {
		console.log('Error initializing collections : ', error);
		return false;
	}
}
