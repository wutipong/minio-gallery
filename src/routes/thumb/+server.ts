import sharp from 'sharp'

export async function GET({url, fetch}) {
	const path = url.searchParams.get('path');
	const targetUrl = `/s3/${path}`

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
}