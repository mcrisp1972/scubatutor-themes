import { PlaceholderVideo } from '../../editor-controls';

export function Video( { radiusClass, videoObject, props } ) {
	const { attributes } = props;
	const { videoSource, videoID, videoUrl } = attributes;
	if ( videoSource === 'local' && videoObject.source_url ) {
		return <video controls className={ `${ radiusClass }` } src={ videoObject.source_url } />;
	} else if ( videoSource === 'remote' && videoUrl ) {
		return (
			<video controls className={ `${ radiusClass }` } key={ videoUrl }>
				<source src={ videoUrl } type="video/mp4"></source>
			</video>
		);
	} else if ( videoSource !== 'local' && videoSource !== 'remote' && videoID ) {
		if ( videoSource === 'youtube' ) {
			return (
				<div
					className={ `wp-block-cwps-side-image__iframe-wrap ${ radiusClass }` }
					style={ { aspectRatio: '560/315' } }
				>
					<iframe
						width="560"
						height="315"
						src={ 'https://www.youtube.com/embed/' + videoID }
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						loading="lazy"
					/>
				</div>
			);
		}

		return (
			<div
				className={ `wp-block-cwps-side-image__iframe-wrap ${ radiusClass }` }
				style={ { aspectRatio: '640/360' } }
			>
				<iframe
					title="sideimagePlayer"
					src={ `https://player.vimeo.com/video/${ videoID } ` }
					width="640"
					height="360"
					allow="fullscreen"
					allowFullScreen
					loading="lazy"
				/>
			</div>
		);
	}
	return <PlaceholderVideo className={ `${ radiusClass } --16-9` } />;
}
