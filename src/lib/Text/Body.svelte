<script lang="ts">
	export let type: 'default' | 'underlined' | 'medium' = 'default';
	const weights = {
		default: 400,
		medium: 500
	};
	const textDecoration = type === 'underlined' ? 'underline' : 'none';

	const fontWeight: (typeof weights)[keyof typeof weights] =
		weights[type === 'underlined' ? 'default' : type];

	export let link: boolean = false;
</script>

<svelte:element
	this={link ? 'span' : 'p'}
	style="--font-weight: {fontWeight}; --text-decoration: {textDecoration}"><slot /></svelte:element
>

<style>
	p {
		font-size: 16px;
		font-weight: var(--font-weight);
		line-height: 24px;
		text-decoration: var(--text-decoration);
	}
</style>
