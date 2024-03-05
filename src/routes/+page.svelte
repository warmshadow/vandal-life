<script lang="ts">
	import { type ComponentProps, onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import CategorySection from '$lib/sections/CategorySection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	import placeholder from '$lib/placeholder.png';

	import type { HomePageStoryblok } from '../../component-types-sb'; // @TODO better import?

	export let data;

	let showModal = false;
	let modalContent: ComponentProps<ModalContent> = { title: '', description: undefined };

	// for storyblok live editor
	if (data.story.id && data.previewMode) {
		onMount(() => {
			useStoryblokBridge<HomePageStoryblok>(data.story.id, (newStory) => (data.story = newStory));
		});
	}
</script>

{#if data.categoriesStories}
	{@const allPostCategories = data.categoriesStories.filter(
		(category) => category.data.stories[0].content.component !== 'idea'
	)}

	{#each data.story.content.listOfBlocks as block}
		{#if block.component === 'messageCard'}
			<StoryblokComponent blok={block} />
		{/if}

		{#if block.component === 'categoryName'}
			{@const category = data.categoriesStories.find((category) => category.slug === block.slug)}
			{#if category}
				{#if category.data.stories[0].content.component !== 'idea'}
					{@const index = allPostCategories.findIndex((category) => category.slug === block.slug)}

					<!-- post stories -->
					<CategorySection
						data={{
							categoryCard: {
								content: [
									{
										component: 'bigText',
										leftText: block.title
									}
								]
							},
							// slicing first three posts
							cards: category.data.stories.slice(0, 3).map((story) => ({
								src: placeholder,
								title: story.content.title,
								description: story.content.subtitle,
								link: { to: `/${story.full_slug}` }
							})),
							categoryLink: `/${category.slug}`
						}}
						altOrder={!(index % 2)}
					/>
				{:else}
					<!-- idea story -->
					<CategorySection
						data={{
							categoryCard: {
								content: [
									{
										component: 'bigText',
										leftText: block.title
									}
								]
							},
							// slicing first 3 ads
							cards: category.data.stories[0].content.ads.slice(0, 3).map((ad) => ({
								title: ad.title,
								link: {
									label: 'Explore the idea',
									onClick: () => {
										modalContent = { title: ad.title, description: ad.content };
										showModal = true;
									}
								}
							})),
							categoryLink: `/${category.slug}`
						}}
						altOrder={false}
					/>
				{/if}
			{/if}
		{/if}
	{/each}
{/if}

<Modal bind:showModal>
	<ModalContent {...modalContent} />
</Modal>
