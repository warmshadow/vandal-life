import type { Meta, StoryFn } from '@storybook/svelte';
import { action } from '@storybook/addon-actions';
import type { ComponentProps } from 'svelte';
import Button from '$lib/Button.svelte';

const meta = {
	title: 'Components/Button',
	component: Button
} satisfies Meta<Button>;

export default meta;

const Template: StoryFn<ComponentProps<Button>> = ({ ...args }) => ({
	Component: Button,
	props: args,
	on: {
		...actionsData
	}
});

const actionsData = {
	click: action('Clicked')
};

export const Default = Template.bind({});
Default.args = {
	title: 'Button with on:click'
};

export const ButtonLink = Template.bind({});
ButtonLink.args = {
	title: "I'm a link styled like button",
	link: '/'
};
