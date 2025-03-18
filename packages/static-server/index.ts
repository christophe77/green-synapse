import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = 9000;
const __dirname = path.resolve();
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

http
	.createServer(function (req, res) {
		console.log(`${req.method} ${req.url}`);

		// parse URL
		const parsedUrl = new URL(req.url ?? '', `http://localhost:${port}`);

		// extract URL path
		// Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
		// e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
		// by limiting the path to current directory only
		const sanitizePath = path
			.normalize(parsedUrl.pathname)
			.replace(/^(\.\.[\/\\])+/, '');
		let pathname = path.join(__dirname,'web', sanitizePath);

		fs.access(pathname, function (err) {
			if (err) {
				// if the file is not found, return 404
				res.statusCode = 404;
				res.end(`File ${pathname} not found!`);
				return;
			}

			// if is a directory, then look for index.html
			if (fs.statSync(pathname).isDirectory()) {
				pathname += '/index.html';
			}

			// read file from file system
			fs.readFile(pathname, function (err, data) {
				if (err) {
					res.statusCode = 500;
					res.end(`Error getting the file: ${err}.`);
				} else {
					// based on the URL path, extract the file extention. e.g. .js, .doc, ...
					const ext = path.parse(pathname).ext;
					// if the file is found, set Content-type and send data
					res.setHeader('Content-type', mimeType[ext as keyof typeof mimeType] || 'text/plain');
					res.end(data);
				}
			});
		});
	})
	.listen(port);

console.log(`Server listening on port ${port}`);
