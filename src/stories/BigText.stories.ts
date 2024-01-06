import type { Meta, StoryFn } from '@storybook/svelte';
import type { ComponentProps } from 'svelte';
import BigText from '$lib/BigText.svelte';

const meta = {
	title: 'Components/BigText',
	component: BigText
} satisfies Meta<BigText>;

export default meta;

const Template: StoryFn<ComponentProps<BigText>> = ({ ...args }) => ({
	Component: BigText,
	props: args
});

export const Default = Template.bind({});
Default.args = {
	text: 'Can we make it\na new normal?'
};
