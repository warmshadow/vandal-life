<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';

	const data = [
		{
			title: 'Lorem ipsum dolor sit amet consectetur.',
			link: { to: '/', label: 'Explore the idea' }
		},
		{
			title:
				'Lorem ipsum dolor sit amet consectetur. Commodo varius morbi platea metus. Quam vestibulum phasellus elit vitae.',
			link: { to: '/', label: 'Explore the idea' }
		},
		{
			title: 'Lorem ipsum dolor sit amet consectetur.',
			link: { to: '/', label: 'Explore the idea' }
		}
	];
</script>

<CardBigText
	bigTextBlocks={{
		block1: { lines: ['anything', 'goes.'] }
	}}
/>
<CardBigText
	subtitle="‘anything goes’ is an additional part of the magazine which operates as a market of ideas, meaning that this is the place there you can submit and sell your creative thoughts. all rights reserved."
	variant="black"
/>
<!-- Temporary, update layout later -->
<CardBigText
	bigTextBlocks={{
		block1: { lines: ['what we', 'have now?'] }
	}}
	variant="black"
/>

<ArticlesSection data={data.concat(data).concat(data)} />
