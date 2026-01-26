import { MediaPlaceholder } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';

import { PlaceholderImage, ImageSelectButton } from '../../editor-controls';

export function Image( { imageObject, imageRatioClass = '', radiusClass = '', featuredImage, props } ) {
	// if we have an image URL to display (either internal or external)
	if ( imageObject?.source_url ) {
		return (
			<>
				<img
					className={ `${ imageRatioClass } ${ radiusClass }` }
					style={ { '--cwps-objectPosition': props.attributes.imageCropPosition } }
					src={ imageObject.source_url }
					alt=""
				/>
				{ props.isSelected && ! props.attributes.externalImage && (
					<ImageSelectButton
						onSelect={ ( value ) => {
							props.setAttributes( { sideImage: { id: value.id, source_url: value.url } } );
						} }
						value={ props.attributes.sideImage.id }
						flexWrap={ true }
					/>
				) }
			</>
		);
	} else if (
		! props.attributes.externalImage &&
		! props.attributes.sideImage.id &&
		! props.attributes.isHeroVariation
	) {
		return (
			<MediaPlaceholder
				className={ `${ imageRatioClass } ${ radiusClass }` }
				onSelect={ ( value ) => {
					props.setAttributes( { sideImage: { id: value.id, source_url: value.url } } );
				} }
				value={ props.attributes.sideImage.id }
				allowedTypes={ [ 'image' ] }
				multiple={ false }
			/>
		);
	} else if (
		! props.attributes.externalImage &&
		( props.attributes.sideImage.id || ( props.attributes.isHeroVariation && featuredImage ) )
	) {
		return (
			<Spinner
				style={ { width: '33%', height: '33%', marginLeft: 'auto', marginRight: 'auto', display: 'block' } }
			/>
		);
	}
	return <PlaceholderImage className={ `${ imageRatioClass } ${ radiusClass }` } />;
}
