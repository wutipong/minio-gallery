import { publicObjectUrl } from '$lib/minio';
import sharp from 'sharp'

const VIEW_IMAGE_WIDTH = 2048
const VIEW_IMAGE_HEIGHT = 2048

export async function GET({ url, fetch }) {
	const path = url.searchParams.get('path');
	const targetUrl = publicObjectUrl(path ? path : "")

	try {
		const resp = await fetch(targetUrl, {
			headers: {
				'X-Minio-Extract': 'true'
			},
		});

		if(path?.endsWith('.gif')){
			return new Response(await resp.arrayBuffer(), {
				headers: {
					'Content-Type': 'image/gif'
				}
			});
		}

		const image = sharp(await resp.arrayBuffer())
			.resize(VIEW_IMAGE_WIDTH, VIEW_IMAGE_HEIGHT, { fit: "inside" }).webp();

		const data = await image.toBuffer()

		return new Response(data, {
			headers: {
				'Content-Type': 'image/webp'
			}
		});
	} catch (e) {
		return new Response(JSON.stringify(e));
	}
}