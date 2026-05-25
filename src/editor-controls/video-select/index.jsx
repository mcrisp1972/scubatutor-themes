import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, useBaseControlProps, Button, Spinner, Flex } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

function formatBytes( bytes, decimals = 2 ) {
	if ( bytes === 0 ) {
		return '0 Bytes';
	}

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];

	const i = Math.floor( Math.log( bytes ) / Math.log( k ) );

	return parseFloat( ( bytes / Math.pow( k, i ) ).toFixed( dm ) ) + ' ' + sizes[ i ];
}

function VideoSelect( { label, value, onChange } ) {
	const videoId = typeof value === 'object' ? value.id : value;

	const videoObj = useSelect(
		( select ) => {
			// this check is needed for repeater
			return videoId
				? select( 'core' ).getEntityRecord( 'postType', 'attachment', videoId )
				: undefined;
		},
		[ videoId ]
	);

	const { baseControlProps } = useBaseControlProps( {
		label,
	} );

	const emptyObject = {
		id: 0,
		url: '',
	};

	return (
		<BaseControl { ...baseControlProps }>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onChange }
					value={ videoId }
					allowedTypes={ [ 'video' ] }
					render={ ( { open } ) => {
						return (
							<div className="capitola-video-select">
								{ ( () => {
									if ( ! videoObj?.source_url && !! videoId ) {
										return (
											<div>
												<Spinner />
											</div>
										);
									} else if ( ! videoId ) {
										return (
											<Button
												className="capitola-video-select__toggle"
												onClick={ open }
											>
												Choose a video
											</Button>
										);
									}
									return (
										<div className="capitola-video-select__preview">
											<div>
												<strong>Title: </strong>
												{ videoObj?.title?.raw }
											</div>
											<div>
												<strong>Size: </strong>
												{ formatBytes( videoObj?.media_details.filesize ) }
											</div>
											<div>
												<strong>Length: </strong>
												{ videoObj?.media_details.length_formatted }
											</div>
											<div>
												<strong>URL: </strong>
												{ videoObj?.source_url }
											</div>
										</div>
									);
								} )() }
								{ videoObj?.source_url && videoId && (
									<Flex
										className="components-h-stack capitola-video-select__actions"
										gap="8px"
									>
										<Button
											variant="primary"
											className="components-button capitola-video-select__action is-next-40px-default-size"
											onClick={ open }
										>
											Replace
										</Button>
										<Button
											variant="secondary"
											className="components-button capitola-video-select__action is-next-40px-default-size"
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

export default VideoSelect;
