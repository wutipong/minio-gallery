import { MINIO_BUCKET, MINIO_ENDPOINT } from '$env/static/private';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/s3': {
				target: MINIO_ENDPOINT,
				rewrite: (path) => path.replace(/^\/s3/, `/${MINIO_BUCKET}/`),
				changeOrigin: true,
				configure: (proxy, _options) => {
					proxy.on('proxyReq', function(proxyReq, req, res, options) {
						proxyReq.setHeader('X-Minio-Extract', 'true');
						proxyReq.removeHeader("authorization");
					  });
				  },
			}
		}
	}
});
