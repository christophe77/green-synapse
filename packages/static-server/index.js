"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = 9000;
const __dirname = path_1.default.resolve();
// maps file extention to MIME types
// full list can be found here: https://www.freeformatter.com/mime-types-list.html
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-ttf',
};
http_1.default
    .createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);
    // parse URL
    const parsedUrl = new url_1.URL(req.url ?? '', `http://localhost:${port}`);
    // extract URL path
    // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
    // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
    // by limiting the path to current directory only
    const sanitizePath = path_1.default
        .normalize(parsedUrl.pathname)
        .replace(/^(\.\.[\/\\])+/, '');
    let pathname = path_1.default.join(__dirname, 'web', sanitizePath);
    fs_1.default.access(pathname, function (err) {
        if (err) {
            // if the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }
        // if is a directory, then look for index.html
        if (fs_1.default.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
        }
        // read file from file system
        fs_1.default.readFile(pathname, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            }
            else {
                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = path_1.default.parse(pathname).ext;
                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
})
    .listen(port);
console.log(`Server listening on port ${port}`);
