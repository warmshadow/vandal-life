<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';

	$: style = `--text-color: ${colors[color]};`;
</script>

<h1 {style}><slot /></h1>

<style>
	h1 {
		font-size: 72px;
		font-weight: 800;
		line-height: 80px;

		color: var(--text-color);
	}
</style>
