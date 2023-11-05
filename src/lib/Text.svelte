<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	const textClasses = {
		h1: 'heading1',
		h2: 'heading2',
		h3: 'heading3',
		h4: 'heading4',
		h5: 'heading5',
		h6: 'heading6',
		p: 'body'
	};

	export let color: keyof typeof colors = 'black';
	export let type: 'underlined' | 'medium' | 'bold' | 'default' = 'default';

	$: style = `--text-color: ${colors[color]};`;
</script>

<svelte:element this={tag} class="{textClasses[tag]} {type === 'default' ? '' : type}" {style}
	><slot /></svelte:element
>
