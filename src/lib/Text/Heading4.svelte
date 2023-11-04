<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';

	$: style = `--text-color: ${colors[color]};`;
</script>

<h4 {style}><slot /></h4>

<style>
	h4 {
		font-size: 40px;
		font-weight: 700;
		line-height: 48px;
		letter-spacing: -1.71px;

		color: var(--text-color);
	}
</style>
