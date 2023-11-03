import type { Meta, StoryObj } from '@storybook/svelte';
import Card from '$lib/Card.svelte';

import placeholder from './assets/placeholder.png';

const meta = {
	title: 'Components/Card',
	component: Card
} satisfies Meta<Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		src: placeholder,
		title: 'Lorem ipsum dolor sit amet consectetur. Commodo varius morbi platea metus.',
		description:
			'Besamma treskade turistkorridor såsom mora atovis. Mobilzombie heteronussa och surer dengar dekrongar...',
		link: '/'
	}
};
