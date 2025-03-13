import fs from 'fs';
import path from 'path';

import { getSitemapUrls, isInterestingUrl, generatePDF } from './utils';

export default async function initZamnesiaCollection(): Promise<boolean> {
	const zamnesiaSitemapUrl = 'https://www.zamnesia.com/sitemapFR.xml';

	const urls = await getSitemapUrls(zamnesiaSitemapUrl);

	for (const url of urls) {
		const filename = url.split('/')?.pop()?.replace(/[?=]/g, '_') + '.pdf';
		const outputPath = path.join(
			__dirname,
			'../',
			'data',
			'pdf',
			'zamnesia',
			filename,
		);

		const isInteresting = isInterestingUrl(url);
		const analyseUrl =
			filename !== '.pdf' && !fs.existsSync(outputPath) && isInteresting;

		if (analyseUrl) {
			console.log(`Génération du PDF pour: ${url} dans ${outputPath}`);
			try {
				await generatePDF(url, outputPath);
			} catch (error) {
				console.log(`Erreur génération du PDF pour: ${url}; ${error}`);
			}
		}
	}
	return true;
}
