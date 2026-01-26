export function layoutConditionals( attributes ) {
	const showExcerpt = attributes.listLayout === 'row' ? 1 : attributes.showExcerpt;
	const showByline = attributes.postType === 'post' && attributes.showByline;
	const titleLocation = attributes.listLayout === 'row' ? 'body' : attributes.titleLocation;
	const ctaLocation = ( showExcerpt || titleLocation === 'body' ) && ! showByline ? 'body' : 'image';

	return {
		showExcerpt,
		showByline,
		titleLocation,
		ctaLocation,
		hasBottom: showExcerpt || showByline || titleLocation === 'body',
	};
}
