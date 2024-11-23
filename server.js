import { handler } from './build/handler.js';
import express from 'express';
import 'dotenv/config';
import proxy from 'express-http-proxy';
import httpProxy from 'http-proxy';

const app = express();

const endpoint = process.env.MINIO_ENDPOINT;
const bucket = process.env.MINIO_BUCKET;
const region = process.env.MINIO_REGION;

console.log(`endpoint: ${endpoint}`);
console.log(`bucket: ${bucket}`);
console.log(`region: ${region}`)

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

/*
app.use(
	'/s3',
	proxy(endpoint, {
		proxyReqPathResolver: (req) => req.url.replace(/^\/s3/, `/${bucket}/`),
		proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
			proxyReqOpts.headers['X-Minio-Extract'] = 'true';
			delete proxyReqOpts.headers['authorization'];

			return proxyReqOpts;
		}
	})
);
*/

var apiProxy = httpProxy.createProxyServer();

app.use("/s3", function (req, res) {
	apiProxy.web(req, res, {
		target: env.MINIO_ENDPOINT,
		rewrite: (path) => path.replace(/^\/s3/, `/${env.MINIO_BUCKET}/`),
		changeOrigin: true,
		configure: (proxy, _options) => {
			proxy.on('proxyReq', function (proxyReq, req, res, options) {
				proxyReq.setHeader('X-Minio-Extract', 'true');
				proxyReq.removeHeader("authorization");
			});
		},
	});
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
