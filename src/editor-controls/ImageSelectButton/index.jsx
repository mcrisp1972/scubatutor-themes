import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

function ImageSelectButton( { value, onSelect, allowedTypes = [ 'image' ], label = false, flexWrap = false } ) {
	const ConditionalWrap = ( { condition, wrap, children } ) => {
		return condition ? wrap( children ) : children;
	};

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ onSelect }
				value={ value }
				multiple={ typeof value === 'object' ? 'add' : false }
				gallery={ typeof value === 'object' ? true : false }
				allowedTypes={ allowedTypes }
				render={ ( { open } ) => {
					return (
						<ConditionalWrap
							condition={ flexWrap }
							wrap={ ( children ) => {
								return <div className="capitola-image-select-button__outer-flex-wrap">{ children }</div>;
							} }
						>
							<Button variant="primary" className="capitola-image-select-button" onClick={ open }>
								{ label
									? label
									: typeof value === 'object'
									? 'Edit Images'
									: value
									? 'Change Image'
									: 'Choose Image' }
							</Button>
						</ConditionalWrap>
					);
				} }
			/>
		</MediaUploadCheck>
	);
}

export default ImageSelectButton;
