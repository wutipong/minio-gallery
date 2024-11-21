import { publicObjectUrl } from '$lib/minio';
import sharp from 'sharp'

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
			.resize(300, 300)
			.webp()
			.toBuffer()

		return new Response(data, {
			headers: {
				'Content-Type': 'images/webp'
			}
		});
	} catch (e) {
		return new Response(JSON.stringify(e));
	}
}