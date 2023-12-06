<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Button from '$lib/Button.svelte';
	import VandalIcon from '$lib/icons/Vandal.svelte';

	import MobileNav from './MobileNav.svelte';

	export let links: ComponentProps<Button>[];
	export let categoryName: string = 'vandal life';

	let innerWidth: number;
	$: showMobileNav = innerWidth <= 1460;
	$: isDesktop = innerWidth >= 700;

	const enableEyeMovement = (e: MouseEvent) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		const anchor = document.querySelector("[id$='eye']")?.getBoundingClientRect();

		if (anchor) {
			const x = Math.min(Math.max(mouseX - anchor.x, -10), 2);
			const y = Math.min(Math.max(mouseY - anchor.y - 5, -11), 5); // bit of minus from vertical position as initially eyes are below center

			const eyes = Array.from(document.querySelectorAll("[id$='eye']") as NodeListOf<HTMLElement>);
			eyes.forEach((eye) => {
				eye.style.transform = `translate(${x}px, ${y}px)`;
			});
		}
	};

	$: if (isDesktop) {
		document.addEventListener('mousemove', enableEyeMovement);
	} else {
		document.removeEventListener('mousemove', enableEyeMovement);
	}
</script>

<svelte:window bind:innerWidth />

<nav class:desktop={isDesktop} class="container">
	<div class:desktop={isDesktop} class="icon-wrapper">
		<VandalIcon />
	</div>
	{#if showMobileNav}
		<MobileNav {categoryName} {links} />
	{:else}
		{#each links as { label, link }}
			<Button {label} {link} />
		{/each}
	{/if}
</nav>

<style>
	.container {
		position: relative;
		width: 100%;

		border: none;
		padding: 24px 0 24px 0;

		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 16px;
	}

	.container.desktop {
		border: 1px solid var(--black);
		border-radius: 100px;
		padding: 32px 32px 32px 40px;
	}

	.icon-wrapper {
		position: absolute;
		bottom: -7px;
		left: 15px;

		width: 71px;
		height: 78px;

		z-index: 10; /* above scrolling text */
	}

	.icon-wrapper.desktop {
		bottom: -8px;
		left: 40px;

		width: 87px;
		height: 96px;
	}

	.icon-wrapper :global(#left-eye),
	.icon-wrapper :global(#right-eye) {
		transition: all 0.2s;
	}
</style>
