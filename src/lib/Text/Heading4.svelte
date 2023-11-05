<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';

	$: style = `--text-color: ${colors[color]};`;
</script>

<h4 {style} class="heading4"><slot /></h4>
