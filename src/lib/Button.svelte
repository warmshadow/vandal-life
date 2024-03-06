<script lang="ts">
	export let label: string;
	export let link: string | undefined = undefined;
	export let isActive: boolean = false;
</script>

{#if !!link}
	<a href={link} class="button body" class:active={isActive} on:click>{label}</a>
{:else}
	<button on:click class="button body">{label}</button>
{/if}

<style>
	.button {
		display: inline-flex;
		border-radius: 100px;
		padding: 7px 16px;
		background-color: var(--white);
		color: var(--black);
		border: none;
		cursor: pointer;
		transition: all 0.25s ease-in-out;
		border: 1px solid var(--black);
	}

	.button:hover,
	.button.active {
		background-color: var(--black);
		color: var(--white);
	}
</style>
