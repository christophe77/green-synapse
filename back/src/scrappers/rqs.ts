import fs from 'fs';
import path from 'path';
import { generatePDF, getSitemapUrls, isInterestingUrl } from './utils';

export default async function initRqsCollection(): Promise<boolean> {
    const rqsSitemapUrl = 'https://www.royalqueenseeds.fr/sitemapFR.xml';

    const urls = await getSitemapUrls(rqsSitemapUrl);

    for (const url of urls) {
        const filename = url.split('/')?.pop()?.replace(/[?=]/g, '_') + '.pdf';
        const outputPath = path.join(
            __dirname,
            '../',
            'data',
            'pdf',
            'rqs',
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
