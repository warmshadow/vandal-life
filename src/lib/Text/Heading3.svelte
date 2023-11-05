<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';

	$: style = `--text-color: ${colors[color]};`;
</script>

<h3 {style} class="heading3"><slot /></h3>
