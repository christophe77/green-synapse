import fs from 'fs';
import path from 'path';
import { getSitemapUrls, parseDocument } from './lib/parse';
import { transformData } from './lib/transform';
import { saveToPdf } from './lib/save';
import { Website } from '../data/types';
import queryAI from '../queryAI';

const commonKeywords = [
	'cannabis',
	'strain',
	'cbd',
	'seed',
	'grow',
	'smoke',
	'marijuana',
	'indica',
	'sativa',
	'hybrid',
	'thc',
	'hemp',
	'weed',
	'plant',
	'flower',
	'bud',
	'harvest',
	'cultivate',
];

export async function initDocumentCollection(): Promise<void> {
	const websitesToScrap: Website[] = [
		{
			name: 'zamnesia',
			sitemapUrl: 'https://www.zamnesia.com/us/sitemapUS.xml',
		},
		{
			name: 'royalqueenseeds',
			sitemapUrl: 'https://www.royalqueenseeds.com/sitemapUS.xml',
		},
		{
			name: 'latitudedispensary',
			sitemapUrl: 'https://latitudedispensary.com/sitemap.xml',
		},
	];
	websitesToScrap.forEach(async (website) => {
		// get urls from sitemap
		const urls = await getSitemapUrls(website.sitemapUrl);

		for (const url of urls) {
			// parse document
			const htmlContent = parseDocument(url);
			// transform content
			const transformedHtmlContent = transformData(htmlContent);
			// save to pdf
			const filename = url.split('/')?.pop()?.replace(/[?=]/g, '_') + '.pdf';
			const outputPath = path.join(
				path.resolve(),
				'/data/documents/pdf',
				website.name,
			);

			if (!fs.existsSync(outputPath)) {
				fs.mkdirSync(outputPath, { recursive: true });
			}
			if (
				transformedHtmlContent.transformed &&
				transformedHtmlContent.content
			) {
				const outpuFilePath = path.join(outputPath, filename);
				const readableFilename = filename.replace(/[^a-zA-Z ]/g, ' ');

				for (const keyword of commonKeywords) {
					if (readableFilename.includes(keyword)) {
						await saveToPdf(
							transformedHtmlContent.content,
							filename,
							outpuFilePath,
						);
						const htmlContentToText = transformedHtmlContent.content.replace(/<[^>]*>?/gm, '');
						const textToStore = htmlContentToText.replace(/\s+/g, ' ').trim();
						console.log('textToStore', textToStore);
						(await queryAI()).addTextToVectorStore(filename, textToStore);

						break;
					}
				}
			}
		}
	});
}
initDocumentCollection();
