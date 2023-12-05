<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Button from '$lib/Button.svelte';
	import VandalIcon from '$lib/icons/Vandal.svelte';

	export let links: ComponentProps<Button>[];

	document.addEventListener('mousemove', (e) => {
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
	});
</script>

<nav class="container">
	<div class="icon-wrapper">
		<VandalIcon />
	</div>
	{#each links as { label, link }}
		<Button {label} {link} />
	{/each}
</nav>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 104px;
		border: 1px solid var(--black);
		border-radius: 100px;

		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 16px;

		padding: 0 32px 0 40px;
	}

	.icon-wrapper {
		position: absolute;
		top: 12px;
		left: 40px;
		width: 87px;
		height: 96px;
	}

	.icon-wrapper :global(#left-eye),
	.icon-wrapper :global(#right-eye) {
		transition: all 0.2s;
	}
</style>
