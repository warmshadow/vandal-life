<script>
	const colors = ['primary', 'black', 'grey', 'light-grey', 'white'];
</script>

<div
	style="display: flex; flex-direction: column; row-gap: 8px; background-color: lightblue; padding: 24px;"
>
	{#each colors as color}
		<div style="display: flex; gap: 16px; align-items: center">
			<div style="width: 100px; height: 100px; background-color: var(--{color});" />
			<p>{color}</p>
		</div>
	{/each}
</div>
