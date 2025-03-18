import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = 9000;
const dirname = path.resolve();
const isDev = fs.existsSync(path.join(dirname, '../web'));
const webDir = isDev
	? path.join(dirname, '../web')
	: path.join(dirname, '../../web');

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

		// extract URL path and validate it's within web directory
		const sanitizePath = path
			.normalize(parsedUrl.pathname)
			.replace(/^(\.\.[\/\\])+/, '');
		const pathname = path.join(webDir, sanitizePath);

		// Validate the path is within web directory
		if (!pathname.startsWith(webDir)) {
			res.statusCode = 403;
			res.end('Access denied');
			return;
		}

		fs.access(pathname, function (err) {
			if (err) {
				// if the file is not found, return 404
				res.statusCode = 404;
				res.end(`File ${parsedUrl.pathname} not found!`);
				return;
			}

			// if is a directory, then look for index.html
			if (fs.statSync(pathname).isDirectory()) {
				const indexPath = path.join(pathname, 'index.html');
				if (fs.existsSync(indexPath)) {
					serveFile(indexPath, res);
				} else {
					res.statusCode = 404;
					res.end('Directory index not found');
				}
			} else {
				serveFile(pathname, res);
			}
		});
	})
	.listen(port);

function serveFile(filePath: string, res: http.ServerResponse) {
	fs.readFile(filePath, function (err, data) {
		if (err) {
			res.statusCode = 500;
			res.end(`Error getting the file: ${err}.`);
		} else {
			// based on the URL path, extract the file extention. e.g. .js, .doc, ...
			const ext = path.parse(filePath).ext;
			// if the file is found, set Content-type and send data
			res.setHeader(
				'Content-type',
				mimeType[ext as keyof typeof mimeType] || 'text/plain',
			);
			res.end(data);
		}
	});
}

console.log(`Server listening on port ${port}`);
