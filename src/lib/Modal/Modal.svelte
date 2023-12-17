<script lang="ts">
	import Link from '$lib/Link.svelte';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	$: if (dialog) {
		if (showModal) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot />
		<Link label="Close" size="small" variant="animated-line" onClick={() => dialog.close()} />
	</div>
</dialog>

<style>
	dialog {
		max-width: 616px;
		padding: 24px;
		border: 1px solid var(--black);
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.6);
		backdrop-filter: blur(50px);
		-webkit-backdrop-filter: blur(50px);

		margin: auto;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
