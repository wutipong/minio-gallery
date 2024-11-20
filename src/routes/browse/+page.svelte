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

    const { data } = $props()

	let isOpen = $state(false);

	function handleUpdate(event: CustomEvent<boolean>) {
		isOpen = event.detail;
	}

    function getFilename(name: string, type: 'image' | 'zip' | 'directory'){
        if (type == 'zip' || type == 'directory'){
            name = name.substring(0, name.length -1)
        }

        return name.substring(name.lastIndexOf('/') +1)
    }

</script>

<Container class="sticky-top text-bg-light">
	<Navbar dark expand="md" container="md">
		<NavbarBrand href="/">NavBar with md container</NavbarBrand>
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
			<li class="breadcrumb-item"><a href="#">gallery</a></li>
			<li class="breadcrumb-item"><a href="#">cg</a></li>
			<li class="breadcrumb-item active" aria-current="page">
				[Pixiv FANBOX] Kilesha きれゐしゃ 28724783 (2018.04.27-2023.08.23)
			</li>
		</ol>
	</nav>
</Container>

<Container>
	<Row cols={{ lg: 3, md: 2, sm: 1, xs: 1 }}>
        {#each data.objects as object}
		<Col class="mt-3">
			<Card class="h-100">
                {#if object.type == 'directory'}
				<CardHeader><Icon name="folder-fill"></Icon>&nbsp;{getFilename(object.name, object.type)}</CardHeader>
                {/if}
                {#if object.type == 'zip'}
                <CardHeader><Icon name="file-zip"></Icon>&nbsp;{getFilename(object.name, object.type)}</CardHeader>
                {/if}
                {#if object.type == 'image'}
                <CardHeader><Icon name="image"></Icon>&nbsp;{getFilename(object.name, object.type)}</CardHeader>
                <CardBody>
					<Image
						thumbnail
                        lazy
						src="/thumb?path={object.name}"
					></Image>
				</CardBody>
                {/if}
            </Card>
		</Col>
        {/each}
	</Row>
</Container>
