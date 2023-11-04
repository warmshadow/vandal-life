import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '$lib/Button.svelte';

const meta = {
	title: 'Components/Button',
	component: Button
} satisfies Meta<Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Click me'
	}
};

export const Link: Story = {
	args: {
		title: "I'm a link",
		link: '/'
	}
};
