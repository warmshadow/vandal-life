import type { Meta, StoryFn } from '@storybook/svelte';
import type { ComponentProps } from 'svelte';
import Header from '$lib/Header.svelte';

const meta = {
	title: 'Components/NavHeader',
	component: Header
} satisfies Meta<Header>;

export default meta;

const Template: StoryFn<ComponentProps<Header>> = ({ ...args }) => ({
	Component: Header,
	props: args
});

export const Default = Template.bind({});
Default.args = {
	links: [
		{ label: 'home', link: '/' },
		{ label: 'new news. on culture.', link: '/' },
		{ label: 'style > fashion', link: '/' },
		{ label: `let's talk about food`, link: '/' },
		{ label: 'hip hop. eternal source of energy', link: '/' },
		{ label: 'anything goes', link: '/' }
	]
};
