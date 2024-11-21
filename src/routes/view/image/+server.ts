import { publicObjectUrl } from '$lib/minio';
import sharp from 'sharp'

const VIEW_IMAGE_WIDTH = 2048
const VIEW_IMAGE_HEIGHT = 2048

export async function GET({ url, fetch }) {
	const path = url.searchParams.get('path');
	const targetUrl = publicObjectUrl(path ? path : "")

	try {
		const resp = await fetch(targetUrl)
		const data = await sharp(await resp.arrayBuffer())
			.resize(VIEW_IMAGE_WIDTH, VIEW_IMAGE_HEIGHT, { fit: "inside" })
			.jpeg()
			.toBuffer()

		return new Response(data, {
			headers: {
				'Content-Type': 'images/jpeg'
			}
		});
	} catch (e) {
		console.log(e);
	}
}