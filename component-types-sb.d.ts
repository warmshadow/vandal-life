import { StoryblokStory } from 'storyblok-generate-ts';

export interface AdStoryblok {
	title: string;
	content: string;
	_uid: string;
	component: 'ad';
	[k: string]: any;
}

export interface BigTextStoryblok {
	leftText: string;
	rightText?: string;
	_uid: string;
	component: 'bigText';
	[k: string]: any;
}

export interface BodyStoryblok {
	text?: string;
	_uid: string;
	component: 'body';
	[k: string]: any;
}

export interface CategoryNameStoryblok {
	slug: string;
	title: string;
	_uid: string;
	component: 'categoryName';
	[k: string]: any;
}

export interface GalleryStoryblok {
	columns?: GalleryColumnStoryblok[];
	_uid: string;
	component: 'gallery';
	[k: string]: any;
}

export interface GalleryColumnStoryblok {
	images?: ImageStoryblok[];
	_uid: string;
	component: 'galleryColumn';
	[k: string]: any;
}

export interface HomePageStoryblok {
	listOfBlocks: (CategoryNameStoryblok | MessageCardStoryblok)[];
	_uid: string;
	component: 'homePage';
	[k: string]: any;
}

export interface IdeaStoryblok {
	ads: AdStoryblok[];
	_uid: string;
	component: 'idea';
	[k: string]: any;
}

export interface AssetStoryblok {
	alt?: string;
	copyright?: string;
	id: number;
	filename: string;
	name: string;
	title?: string;
	focus?: string;
	[k: string]: any;
}

export interface ImageStoryblok {
	image?: AssetStoryblok;
	_uid: string;
	component: 'image';
	[k: string]: any;
}

export interface MessageCardStoryblok {
	content: (BigTextStoryblok | SmallTextStoryblok)[];
	variant?: 'primary' | 'secondary';
	_uid: string;
	component: 'messageCard';
	[k: string]: any;
}

export interface PostStoryblok {
	featuredImage?: AssetStoryblok;
	gallery?: GalleryStoryblok[];
	title: string;
	subtitle?: string;
	authors?: string;
	content?: BodyStoryblok[];
	_uid: string;
	component: 'post';
	[k: string]: any;
}

export interface SmallTextStoryblok {
	text?: string;
	_uid: string;
	component: 'smallText';
	[k: string]: any;
}
