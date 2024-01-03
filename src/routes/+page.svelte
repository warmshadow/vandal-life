<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import CategorySection from '$lib/sections/CategorySection.svelte';

	import placeholder from '$lib/placeholder.png';

	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data: any; // @TODO add typing so it covers both client side story and server side categories

	onMount(() => {
		useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
	});

	const categorySectionData = {
		categoryCard: { bigTextBlocks: { block1: { lines: ['new', 'news.', 'on', 'culture.'] } } },
		cards: [
			{
				src: placeholder,
				title: 'Lorem ipsum dolor sit amet consectetur.',
				description:
					'Besamma treskade turistkorridor såsom mora atovis. Mobilzombie heteronussa och surer dengar dekrongar...',
				link: { to: '/' }
			},
			{
				src: placeholder,
				title:
					'Lorem ipsum dolor sit amet consectetur. Commodo varius morbi platea metus. Quam vestibulum phasellus elit vitae.',
				description:
					'Besamma treskade turistkorridor såsom mora atovis. Mobilzombie heteronussa och surer dengar dekrongar...',
				link: { to: '/' }
			},
			{
				src: placeholder,
				title: 'Lorem ipsum dolor sit amet consectetur. Commodo varius morbi platea metus.',
				description:
					'Besamma treskade turistkorridor såsom mora atovis. Mobilzombie heteronussa och surer dengar dekrongar...',
				link: { to: '/' }
			}
		]
	};
</script>

<CardBigText
	bigTextBlocks={{
		block1: { lines: ['Fuck', 'trends.'] },
		block2: { lines: ['Love', 'friends.'] }
	}}
/>

<CardBigText
	title="A journal of ideas. A collaborative space. Insights on social and cultural life. Sharing a point of view on life today."
	bigTextBlocks={{
		block1: { lines: ['Can we make it', 'a new normal?'] }
	}}
	subtitle="It isn’t the powerful, top-down, institutional culture that’s spoon-fed to us that excited me. I learnt that, at least as an artist, the most meaningful, rich culture is the one that you create yourself, among friends, and even at home. Fritz Haeg"
	variant="black"
/>

<CategorySection data={categorySectionData} />

<CardBigText
	bigTextBlocks={{
		block1: { lines: ['Leave your phone', 'at home.'] }
	}}
/>

<CategorySection data={categorySectionData} altOrder />

<CardBigText
	bigTextBlocks={{
		block1: { lines: ['Love your', 'parents.'] }
	}}
/>

<CategorySection data={categorySectionData} />

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

<a href="/new-news-on-culture/cultural-shifts-unveiled">Test Postas</a>

{#if data.categories}
	{#each Object.keys(data.categories) as category}
		<!-- @TODO add custom red block here -->
		<CategorySection
			data={{
				...categorySectionData,
				// @TODO remove slice here when amount of stories are handled in +page.server.js
				// @TODO fix story argument typing error
				cards: data.categories[category].stories.slice(0, 3).map((story) => ({
					src: placeholder,
					title: story.content.title,
					description: story.content.subtitle,
					link: { to: `/${story.full_slug}` }
				}))
			}}
		/>
	{/each}
{/if}
