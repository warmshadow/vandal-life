<script lang="ts">
	export let type: 'default' | 'underlined' | 'medium' | 'bold' = 'default';
	const weights = {
		default: 400,
		medium: 500,
		bold: 700
	};
	const textDecoration = type === 'underlined' ? 'underline' : 'none';

	const fontWeight: (typeof weights)[keyof typeof weights] =
		weights[type === 'underlined' ? 'default' : type];
</script>

<h6 style="--font-weight: {fontWeight}; --text-decoration: {textDecoration}"><slot /></h6>

<style>
	h6 {
		font-size: 24px;
		font-weight: var(--font-weight);
		line-height: 32px;
		text-decoration: var(--text-decoration);

		color: var(--black);
	}
</style>
