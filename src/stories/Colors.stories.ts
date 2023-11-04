import type { Meta, StoryObj } from '@storybook/svelte';
import Colors from './Colors.svelte';

const meta = {
	title: 'Components/Colors',
	component: Colors
} satisfies Meta<Colors>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
