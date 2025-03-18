"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSitemapUrls = getSitemapUrls;
exports.parseDocument = parseDocument;
const jsdom_1 = require("jsdom");
const xml2js_1 = require("xml2js");
async function getSitemapUrls(sitemapUrl) {
    const response = await fetch(sitemapUrl);
    const xmlContent = await response.text();
    const result = await (0, xml2js_1.parseStringPromise)(xmlContent);
    const urls = result.urlset.url.map((entry) => entry.loc[0]);
    return urls;
}
function parseDocument(htmlContent) {
    const dom = new jsdom_1.JSDOM(htmlContent);
    const doc = dom.window.document;
    return doc;
}
