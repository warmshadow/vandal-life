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

<h5 {style} class="heading5"><slot /></h5>
