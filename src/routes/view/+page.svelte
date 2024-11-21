<script lang="ts">
	import { goto } from '$app/navigation';
	import { createElementId } from '$lib/utils.js';
	import {
		Button,
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
		Spinner
	} from '@sveltestrap/sveltestrap';

	const { data } = $props();

	let isOpen = $state(false);
	let isImageLoaded = $state(false);

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
	let path: string = $state('');

	$effect(() => {
		path = data.current ? data.current : '';
		breadcrumbData = createBreadcrumb(path);
	});
</script>

<Container>
	<div class="position-absolute top-0 start-0 h-100 w-100" style="padding-top:10em;">
		{#if !isImageLoaded}
			<div class="position-absolute top-50 start-50 translate-middle">
				<Spinner type="border"></Spinner> Loading
			</div>
		{/if}

		<div class="position-absolute top-0 start-0 h-100 w-100">
			<Image
				src="/view/image?path={path}"
				class="h-100 w-100"
				style="object-fit:contain; padding-top:6em;"
				onload={() => (isImageLoaded = true)}
			></Image>
		</div>

		<Button
			color="link"
			outline
			class="position-absolute top-0 start-0 h-100"
			style="width:20%;"
			onclick={() => {
				if (data.previous != null) goto(`/view?path=${data.previous}`);
			}}
		>
			<Icon name="chevron-left"></Icon>
		</Button>
		<Button
			color="link"
			outline
			class="position-absolute top-0 end-0 h-100 w-10"
			style="width:20%;"
			onclick={() => {
				if (data.next != null) goto(`/view?path=${data.next}`);
			}}
		>
			<Icon name="chevron-right"></Icon>
		</Button>
	</div>
</Container>

<Container class="sticky-top text-bg-light">
	<Navbar dark expand="md" container="md">
		<NavbarBrand href="/">Gallery</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ms-auto" navbar>
				<NavItem>
					<NavLink href="/s3/{path}" target="_blank">
						<Icon name="download"></Icon>&nbsp;Get
					</NavLink>
				</NavItem>
			</Nav>
			<Nav navbar>
				<NavItem>
					<NavLink disabled={data.previous == null} href={`/view?path=${data.previous}`}>
						<Icon name="chevron-left"></Icon>&nbsp;Previous
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink disabled={data.next == null} href={`/view?path=${data.next}`}>
						<div class="d-md-none"><Icon name="chevron-right"></Icon>&nbsp;Next</div>
						<div class="d-none d-md-block">Next&nbsp;<Icon name="chevron-right"></Icon></div>
					</NavLink>
				</NavItem>
			</Nav>
		</Collapse>
	</Navbar>
	<nav aria-label="breadcrumb">
		<ol class="breadcrumb">
			{#each breadcrumbData as b, i}
				{#if i != breadcrumbData.length - 1}
					<li class="breadcrumb-item">
						<a href="/browse?path={b.prefix}#{createElementId(breadcrumbData[i+1].name)}">{b.name}</a>
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
