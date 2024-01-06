import type { Meta, StoryObj } from '@storybook/svelte';
import CardBigText from '$lib/CardBigText.svelte';

const meta = {
	title: 'Components/CardBigText',
	component: CardBigText
} satisfies Meta<CardBigText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneBlock: Story = {
	args: {
		content: [{ component: 'bigText', leftText: 'Can we make it\na new normal?' }]
	}
};

export const TwoBlocks: Story = {
	args: {
		content: [{ ...OneBlock.args.content[0], rightText: 'Love\nfriends.' }]
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
		content: [
			{
				component: 'smallText',
				text: 'A journal of ideas. A collaborative space. Insights on social and cultural life. Sharing a point of view on life today.'
			},
			OneBlock.args.content[0],
			{
				component: 'smallText',
				text: 'It isn’t the powerful, top-down, institutional culture that’s spoon-fed to us that excited me. I learnt that, at least as an artist, the most meaningful, rich culture is the one that you create yourself, among friends, and even at home. Fritz Haeg'
			}
		]
	}
};

export const SecondaryBackground: Story = {
	args: {
		...WithTitleSubtitle.args,
		variant: 'secondary'
	}
};
