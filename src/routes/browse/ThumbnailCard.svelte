<script lang="ts">
	import { createElementId, getFilenameFromKey } from '$lib/utils';
	import { Card, Icon, Image, CardBody } from '@sveltestrap/sveltestrap';

	let { name, type } = $props();

	function getLink(name: string, type: string): string {
		switch (type) {
			case 'image':
			case 'media':
				return `/view?path=${name}`;

			case 'directory':
			case 'zip':
				return `/browse?path=${name}`;
		}

		return '';
	}

	function getIcon(type: string): string {
		switch (type) {
			case 'image':
				return `image`;
			case 'media':
				return `file-play`;

			case 'directory':
				return `folder`;

			case 'zip':
				return `file-zip`;
		}

		return '';
	}

	function getImageSource(name: string, type: string): string {
		switch (type) {
			case 'image':
				return `/browse/thumb?path=${name}`;

			case 'media':
				return MEDIA_IMAGE_SOURCE;

			case 'directory':
				return DIRECTORY_IMAGE_SOURCE;

			case 'zip':
				return ZIP_IMAGE_SOURCE;
		}

		return '';
	}

	function getIconColor(type: string): string {
		switch (type) {
			case 'image':
				return IMAGE_ICON_COLOR;

			case 'media':
				return MEDIA_ICON_COLOR;

			case 'directory':
				return DIRECTORY_ICON_COLOR;

			case 'zip':
				return ZIP_ICON_COLOR;
		}

		return '';
	}

	const DIRECTORY_ICON_COLOR = 'goldenrod';
	const ZIP_ICON_COLOR = 'yellowgreen';
	const MEDIA_ICON_COLOR = 'navy';
	const IMAGE_ICON_COLOR = 'lightblue';

	const DIRECTORY_IMAGE_SOURCE = `
		data:image/svg+xml;utf8,
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${DIRECTORY_ICON_COLOR}" class="bi bi-folder " viewBox="0 0 16 16">
			<path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
		</svg>`;

	const ZIP_IMAGE_SOURCE = `
		data:image/svg+xml;utf8,
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${ZIP_ICON_COLOR}" class="bi bi-file-zip" viewBox="0 0 16 16">
			<path d="M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.93-.62-.4-1.598a1 1 0 0 1-.03-.243z"/>
			<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1z"/>
		</svg>`;

	const MEDIA_IMAGE_SOURCE = `
		data:image/svg+xml;utf8,
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${MEDIA_ICON_COLOR}" class="bi bi-file-play" viewBox="0 0 16 16">
			<path d="M6 10.117V5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43z"/>
			<path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
		</svg>`;
</script>

<Card data-id={createElementId(getFilenameFromKey(name, type))}>
	<a href={getLink(name, type)}>
		<Image
			class="card-img-top"
			loading="lazy"
			src={getImageSource(name, type)}
			style="min-width:300px; min-height: 300px;"
		></Image>
	</a>
	<CardBody>
		<Icon name={getIcon(type)} style="color:{getIconColor(type)};"></Icon>
		&nbsp;{getFilenameFromKey(name, type)}
	</CardBody>
</Card>
