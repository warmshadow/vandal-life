export const shortenString = (inputString: string, characterCount: number) => {
	if (inputString.length <= characterCount) {
		return inputString;
	}

	let shortened = inputString.slice(0, characterCount);

	// Remove the last word if it's cut off
	shortened = shortened.replace(/\s+\S*$/, '');

	return `${shortened}...`;
};
