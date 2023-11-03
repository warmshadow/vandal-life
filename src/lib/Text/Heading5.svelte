<script lang="ts">
	export let type: 'default' | 'medium' | 'bold' = 'default';
	const weights = {
		default: 400,
		medium: 500,
		bold: 700
	};
	const fontWeight: (typeof weights)[keyof typeof weights] = weights[type];
</script>

<h5 style="--font-weight: {fontWeight}"><slot /></h5>

<style>
	h5 {
		font-size: 32px;
		font-weight: var(--font-weight);
		line-height: 40px;
	}
</style>
