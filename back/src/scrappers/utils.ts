import fs from 'fs';
import { parseStringPromise } from 'xml2js';
import * as chromePdf from 'html-pdf-chrome';
import { JSDOM } from 'jsdom';

export async function getSitemapUrls(sitemapUrl: string): Promise<string[]> {
    const response = await fetch(sitemapUrl);
    const xmlContent = await response.text();

    const result = await parseStringPromise(xmlContent);

    const urls: string[] = result.urlset.url.map((entry: any) => entry.loc[0]);
    return urls;
}

function removeUselessInformations(htmlContent: string): string {
    const dom = new JSDOM(htmlContent);
    const doc = dom.window.document;

    const header = doc.querySelector('#header');
    const footer = doc.querySelector('#footer');
    const category = doc.querySelector('#right_column');
    const ekomi = doc.querySelector('.ekomi-widget-container');

    if (header) {
        header.remove();
    }
    if (footer) {
        footer.remove();
    }
    if (category) {
        category.remove();
    }
    if (ekomi) {
        ekomi.remove();
    }

    return doc.documentElement.outerHTML;
}

export async function generatePDF(url: string, outputPath: string) {
    const response = await fetch(url);
    const htmlContent = await response.text();
    const cleanedHtml = removeUselessInformations(htmlContent);
    const createResult = await chromePdf.create(cleanedHtml);
    const pdfBuffer = await createResult.toBuffer();
    fs.writeFileSync(outputPath, pdfBuffer);
    console.log(`PDF généré pour ${url}`);
}

export function isInterestingUrl(url: string): boolean {
    let isInteresting = false;
    const keywords = [
        'graine',
        'blog',
        'article',
        'tuto',
        'cannabis',
        'sativa',
        'indica',
        'hybrid',
        'weed',
        'hash',
        'strain',
        'headshop',
        'vapo',
        'thc',
        'cbd',
    ];
    keywords.forEach((keyword) => {
        if (url.toLowerCase().indexOf(keyword) !== -1) {
            isInteresting = true;
        }
    });
    return isInteresting;
}