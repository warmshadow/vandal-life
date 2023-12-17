<script lang="ts">
	import Text from '$lib/Text.svelte';

	export let title: string;
	export let description: string | undefined = undefined;
</script>

<div class="modal-content-wrapper">
	<Text tag="h5" type="bold">
		{title}
	</Text>
	{#if !!description}
		<Text tag="p">
			{description}
		</Text>
	{/if}
</div>

<style>
	.modal-content-wrapper {
		display: flex;
		flex-direction: column;
		gap: 24px;

		margin-bottom: 24px;
	}

	@media (min-width: 1180px) {
		.modal-content-wrapper {
			gap: 40px;
		}
	}
</style>
