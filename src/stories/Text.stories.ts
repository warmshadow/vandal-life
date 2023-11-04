import type { Meta, StoryObj } from '@storybook/svelte';
import Text from './Text.svelte';

const meta = {
	title: 'Components/Text',
	component: Text
} satisfies Meta<Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};
