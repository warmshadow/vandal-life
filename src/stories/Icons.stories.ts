import type { Meta, StoryFn } from '@storybook/svelte';
import type { ComponentProps } from 'svelte';
import Icons from './Icons.svelte';

const meta = {
	title: 'Components/Icons',
	component: Icons
} satisfies Meta<Icons>;

export default meta;

const Template: StoryFn<ComponentProps<Icons>> = ({ ...args }) => ({
	Component: Icons,
	props: args
});

export const AllIcons = Template.bind({});
