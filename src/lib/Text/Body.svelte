<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';
	export let type: 'default' | 'underlined' | 'medium' = 'default';
	export let link: boolean = false;

	const weights = {
		default: 400,
		medium: 500
	};
	const textDecoration = type === 'underlined' ? 'underline' : 'none';

	const fontWeight: (typeof weights)[keyof typeof weights] =
		weights[type === 'underlined' ? 'default' : type];

	$: style = `--text-color: ${colors[color]}; --font-weight: ${fontWeight}; --text-decoration: ${textDecoration};`;
</script>

<svelte:element this={link ? 'span' : 'p'} class="text" {style}><slot /></svelte:element>

<style>
	.text {
		font-size: 16px;
		font-weight: var(--font-weight);
		line-height: 24px;
		text-decoration: var(--text-decoration);

		color: var(--text-color);
	}
</style>
