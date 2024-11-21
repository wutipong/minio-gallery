<script lang="ts">
	import { getFilenameFromKey } from '$lib/utils.js';
	import {
		Card,
		CardBody,
		CardHeader,
		Col,
		Collapse,
		Container,
		Icon,
		Image,
		Nav,
		Navbar,
		NavbarBrand,
		NavbarToggler,
		NavItem,
		NavLink,
		Row
	} from '@sveltestrap/sveltestrap';

	import ThumbnailCard from './ThumbnailCard.svelte';

	const { data } = $props();

	let isOpen = $state(false);

	function handleUpdate(event: CustomEvent<boolean>) {
		isOpen = event.detail;
	}

	interface BreadcrumbData {
		name: string;
		prefix: string;
	}
	function createBreadcrumb(path?: string): BreadcrumbData[] {
		let output = [];
		output.push({
			name: '<root>',
			prefix: ''
		});

		if (!path) {
			return output;
		}

		let parts = path?.split('/');
		parts = parts?.slice(0, -1);

		for (let i = 0; i < parts?.length; i++) {
			const prefix = parts.slice(0, i + 1).join('/');

			output.push({
				name: parts[i],
				prefix: prefix + '/'
			});
		}

		return output;
	}

	let breadcrumbData: BreadcrumbData[] = $state([]);

	$effect(() => {
		breadcrumbData = createBreadcrumb(data.path);
	});
</script>

<Container class="sticky-top text-bg-light">
	<Navbar dark expand="md" container="md">
		<NavbarBrand href="/">Gallery</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ms-auto" navbar>
				<NavItem>
					<NavLink href="/about"><Icon name="info-circle"></Icon>&nbsp;About</NavLink>
				</NavItem>
			</Nav>
		</Collapse>
	</Navbar>
	<nav aria-label="breadcrumb">
		<ol class="breadcrumb">
			{#each breadcrumbData as b, i}
				{console.log(b, i)}
				{#if i != breadcrumbData.length - 1}
					<li class="breadcrumb-item">
						<a href="/browse?path={b.prefix}">{b.name}</a>
					</li>
				{/if}
				{#if i == breadcrumbData.length - 1}
					<li class="breadcrumb-item active" aria-current="page">
						{b.name}
					</li>
				{/if}
			{/each}
		</ol>
	</nav>
</Container>

<Container>
	<Row cols={{ lg: 3, md: 2, sm: 1, xs: 1 }}>
		{#if data.prefixes}
			{#each data.prefixes as object}
				<Col class="mt-3">
					<ThumbnailCard name={object.name} type={object.type} ></ThumbnailCard>
				</Col>
			{/each}
		{/if}
		{#if data.objects}
			{#each data.objects as object}
				<Col class="mt-3">
					<ThumbnailCard name={object.name} type={object.type} ></ThumbnailCard>
				</Col>
			{/each}
		{/if}
	</Row>
</Container>
