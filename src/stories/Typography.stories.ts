import type { Meta, StoryFn } from '@storybook/svelte';
import type { ComponentProps } from 'svelte';
import Typography from './Typography.svelte';

const meta = {
	title: 'Components/Typography',
	component: Typography
} satisfies Meta<Typography>;

export default meta;

const Template: StoryFn<ComponentProps<Typography>> = ({ ...args }) => ({
	Component: Typography,
	props: args
});

export const Default = Template.bind({});
Default.args = {};
