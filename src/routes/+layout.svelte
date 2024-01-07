<script lang="ts">
	import '@fontsource/inter';
	import '../styles/styles.css';

	import { Header } from '$lib';
	import ScrollToTop from '$lib/ScrollToTop.svelte';

	export let data: any; // @TODO add typing
</script>

<div class="layout-wrapper">
	<Header
		links={[
			{ label: 'home', link: '/' },
			...data.categories.map(({ name, slug }) => ({ label: name, link: '/' })) // @TODO use slug when pages are ready
		]}
	/>
	<div class="page-content-wrapper">
		<slot />
	</div>
	<ScrollToTop />
</div>

<style>
	.layout-wrapper {
		max-width: 1512px;
		margin: 32px auto;

		padding: 0 24px;
	}

	@media (min-width: 700px) {
		.layout-wrapper {
			padding: 0 32px;
		}
	}

	.page-content-wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 24px;
	}

	@media (min-width: 1460px) {
		.page-content-wrapper {
			row-gap: 40px;
		}
	}
</style>
