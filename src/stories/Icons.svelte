<script>
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import ArrowTop from '$lib/icons/ArrowTop.svelte';
	import ShareIcon from '$lib/icons/ShareIcon.svelte';
	import VandalIcon from '$lib/icons/Vandal.svelte';

	const icons = [Hamburger, ArrowLeft, ArrowRight, ArrowTop, ShareIcon, VandalIcon];
</script>

{#each icons as icon}
	<div style="width: 40px; height: 40px; margin: 8px;">
		<svelte:component this={icon} />
	</div>
{/each}
