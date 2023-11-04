<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';
	export let type: 'default' | 'underlined' | 'medium' | 'bold' = 'default';
	const weights = {
		default: 400,
		medium: 500,
		bold: 700
	};
	const textDecoration = type === 'underlined' ? 'underline' : 'none';

	const fontWeight: (typeof weights)[keyof typeof weights] =
		weights[type === 'underlined' ? 'default' : type];

	$: style = `--text-color: ${colors[color]}; --font-weight: ${fontWeight}; --text-decoration: ${textDecoration};`;
</script>

<h6 {style}><slot /></h6>

<style>
	h6 {
		font-size: 24px;
		font-weight: var(--font-weight);
		line-height: 32px;
		text-decoration: var(--text-decoration);

		color: var(--text-color);
	}
</style>
