<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { type ISbStoryData, StoryblokComponent } from '@storyblok/svelte';
	import { storyblokEditable } from '@storyblok/svelte';
	import type { PageData } from '../routes/$types';

	import CategorySection from '$lib/sections/CategorySection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	import { optimizeImage } from '../utils/image-helpers';

	import type { HomePageStoryblok } from '../../component-types-sb'; // @TODO better import?

	export let blok: ISbStoryData<HomePageStoryblok>['content'];
	export let categoriesStories: PageData['categoriesStories'];

	let showModal = false;
	let modalContent: ComponentProps<ModalContent> = { title: '', description: undefined };
</script>

{#if categoriesStories}
	{@const allPostCategories = categoriesStories.filter(
		(category) => category.data.stories[0].content.component === 'post'
	)}

	{#each blok.listOfBlocks as nestedBlok}
		{#if nestedBlok.component === 'messageCard'}
			<StoryblokComponent blok={nestedBlok} />
		{/if}

		{#if nestedBlok.component === 'categoryName'}
			{@const category = categoriesStories.find((category) => category.slug === nestedBlok.slug)}
			{#if category}
				<div use:storyblokEditable={nestedBlok}>
					{#if category.data.stories[0].content.component === 'post'}
						{@const index = allPostCategories.findIndex(
							(category) => category.slug === nestedBlok.slug
						)}

						<!-- post stories -->
						<CategorySection
							data={{
								categoryCard: {
									content: [
										{
											component: 'bigText',
											leftText: nestedBlok.title
										}
									]
								},
								// slicing first three posts
								cards: category.data.stories.slice(0, 3).map((story) => ({
									src: optimizeImage(story.content.featuredImage, '1068x392') ?? undefined,
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
											leftText: nestedBlok.title
										}
									]
								},
								// slicing first 3 ads
								cards: category.data.stories[0].content.listOfBlocks
									.find(({ component }) => component === 'adList')
									?.ads.slice(0, 3)
									//@ts-ignore
									.map((ad) => ({
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
				</div>
			{/if}
		{/if}
	{/each}
{/if}

<Modal bind:showModal>
	<ModalContent {...modalContent} />
</Modal>
