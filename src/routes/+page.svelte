<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import CategorySection from '$lib/sections/CategorySection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	import placeholder from '$lib/placeholder.png';

	import type { HomePageStoryblok } from '../../component-types-sb'; // @TODO better import?

	export let data;

	let showModal = false;
	let modalContent = { title: '', description: undefined };

	// for storyblok live editor
	if (data.story.id && data.previewMode) {
		onMount(() => {
			useStoryblokBridge<HomePageStoryblok>(data.story.id, (newStory) => (data.story = newStory));
		});
	}
</script>

{#if data.categoriesStories}
	{#each data.categoriesStories as category, index}
		{#if data.story?.content?.listOfMessages[index]}
			{#each data.story.content.listOfMessages[index].cards as card}
				<StoryblokComponent blok={card} />
			{/each}
		{/if}

		<CategorySection
			data={{
				categoryCard: { content: [{ component: 'bigText', leftText: category.name }] },
				// @TODO altOrder will be an exception for anything-goes
				cards: category.data.stories.map((story) => ({
					src: placeholder,
					title: story.content.title,
					description: story.content.subtitle,
					link: { to: `/${story.full_slug}` }
				})),
				categoryLink: `/${category.slug}`
			}}
			altOrder={!(index % 2)}
		/>
	{/each}
{/if}

<Modal bind:showModal>
	<ModalContent {...modalContent} />
</Modal>
