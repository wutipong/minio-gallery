import { handler } from './build/handler.js';
import express from 'express';
import 'dotenv/config';
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

var s3proxy = httpProxy.createProxyServer({
	changeOrigin: true,
	target: endpoint,
	protocolRewrite: "http",
});

s3proxy.on("proxyReq", function (proxyReq, req, res, optrions) {
	proxyReq.setHeader('X-Minio-Extract', 'true');
	proxyReq.removeHeader("authorization");

	proxyReq.path = `/${bucket}${proxyReq.path}`
})


app.use(/^\/s3/, function (req, res) {
	s3proxy.web(req, res, {});
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
