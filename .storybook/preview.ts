import type { Preview } from '@storybook/svelte';

import '@fontsource/inter';

import '../src/styles/styles.css';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
