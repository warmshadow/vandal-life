import type { Meta, StoryFn } from '@storybook/svelte';
import type { ComponentProps } from 'svelte';
import FancyText from '$lib/FancyText.svelte';

const meta = {
	title: 'Components/FancyText',
	component: FancyText
} satisfies Meta<FancyText>;

export default meta;

const Template: StoryFn<ComponentProps<FancyText>> = ({ ...args }) => ({
	Component: FancyText,
	props: args
});

export const Default = Template.bind({});
Default.args = {
	lines: ['Can we make it', 'a new normal?']
};
