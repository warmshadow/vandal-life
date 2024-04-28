<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { type ISbStoryData, StoryblokComponent } from '@storyblok/svelte';

	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	import type { IdeaStoryblok } from '../../component-types-sb'; // @TODO better import?

	export let blok: ISbStoryData<IdeaStoryblok>['content'];

	let showModal = false;
	let modalContent: ComponentProps<ModalContent> = { title: '', description: undefined };
</script>

{#key blok}
	{#each blok.listOfBlocks as nestedBlok}
		{#if nestedBlok.component === 'messageCard'}
			<StoryblokComponent blok={nestedBlok} />
		{/if}

		{#if nestedBlok.component === 'adList'}
			<ArticlesSection
				data={nestedBlok.ads.map((ad) => ({
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
{/key}
