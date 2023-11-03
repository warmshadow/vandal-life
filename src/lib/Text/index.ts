import Heading1 from './Heading1.svelte';
import Heading2 from './Heading2.svelte';
import Heading3 from './Heading3.svelte';
import Heading4 from './Heading4.svelte';
import Heading5 from './Heading5.svelte';
import Heading6 from './Heading6.svelte';
import Body from './Body.svelte';

interface TextComponent {
	Heading1: typeof Heading1;
	Heading2: typeof Heading2;
	Heading3: typeof Heading3;
	Heading4: typeof Heading4;
	Heading5: typeof Heading5;
	Heading6: typeof Heading6;
	Body: typeof Body;
}

const Text: TextComponent = { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Body };

export default Text;
