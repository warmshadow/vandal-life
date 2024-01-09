<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	import placeholder from '$lib/placeholder.png';

	let showModal = false;
	let modalContent = { title: '', description: undefined };

	export let data: any;
</script>

{#if !data.isIdeaPage}
	<CardBigText
		content={[{ component: 'bigText', leftText: data.categoryStories.name }]}
		isCategoryName
	/>
	<ArticlesSection
		data={data.categoryStories.data.stories.map((story) => ({
			src: placeholder,
			title: story.content.title,
			description: story.content.subtitle,
			link: { to: `/${story.full_slug}` }
		}))}
	/>
{:else}
	<CardBigText content={[{ component: 'bigText', leftText: 'anything\ngoes.' }]} />
	<CardBigText
		content={[
			{
				component: 'smallText',
				text: '‘anything goes’ is an additional part of the magazine which operates as a market of ideas, meaning that this is the place there you can submit and sell your creative thoughts. all rights reserved.'
			}
		]}
		variant="secondary"
	/>
	<!-- Temporary, update layout later -->
	<CardBigText
		content={[
			{
				component: 'bigText',
				leftText: 'what we\nhave now?'
			}
		]}
		variant="secondary"
	/>

	<ArticlesSection
		data={data.categoryStories.data.stories.map((story) => ({
			title: story.content.title,
			link: {
				label: 'Explore the idea',
				onClick: () => {
					modalContent = {
						title: story.content.title,
						description: story.content.content
					};
					showModal = true;
				}
			}
		}))}
	/>

	<Modal bind:showModal>
		<ModalContent {...modalContent} />
	</Modal>
{/if}
