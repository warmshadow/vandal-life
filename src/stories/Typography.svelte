<script lang="ts">
	import Text from '$lib/Text.svelte';

	const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;
	const types = { medium: 'medium', bold: 'bold', underlined: 'underlined' } as const;

	const tagNames = {
		h1: 'Heading1',
		h2: 'Heading2',
		h3: 'Heading3',
		h4: 'Heading4',
		h5: 'Heading5',
		h6: 'Heading6',
		p: 'Body'
	};
</script>

{#each tags as tag}
	<svelte:component this={Text} {tag}>{tagNames[tag]}</svelte:component>
	{#if tag === 'h5'}
		<svelte:component this={Text} {tag} type={types.medium}
			>{`${tagNames[tag]} ${types.medium}`}</svelte:component
		>
		<svelte:component this={Text} {tag} type={types.bold}
			>{`${tagNames[tag]} ${types.bold}`}</svelte:component
		>
	{/if}
	{#if tag === 'h6'}
		<svelte:component this={Text} {tag} type={types.underlined}
			>{`${tagNames[tag]} ${types.underlined}`}</svelte:component
		>
		<svelte:component this={Text} {tag} type={types.medium}
			>{`${tagNames[tag]} ${types.medium}`}</svelte:component
		>
		<svelte:component this={Text} {tag} type={types.bold}
			>{`${tagNames[tag]} ${types.bold}`}</svelte:component
		>
	{/if}
	{#if tag === 'p'}
		<svelte:component this={Text} {tag} type={types.underlined}
			>{`${tagNames[tag]} ${types.underlined}`}</svelte:component
		>
		<svelte:component this={Text} {tag} type={types.medium}
			>{`${tagNames[tag]} ${types.medium}`}</svelte:component
		>
	{/if}
{/each}
