<script lang="ts">
	import {
		Card,
		CardBody,
		CardHeader,
		Col,
		Collapse,
		Container,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
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

	const { data } = $props();

	let isOpen = $state(false);

	function handleUpdate(event: CustomEvent<boolean>) {
		isOpen = event.detail;
	}

	function getFilename(name: string, type: 'image' | 'zip' | 'directory') {
		if (type == 'zip' || type == 'directory') {
			name = name.substring(0, name.length - 1);
		}

		return name.substring(name.lastIndexOf('/') + 1);
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
					<NavLink href="#components/">Components</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="https://github.com/sveltestrap/sveltestrap">GitHub</NavLink>
				</NavItem>
				<Dropdown nav inNavbar>
					<DropdownToggle nav caret>Options</DropdownToggle>
					<DropdownMenu end>
						<DropdownItem>Option 1</DropdownItem>
						<DropdownItem>Option 2</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>Reset</DropdownItem>
					</DropdownMenu>
				</Dropdown>
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
		{#if data.objects}
			{#each data.objects as object}
				<Col class="mt-3">
					<Card class="h-100">
						{#if object.type == 'directory'}
							<CardHeader>
								<Icon name="folder-fill"></Icon>&nbsp;{getFilename(object.name, object.type)}
							</CardHeader>
							<CardBody>
								<a href="/browse?path={object.name}">
									<Image
										thumbnail
										lazy
										src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="gray" class="bi bi-folder-fill" viewBox="-4 -4 24 24">
                                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
                                    </svg>`}
									></Image>
								</a>
							</CardBody>
						{/if}
						{#if object.type == 'zip'}
							<CardHeader>
								<Icon name="file-zip"></Icon>&nbsp;{getFilename(object.name, object.type)}
							</CardHeader>

							<CardBody>
								<a href="/browse?path={object.name}">
									<Image
										thumbnail
										lazy
										src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="gray" class="bi bi-file-zip" viewBox="-4 -4 24 24">
                                <path d="M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.93-.62-.4-1.598a1 1 0 0 1-.03-.243z"/>
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1z"/>
                                </svg>`}
									></Image>
								</a>
							</CardBody>
						{/if}
						{#if object.type == 'image'}
							<CardHeader>
								<Icon name="image"></Icon>&nbsp;{getFilename(object.name, object.type)}
							</CardHeader>
							<CardBody>
								<Image thumbnail lazy src="/thumb?path={object.name}"></Image>
							</CardBody>
						{/if}
					</Card>
				</Col>
			{/each}
		{/if}
	</Row>
</Container>
