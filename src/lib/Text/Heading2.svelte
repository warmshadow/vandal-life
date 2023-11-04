<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';

	$: style = `--text-color: ${colors[color]};`;
</script>

<h2 {style}><slot /></h2>

<style>
	h2 {
		font-size: 72px;
		font-weight: 700;
		line-height: 80px;

		color: var(--text-color);
	}
</style>
