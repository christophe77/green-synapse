"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonKeywords = exports.VectorStore = void 0;
exports.initDocumentCollection = initDocumentCollection;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parse_1 = require("./lib/parse");
const transform_1 = require("./lib/transform");
const save_1 = require("./lib/save");
const vectorStore_1 = require("./lib/vectorStore");
Object.defineProperty(exports, "VectorStore", { enumerable: true, get: function () { return vectorStore_1.VectorStore; } });
const queryAI_1 = __importDefault(require("../queryai"));
exports.commonKeywords = [
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
async function initDocumentCollection() {
    const websitesToScrap = [
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
        await processWebsite(website);
    });
    async function processWebsite(website) {
        // get urls from sitemap
        const urls = await (0, parse_1.getSitemapUrls)(website.sitemapUrl);
        for (const url of urls) {
            const filename = url.split('/')?.pop()?.replace(/[?=]/g, '_') + '.pdf';
            const outputPath = path_1.default.join(path_1.default.resolve(), '/data/documents/pdf', website.name);
            const outpuFilePath = path_1.default.join(outputPath, filename);
            if (!fs_1.default.existsSync(outputPath)) {
                fs_1.default.mkdirSync(outputPath, { recursive: true });
            }
            if (!fs_1.default.existsSync(outpuFilePath)) {
                await processUrl(url, filename, outpuFilePath);
            }
        }
    }
    async function processUrl(url, filename, outpuFilePath) {
        // parse document
        const htmlContent = (0, parse_1.parseDocument)(url);
        // transform content
        const transformedHtmlContent = (0, transform_1.transformData)(htmlContent);
        if (transformedHtmlContent.transformed && transformedHtmlContent.content) {
            const readableFilename = filename.replace(/[^a-zA-Z ]/g, ' ');
            for (const keyword of exports.commonKeywords) {
                if (readableFilename.includes(keyword)) {
                    await (0, save_1.saveToPdf)(transformedHtmlContent.content, filename, outpuFilePath);
                    const htmlContentToText = transformedHtmlContent.content.replace(/<[^>]*>?/gm, '');
                    const textToStore = htmlContentToText.replace(/\s+/g, ' ').trim();
                    console.log('textToStore', textToStore);
                    (await (0, queryAI_1.default)()).addTextToVectorStore(filename, textToStore);
                    break;
                }
            }
        }
    }
}
initDocumentCollection();
