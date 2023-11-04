<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';

	$: style = `--text-color: ${colors[color]};`;
</script>

<h3 {style}><slot /></h3>

<style>
	h3 {
		font-size: 48px;
		font-weight: 800;
		line-height: 56px;

		color: var(--text-color);
	}
</style>
