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

	let isOpen = $state(false);

	function handleUpdate(event: CustomEvent<boolean>) {
		isOpen = event.detail;
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
		<Col class="mt-3">
			<Card class="h-100">
				<CardHeader><Icon name="folder-fill"></Icon>&nbsp;Hello</CardHeader>
			</Card>
		</Col>
		<Col class="mt-3">
			<Card class="h-100">
				<CardBody><Icon name="folder-fill"></Icon>&nbsp;Hello</CardBody>
			</Card>
		</Col>
		<Col class="mt-3">
			<Card class="h-100">
				<CardBody><Icon name="folder-fill"></Icon>&nbsp;Hello</CardBody>
			</Card>
		</Col>

		<Col class="mt-3">
			<Card class="h-100">
				<CardHeader><Icon name="image"></Icon> &nbsp; Hello</CardHeader>
				<CardBody>
					<Image
						thumbnail
						src="http://192.168.1.70:9199/gallery/cg%2F%5BPixiv%20FANBOX%5D%20Kilesha%20%E3%81%8D%E3%82%8C%E3%82%90%E3%81%97%E3%82%83%2028724783%20(2018.04.27-2023.08.23)%2F008.jpg"
					></Image>
				</CardBody>
			</Card>
		</Col>
		<Col class="mt-3">
			<Card class="h-100">
				<CardHeader><Icon name="image"></Icon> &nbsp; Hello</CardHeader>
				<CardBody>
					<Image
						thumbnail
						src="http://192.168.1.70:9199/gallery/cg%2F%5BPixiv%20FANBOX%5D%20Kilesha%20%E3%81%8D%E3%82%8C%E3%82%90%E3%81%97%E3%82%83%2028724783%20(2018.04.27-2023.08.23)%2F009.jpg"
					></Image>
				</CardBody>
			</Card>
		</Col>
		<Col class="mt-3">
			<Card class="h-100">
				<CardHeader><Icon name="image"></Icon> &nbsp; Hello</CardHeader>
				<CardBody>
					<Image
						thumbnail
						src="http://192.168.1.70:9199/gallery/cg%2F%5BPixiv%20FANBOX%5D%20Kilesha%20%E3%81%8D%E3%82%8C%E3%82%90%E3%81%97%E3%82%83%2028724783%20(2018.04.27-2023.08.23)%2F010.jpg"
					></Image>
				</CardBody>
			</Card>
		</Col>
		<Col class="mt-3">
			<Card class="h-100">
				<CardHeader><Icon name="image"></Icon> &nbsp; Hello</CardHeader>
				<CardBody>
					<Image
						thumbnail
						src="http://192.168.1.70:9199/gallery/cg%2F%5BPixiv%20FANBOX%5D%20Kilesha%20%E3%81%8D%E3%82%8C%E3%82%90%E3%81%97%E3%82%83%2028724783%20(2018.04.27-2023.08.23)%2F007.jpg"
					></Image>
				</CardBody>
			</Card>
		</Col>
		<Col class="mt-3">
			<Card class="h-100">
				<CardHeader><Icon name="image"></Icon> &nbsp; Hello</CardHeader>
				<CardBody>
					<Image
						thumbnail
						src="http://192.168.1.70:9199/gallery/cg%2F%5BPixiv%20FANBOX%5D%20Kilesha%20%E3%81%8D%E3%82%8C%E3%82%90%E3%81%97%E3%82%83%2028724783%20(2018.04.27-2023.08.23)%2F006.jpg"
					></Image>
				</CardBody>
			</Card>
		</Col>
	</Row>
</Container>
