<script lang="ts">
	// @ts-nocheck

	import Heading1 from '$lib/Text/Heading1.svelte';
	import Heading2 from '$lib/Text/Heading2.svelte';
	import Heading3 from '$lib/Text/Heading3.svelte';
	import Heading4 from '$lib/Text/Heading4.svelte';
	import Heading5 from '$lib/Text/Heading5.svelte';
	import Heading6 from '$lib/Text/Heading6.svelte';
	import Body from '$lib/Text/Body.svelte';

	const compObj = { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Body };
	const types = { medium: 'medium', bold: 'bold', underlined: 'underlined' };
</script>

{#each Object.entries(compObj) as [name, component]}
	<svelte:component this={component}>{name}</svelte:component>
	{#if name === 'Heading5'}
		<svelte:component this={component} type={types.medium}
			>{`${name} ${types.medium}`}</svelte:component
		>
		<svelte:component this={component} type={types.bold}>{`${name} ${types.bold}`}</svelte:component
		>
	{/if}
	{#if name === 'Heading6'}
		<svelte:component this={component} type={types.underlined}
			>{`${name} ${types.underlined}`}</svelte:component
		>
		<svelte:component this={component} type={types.medium}
			>{`${name} ${types.medium}`}</svelte:component
		>
		<svelte:component this={component} type={types.bold}>{`${name} ${types.bold}`}</svelte:component
		>
	{/if}
	{#if name === 'Body'}
		<svelte:component this={component} type={types.underlined}
			>{`${name} ${types.underlined}`}</svelte:component
		>
		<svelte:component this={component} type={types.medium}
			>{`${name} ${types.medium}`}</svelte:component
		>
	{/if}
{/each}
