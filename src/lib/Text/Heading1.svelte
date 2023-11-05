<script lang="ts">
	import { colors } from '$lib/utils/colors';

	export let color: keyof typeof colors = 'black';

	const style = `--text-color: ${colors[color]};`;
</script>

<h1 {style} class="heading1"><slot /></h1>
