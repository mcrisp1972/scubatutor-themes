import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	BaseControl,
	useBaseControlProps,
	Button,
	ResponsiveWrapper,
	Spinner,
	Flex,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export function ImageSelect( { label, value, onChange } ) {
	const imageId = typeof value === 'object' ? value.id : value;

	const imageUrl = useSelect(
		( select ) => {
			if ( typeof value === 'object' && value?.source_url ) {
				return value.source_url;
			}
			// this check is needed for repeater
			return select( 'core' ).getEntityRecord( 'postType', 'attachment', imageId )
				?.source_url;
		},
		[ value, imageId ]
	);

	const { baseControlProps } = useBaseControlProps( {
		label,
	} );

	const emptyObject = {
		alt: '',
		caption: '',
		id: 0,
		mime: '',
		name: '',
		title: '',
		type: '',
		url: '',
	};

	return (
		<BaseControl { ...baseControlProps }>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onChange }
					value={ imageId }
					allowedTypes={ [ 'image' ] }
					render={ ( { open } ) => {
						return (
							<div className="capitola-image-select">
								{ ! imageUrl && !! imageId && (
									<div>
										<Spinner />
									</div>
								) }
								{ ( !! imageUrl || ! imageId ) && (
									<Button
										className={
											imageId === 0
												? 'capitola-image-select__toggle'
												: 'capitola-image-select__preview'
										}
										onClick={ open }
									>
										{ imageId === 0 && 'Choose an image' }
										{ imageUrl && (
											<ResponsiveWrapper
												naturalWidth={ 16 }
												naturalHeight={ 9 }
											>
												<img src={ imageUrl } alt="" />
											</ResponsiveWrapper>
										) }
									</Button>
								) }
								{ imageUrl && imageId && (
									<Flex
										className="components-h-stack capitola-image-select__actions"
										gap="8px"
									>
										<Button
											className="components-button capitola-image-select__action is-next-40px-default-size"
											onClick={ open }
										>
											Replace
										</Button>
										<Button
											className="components-button capitola-image-select__action is-next-40px-default-size"
											onClick={ () => {
												onChange( emptyObject );
											} }
										>
											Remove
										</Button>
									</Flex>
								) }
							</div>
						);
					} }
				/>
			</MediaUploadCheck>
		</BaseControl>
	);
}
