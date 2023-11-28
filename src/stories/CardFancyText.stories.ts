import type { Meta, StoryObj } from '@storybook/svelte';
import CardFancyText from '$lib/CardFancyText.svelte';

const meta = {
	title: 'Components/CardFancyText',
	component: CardFancyText
} satisfies Meta<CardFancyText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneBlock: Story = {
	args: {
		bigTextBlocks: { block1: { lines: ['Can we make it', 'a new normal?'] } }
	}
};

export const TwoBlocks: Story = {
	args: {
		bigTextBlocks: { ...OneBlock.args.bigTextBlocks, block2: { lines: ['Love', 'friends.'] } }
	}
};

export const Centered: Story = {
	args: {
		...TwoBlocks.args,
		isCentered: true
	}
};

export const WithTitleSubtitle: Story = {
	args: {
		...OneBlock.args,
		title:
			'A journal of ideas. A collaborative space. Insights on social and cultural life. Sharing a point of view on life today.',
		subtitle:
			'It isn’t the powerful, top-down, institutional culture that’s spoon-fed to us that excited me. I learnt that, at least as an artist, the most meaningful, rich culture is the one that you create yourself, among friends, and even at home. Fritz Haeg'
	}
};

export const BlackBackground: Story = {
	args: {
		...WithTitleSubtitle.args,
		variant: 'black'
	}
};
