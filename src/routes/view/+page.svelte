<script lang="ts">
	import { goto } from '$app/navigation';
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

<Container class="sticky-top text-bg-light">
	<Navbar dark expand="md" container="md">
		<NavbarBrand href="/">Gallery</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav class="ms-auto" navbar>
				<NavItem>
					<NavLink
						disabled={data.previous == null}
						href={`/view?path=${data.previous}`}
					>
						<Icon name="chevron-left"></Icon>Previous
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						disabled={data.next == null}
						href={`/view?path=${data.next}`}
					>
						Next<Icon name="chevron-right"></Icon>
					</NavLink>
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
	<div class="position-relative">
		{#if !isImageLoaded}
			<div class="w-100">
				<Spinner type="border"></Spinner> Loading
			</div>
		{/if}
		<a href="/s3/{path}" target="_blank">
			<Image
				src="/view/image?path={path}"
				class="w-100"
				onload={() => (isImageLoaded = true)}
			></Image>
		</a>
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
