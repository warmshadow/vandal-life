import type { AssetStoryblok } from '../../component-types-sb';

export const optimizeImage = (image?: AssetStoryblok, imageSize?: string) => {
	if (!image?.filename) return null;

	let imageSource = image.filename + '/m' + (imageSize ? `/${imageSize}` : '');

	imageSource += `/filters:quality(70)${image.focus ? `:focal(${image.focus})` : ''}`;

	return imageSource;
};
