import { publicObjectUrl } from '$lib/minio';
import sharp from 'sharp'

const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 300;

export async function GET({ url, fetch }) {
	const path = url.searchParams.get('path');
	const targetUrl = publicObjectUrl(path ? path : "")

	try {
		const resp = await fetch(targetUrl, {
			headers: {
				'X-Minio-Extract': 'true'
			},
		});

		const data = await sharp(await resp.arrayBuffer())
			.resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT)
			.webp()
			.toBuffer()

		return new Response(data, {
			headers: {
				'Content-Type': 'image/webp'
			}
		});
	} catch (e) {
		return new Response(JSON.stringify(e));
	}
}