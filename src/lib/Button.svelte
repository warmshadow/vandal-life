<script lang="ts">
	export let label: string;
	export let link: string | undefined = undefined;
</script>

{#if !!link}
	<a href={link} class="button body">{label}</a>
{:else}
	<button on:click class="button body">{label}</button>
{/if}

<style>
	.button {
		display: inline-flex;
		border-radius: 100px;
		padding: 10px 16px;
		background-color: var(--white);
		color: var(--black);
		border: none;
		cursor: pointer;
		transition: all 0.25s ease-in-out;
		border: 1px solid var(--black);
	}

	.button:hover {
		background-color: var(--black);
	}

	.button:hover {
		color: var(--white);
	}
</style>
