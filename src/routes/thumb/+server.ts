import { publicObjectUrl } from '$lib/minio';
import sharp from 'sharp'

export async function GET({ url, fetch }) {
	const path = url.searchParams.get('path');
	const targetUrl = publicObjectUrl(path ? path : "")

	try {
		const resp = await fetch(targetUrl)

		const data = await sharp(await resp.arrayBuffer())
			.resize(300, 300)
			.jpeg()
			.toBuffer()

		return new Response(data, {
			headers: {
				'Content-Type': 'images/jpeg'
			}
		});
	} catch (e) {
		console.log(e)
	}
}