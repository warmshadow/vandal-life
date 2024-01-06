<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';

	import placeholder from '$lib/placeholder.png';

	const data = [
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
				'Lorem ipsum dolor sit amet consectetur. Commodo varius morbi platea metus. Quam vestibulum phasellus elit vitae."',
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
	];
</script>

<CardBigText content={[{ component: 'bigText', leftText: 'new\nnews\non\nculture.' }]} />
<ArticlesSection data={data.concat(data).concat(data).concat(data).concat(data)} />
