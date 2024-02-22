<script lang="ts">
	import { type ComponentProps, onMount } from 'svelte';
	import { useStoryblokBridge } from '@storyblok/svelte';

	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	import type { IdeaStoryblok } from '../../../component-types-sb'; // @TODO better import?

	export let data;

	let showModal = false;
	let modalContent: ComponentProps<ModalContent> = { title: '', description: undefined };

	// for storyblok live editor
	if (data.story?.id && data.previewMode) {
		onMount(() => {
			useStoryblokBridge<IdeaStoryblok>(data.story!.id, (newStory) => (data.story = newStory));
		});
	}
</script>

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

{#if !!data.story}
	<ArticlesSection
		data={data.story.content.ads.map((ad) => ({
			title: ad.title,
			link: {
				label: 'Explore the idea',
				onClick: () => {
					modalContent = { title: ad.title, description: ad.content };
					showModal = true;
				}
			}
		}))}
	/>
{/if}

<Modal bind:showModal>
	<ModalContent {...modalContent} />
</Modal>
