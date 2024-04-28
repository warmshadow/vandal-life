export function onRequest({ request }) {
	const { pathname, searchParams, search } = new URL(request.url);
	const searchParam = searchParams.get('_storyblok');
	const referer = request.headers.get('Referer');

	if (searchParam && referer === 'https://app.storyblok.com/') {
		return Response.redirect(`https://vandal-life.pages.dev/sb-preview${search}`, 302);
	}
	return Response.redirect(
		`https://vandal-life.pages.dev${pathname.replace('/previewredirect', '')}`,
		302
	);
}
