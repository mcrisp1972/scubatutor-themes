import { PlaceholderVideo } from '@capitola/editor-controls';

export function Video( { radius, videoObject, props } ) {
	const { attributes } = props;
	const { videoSource, videoID, videoUrl } = attributes;
	if ( videoSource === 'local' && videoObject.source_url ) {
		return (
			<video
				controls
				src={ videoObject.source_url }
				style={ { borderRadius: `var(--wp--preset--border-radius--${ radius })` } }
			/>
		);
	} else if ( videoSource === 'remote' && videoUrl ) {
		return (
			<video
				controls
				key={ videoUrl }
				style={ { borderRadius: `var(--wp--preset--border-radius--${ radius })` } }
			>
				<source src={ videoUrl } type="video/mp4"></source>
			</video>
		);
	} else if ( videoSource !== 'local' && videoSource !== 'remote' && videoID ) {
		if ( videoSource === 'youtube' ) {
			return (
				<div
					className="wp-block-capitola-side-image__iframe-wrap"
					style={ {
						aspectRatio: '560/315',
						borderRadius: `var(--wp--preset--border-radius--${ radius })`,
					} }
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
				className="wp-block-capitola-side-image__iframe-wrap"
				style={ {
					aspectRatio: '640/360',
					borderRadius: `var(--wp--preset--border-radius--${ radius })`,
				} }
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
	return (
		<PlaceholderVideo
			className="--16-9"
			style={ {
				borderRadius: `var(--wp--preset--border-radius--${ radius })`,
			} }
		/>
	);
}
