<script>
	import { getFilenameFromKey } from '$lib/utils';
	import { Card, CardHeader, Icon, Image, CardBody, Spinner } from '@sveltestrap/sveltestrap';

	let { name, type } = $props();
	let loading = $state(true);
</script>

<Card>
	{#if type == 'directory'}
		<CardHeader>
			<Icon name="folder-fill"></Icon>&nbsp;{getFilenameFromKey(name, type)}
		</CardHeader>
		<CardBody>
			<a href="/browse?path={name}">
				<Image
					thumbnail
					src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="gray" class="bi bi-folder-fill" viewBox="-4 -4 24 24">
                <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
                </svg>`}
				></Image>
			</a>
		</CardBody>
	{/if}
	{#if type == 'zip'}
		<CardHeader>
			<Icon name="file-zip"></Icon>&nbsp;{getFilenameFromKey(name, type)}
		</CardHeader>

		<CardBody>
			<a href="/browse?path={name}">
				<Image
					thumbnail
					src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="gray" class="bi bi-file-zip" viewBox="-4 -4 24 24">
            <path d="M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.93-.62-.4-1.598a1 1 0 0 1-.03-.243z"/>
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1z"/>
            </svg>`}
				></Image>
			</a>
		</CardBody>
	{/if}
	{#if type == 'image'}
		<CardHeader>
			<Icon name="image"></Icon>&nbsp;{getFilenameFromKey(name, type)}
		</CardHeader>
		<CardBody>
			<a href="/view?path={name}">
				<Image
					thumbnail
					loading="lazy"
					src="/thumb?path={name}"
					style="min-width:300px; min-height: 300px;"
					onload={() => {
						loading = false;
					}}
				></Image>
				{#if loading}
					<Spinner type="border" class="position-absolute top-50 start-50 translate-middle"
					></Spinner>
				{/if}
			</a>
		</CardBody>
	{/if}
</Card>
