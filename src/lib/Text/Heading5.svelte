<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';
	export let type: 'default' | 'medium' | 'bold' = 'default';
	const weights = {
		default: 400,
		medium: 500,
		bold: 700
	};
	const fontWeight: (typeof weights)[keyof typeof weights] = weights[type];

	$: style = `--text-color: ${colors[color]}; --font-weight: ${fontWeight};`;
</script>

<h5 {style}><slot /></h5>

<style>
	h5 {
		font-size: 32px;
		font-weight: var(--font-weight);
		line-height: 40px;

		color: var(--text-color);
	}
</style>
