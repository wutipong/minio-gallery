<script lang="ts">
	import { createElementId } from '$lib/utils.js';
	import {
		Col,
		Collapse,
		Container,
		Icon,
		Nav,
		Navbar,
		NavbarBrand,
		NavbarToggler,
		NavItem,
		NavLink,
		Row,
		Spinner
	} from '@sveltestrap/sveltestrap';

	import ThumbnailCard from './ThumbnailCard.svelte';
	import { navigating } from '$app/stores';

	const { data } = $props();

	let isOpen = $state(false);

	function handleUpdate(event: CustomEvent<boolean>) {
		isOpen = event.detail;
	}

	interface BreadcrumbData {
		prefix: string;
		name: string;
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
		$inspect(breadcrumbData);
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
				{#if i == breadcrumbData.length - 1}
					<li class="breadcrumb-item active" aria-current="page">
						{b.name}
					</li>
				{:else}
					<li class="breadcrumb-item">
						<a href="/browse?path={b.prefix}#{createElementId(breadcrumbData[i + 1].name)}">
							{b.name}
						</a>
					</li>
				{/if}
			{/each}
		</ol>
	</nav>
</Container>

{#if $navigating}
	<Container>
		<div class="position-absolute top-50 start-50 translate-middle">
			<Spinner type="border"></Spinner>&NonBreakingSpace;Loading
		</div>
	</Container>
{:else}
	<Container>
		<Row cols={{ lg: 3, md: 2, sm: 1, xs: 1 }}>
			{#if data.prefixes}
				{#each data.prefixes as object}
					<Col class="mt-3">
						<ThumbnailCard name={object.name} type={object.type}></ThumbnailCard>
					</Col>
				{/each}
			{/if}
			{#if data.objects}
				{#each data.objects as object}
					<Col class="mt-3">
						<ThumbnailCard name={object.name} type={object.type}></ThumbnailCard>
					</Col>
				{/each}
			{/if}
		</Row>
	</Container>
{/if}
