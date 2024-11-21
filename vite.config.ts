import { sveltekit } from '@sveltejs/kit/vite';
import { vite as vidstack } from 'vidstack/plugins';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [vidstack(), sveltekit()],
		server: {
			proxy: {
				'/s3': {
					target: env.MINIO_ENDPOINT,
					rewrite: (path) => path.replace(/^\/s3/, `/${env.MINIO_BUCKET}/`),
					changeOrigin: true,
					configure: (proxy, _options) => {
						proxy.on('proxyReq', function (proxyReq, req, res, options) {
							proxyReq.setHeader('X-Minio-Extract', 'true');
							proxyReq.removeHeader("authorization");
						});
					},
				}
			}
		}
	}
});
