<script lang="ts">
	import Text from './Text';

	export let to: string;
	export let label: string = 'Read more';
</script>

<a href={to}><Text.Body link>{label}</Text.Body></a>

<style>
	a {
		display: inline-block;
		position: relative;
		width: fit-content;

		color: var(--black);
	}

	a::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 1px;
		bottom: 0;
		left: 0;
		background-color: var(--black);
		transform: scaleX(1);
		transform-origin: bottom left;
		transition: transform 0.25s ease-out;
	}

	a:hover::after {
		transform: scaleX(0);
		transform-origin: bottom left;
	}
</style>
