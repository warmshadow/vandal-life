<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { browser } from '$app/environment';

	import Button from '$lib/Button.svelte';
	import VandalIcon from '$lib/icons/Vandal.svelte';

	import MobileNav from './MobileNav.svelte';

	export let links: ComponentProps<Button>[];
	export let categoryName: string = 'vandal life';

	let innerWidth: number;
	$: moveEyes = innerWidth >= 700;

	const enableEyeMovement = (e: MouseEvent) => {
		if (browser) {
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			const anchor = document.querySelector("[id$='eye']")?.getBoundingClientRect();

			if (anchor) {
				const x = Math.min(Math.max(mouseX - anchor.x, -10), 2);
				const y = Math.min(Math.max(mouseY - anchor.y - 5, -11), 5); // bit of minus from vertical position as initially eyes are below center

				const eyes = Array.from(
					document.querySelectorAll("[id$='eye']") as NodeListOf<HTMLElement>
				);
				eyes.forEach((eye) => {
					eye.style.transform = `translate(${x}px, ${y}px)`;
				});
			}
		}
	};

	$: if (browser) {
		if (moveEyes) {
			document.addEventListener('mousemove', enableEyeMovement);
		} else {
			document.removeEventListener('mousemove', enableEyeMovement);
		}
	}
</script>

<svelte:window bind:innerWidth />

<nav class="container">
	<div class="icon-wrapper">
		<VandalIcon />
	</div>
	<div class="mobile-nav-wrapper">
		<MobileNav {categoryName} {links} />
	</div>
	<div class="desktop-nav-wrapper">
		{#each links as { label, link, isActive }}
			<Button {label} {link} {isActive} />
		{/each}
	</div>
</nav>

<style>
	.container {
		position: relative;

		border: none;
		padding: 12px 0 24px 0;

		display: flex;
		justify-content: flex-end;
	}

	.icon-wrapper {
		position: absolute;
		bottom: -7px;
		left: 15px;

		width: 71px;
		height: 78px;

		z-index: 10; /* above scrolling text */
	}

	.icon-wrapper :global(#left-eye),
	.icon-wrapper :global(#right-eye) {
		transition: all 0.2s;
	}

	.mobile-nav-wrapper {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.desktop-nav-wrapper {
		display: none;
	}

	@media (min-width: 1461px) {
		.mobile-nav-wrapper {
			display: none;
		}
		.desktop-nav-wrapper {
			display: flex;
			align-items: center;
			gap: 16px;
		}
	}

	@media (min-width: 1180px) {
		.container {
			position: sticky;
			top: 12px;
			z-index: 100;

			border: 1px solid var(--black);
			border-radius: 100px;
			padding: 32px 32px 32px 40px;

			margin: 0 -1px; /* so MobileNavigationCard width is aligned with content in a page */

			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
		}

		.icon-wrapper {
			bottom: -8px;
			left: 40px;

			width: 87px;
			height: 96px;
		}
	}

	@media (min-width: 1180px) {
		.container {
			margin-bottom: 32px;
		}
	}

	@media (min-width: 1460px) {
		.container {
			margin-bottom: 40px;
		}
	}
</style>
