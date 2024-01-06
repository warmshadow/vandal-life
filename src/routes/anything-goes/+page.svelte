<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import ModalContent from '$lib/Modal/ModalContent.svelte';

	let showModal = false;

	const data = [
		{
			title: 'Lorem ipsum dolor sit amet consectetur.',
			link: { label: 'Explore the idea', onClick: () => (showModal = true) }
		},
		{
			title:
				'Lorem ipsum dolor sit amet consectetur. Commodo varius morbi platea metus. Quam vestibulum phasellus elit vitae.',
			link: { label: 'Explore the idea', onClick: () => (showModal = true) }
		},
		{
			title: 'Lorem ipsum dolor sit amet consectetur.',
			link: { label: 'Explore the idea', onClick: () => (showModal = true) }
		}
	];
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

<ArticlesSection data={data.concat(data).concat(data)} />

<Modal bind:showModal>
	<ModalContent
		title="Lorem ipsum dolor sit amet consectetur. Commodo varius morbi platea metus. Quam vestibulumphasellus elit vitae."
		description="Lorem ipsum dolor sit amet consectetur. Purus mauris diam tellus aliquet. Enim quis nisl convallis purus. Feugiat nec condimentum dignissim urna sagittis dignissim pulvinar morbi dis. Tortor at viverra nibh eu gravida mi. Ut mauris feugiat viverra cursus aliquam vestibulum venenatis. Volutpat magna vitae vitae enim. Scelerisque leo vulputate enim cursus donec et praesent nibh. Pellentesque odio et consectetur non et commodo vitae tortor sed. Augue morbinibh commodo ultrices turpis mauris etiam nibh amet."
	/>
</Modal>
