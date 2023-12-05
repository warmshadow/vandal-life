<script>
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import HamburgerBlack from '$lib/icons/HamburgerBlack.svelte';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import ArrowTopRound from '$lib/icons/ArrowTopRound.svelte';
	import ShareIcon from '$lib/icons/ShareIcon.svelte';
	import VandalIcon from '$lib/icons/Vandal.svelte';

	const icons = [
		Hamburger,
		HamburgerBlack,
		ArrowLeft,
		ArrowRight,
		ArrowTopRound,
		ShareIcon,
		VandalIcon
	];
</script>

{#each icons as icon}
	<div style="width: 40px; height: 40px; margin: 8px;">
		<svelte:component this={icon} />
	</div>
{/each}
