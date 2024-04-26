<script lang="ts">
	import { type ComponentProps, onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	import placeholder from '$lib/placeholder.png';
	import { optimizeImage } from '../../utils/image-helpers';

	import type { IdeaStoryblok } from '../../../component-types-sb'; // @TODO better import?

	export let data;

	let showModal = false;
	let modalContent: ComponentProps<ModalContent> = { title: '', description: undefined };

	// for storyblok live editor
	if (data.ideaStory && data.previewMode) {
		onMount(() => {
			useStoryblokBridge<IdeaStoryblok>(
				data.ideaStory!.id,
				(newStory) => (data.ideaStory = newStory)
			);
		});
	}
</script>

{#if !!data.postStories}
	<CardBigText content={[{ component: 'bigText', leftText: data.postStories.name }]} />
	<ArticlesSection
		data={data.postStories.data.stories.map((story) => ({
			// @TODO handle without this placeholder
			src: optimizeImage(story.content.featuredImage, '1068x392') ?? placeholder,
			title: story.content.title,
			description: story.content.subtitle,
			link: { to: `/${story.full_slug}` }
		}))}
	/>
{:else if !!data.ideaStory}
	{#each data.ideaStory.content.listOfBlocks as blok}
		{#if blok.component === 'messageCard'}
			<StoryblokComponent {blok} />
		{/if}

		{#if blok.component === 'adList'}
			<ArticlesSection
				data={blok.ads.map((ad) => ({
					title: ad.title,
					link: {
						label: 'Explore the idea',
						onClick: () => {
							modalContent = { title: ad.title, description: ad.content };
							showModal = true;
						}
					},
					_editable: ad._editable // pasing so storyblokEditable works
				}))}
			/>
		{/if}
	{/each}

	<Modal bind:showModal>
		<ModalContent {...modalContent} />
	</Modal>
{/if}
