<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import CategorySection from '$lib/sections/CategorySection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	import placeholder from '$lib/placeholder.png';

	import type { HomePageStoryblok } from '../../component-types-sb'; // @TODO better import?

	let showModal = false;
	let modalContent = { title: '', description: undefined };

	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data;

	// @TODO use same for story and homeStory and add same logic when to use onMount as in category page (check for query param)
	onMount(() => {
		useStoryblokBridge<HomePageStoryblok>(data.story.id, (newStory) => (data.story = newStory));
	});

	const categorySectionData = {
		categoryCard: { content: [{ component: 'bigText', leftText: 'new\nnews.\non\nculture.' }] }
	};
</script>

<!-- {#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if} -->

{#if data.categoriesStories}
	{#each data.categoriesStories as category, index}
		{#if data.story?.content?.listOfMessages[index]}
			{#each data.story.content.listOfMessages[index].cards as { content, variant }}
				<CardBigText {content} {variant} />
			{/each}
		{/if}

		<CategorySection
			data={{
				categoryCard: { content: [{ component: 'bigText', leftText: category.name }] },
				// @TODO fix story argument typing error
				cards: category.data.stories.map((story) =>
					story.content.component !== 'idea'
						? {
								src: placeholder,
								title: story.content.title,
								description: story.content.subtitle,
								link: { to: `/${story.full_slug}` }
						  }
						: {
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
						  }
				),
				categoryLink: `/${category.slug}`
			}}
			altOrder={category.data.stories[0].content.component !== 'idea' && !(index % 2)}
		/>
	{/each}
{/if}

<Modal bind:showModal>
	<ModalContent {...modalContent} />
</Modal>
