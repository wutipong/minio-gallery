import { handler } from './build/handler.js';
import express from 'express';
import 'dotenv/config';
import proxy from 'express-http-proxy';

const app = express();

const endpoint = process.env.MINIO_ENDPOINT;
const bucket = process.env.MINIO_BUCKET;

console.log(`endpoint: ${endpoint}`);
console.log(`bucket: ${bucket}`);

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

app.use(
	'/s3',
	proxy(endpoint, {
		proxyReqPathResolver: (req) => req.url.replace(/^\/s3/, `/${bucket}/`),
		proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
			proxyReqOpts.headers['X-Minio-Extract'] = 'true';
			proxyReqOpts.headers['authorization'] = undefined;

			return proxyReqOpts;
		}
	})
);

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
