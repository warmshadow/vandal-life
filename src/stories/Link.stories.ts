import type { Meta, StoryFn } from '@storybook/svelte';
import type { ComponentProps } from 'svelte';
import Link from '$lib/Link.svelte';

const meta = {
	title: 'Components/Link',
	component: Link
} satisfies Meta<Link>;

export default meta;

const Template: StoryFn<ComponentProps<Link>> = ({ ...args }) => ({
	Component: Link,
	props: args
});

export const Default = Template.bind({});
Default.args = {
	label: 'VIEW ALL',
	to: '/'
};

export const WithArrow = Template.bind({});
WithArrow.args = {
	label: 'VIEW ALL',
	to: '/',
	withArrow: true
};

export const AnimatedLine = Template.bind({});
AnimatedLine.args = {
	label: 'Read more',
	variant: 'animated-line',
	to: '/'
};
