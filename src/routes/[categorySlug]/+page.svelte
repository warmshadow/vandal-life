<script lang="ts">
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';
	import placeholder from '$lib/placeholder.png';

	export let data: any;
</script>

<ArticlesSection
	data={data.categoryStories.data.stories.map((story) => ({
		src: placeholder,
		title: story.content.title,
		description: story.content.subtitle,
		link: { to: `/${story.full_slug}` }
	}))}
/>
