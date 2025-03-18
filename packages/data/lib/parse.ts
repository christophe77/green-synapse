import { JSDOM } from 'jsdom';
import { parseStringPromise } from 'xml2js';

export async function getSitemapUrls(sitemapUrl: string): Promise<string[]> {
	const response = await fetch(sitemapUrl);
	const xmlContent = await response.text();

	const result = await parseStringPromise(xmlContent);

	const urls: string[] = result.urlset.url.map((entry: any) => entry.loc[0]);
	return urls;
}

export function parseDocument(htmlContent: string): Document {
	const dom = new JSDOM(htmlContent);
	const doc = dom.window.document;
	return doc;
}
