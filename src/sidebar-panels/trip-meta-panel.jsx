import { dispatch, select, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { TextControl, ToggleControl, BaseControl, useBaseControlProps, Flex } from '@wordpress/components';
import { TMCEControl, DateTimePicker, DatePicker, TimePicker } from '../editor-controls';
import { format } from '@wordpress/date';

export default function tripMetaPanels() {
	const postType = select( 'core/editor' ).getCurrentPostType();

	if ( postType !== 'trip' ) {
		return null;
	}

	const { postMeta } = useSelect( ( select ) => {
		return {
			postMeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
		};
	} );

	const linkedProduct = useSelect(
		( select ) => {
			return postMeta?.tripProductId
				? select( 'core' ).getEntityRecord( 'postType', 'product', postMeta.tripProductId )
				: undefined;
		},
		[ postMeta ]
	);

	const { baseControlProps } = useBaseControlProps( { label: 'Linked Product', __nextHasNoMarginBottom: true } );

	return (
		<>
			<PluginDocumentSettingPanel name="cwps-trip-schedule" title={ 'Trip Schedule' }>
				<Flex direction="column" gap="16px">
					<ToggleControl
						label="Multi-Day Trip"
						checked={ postMeta.tripMultiday }
						onChange={ ( value ) => {
							const newMNeta = {
								tripMultiday: value,
							};
							if ( ! value ) {
								newMNeta.tripEndDate = postMeta.tripStartDate;
							}
							dispatch( 'core/editor' ).editPost( {
								meta: newMNeta,
							} );
						} }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label="All-Day"
						checked={ postMeta.tripAllday }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									tripAllday: value,
								},
							} );
						} }
						help="If selected, only trip dates will display."
						__nextHasNoMarginBottom
					/>
					{ ! postMeta.tripMultiday && (
						<>
							<DatePicker
								label="Date"
								value={ postMeta.tripStartDate }
								onChange={ ( value ) => {
									if ( ! postMeta.tripStartDate ) {
										value = format( 'Y-m-d', value ) + 'T00:00:00';
									}
									const endDate = postMeta.tripEndDate
										? format( 'Y-m-d', value ) + 'T' + format( 'H:i:s', postMeta.tripEndDate )
										: value;
									dispatch( 'core/editor' ).editPost( {
										meta: {
											tripStartDate: value,
											tripEndDate: endDate,
										},
									} );
								} }
								onClear={ () => {
									dispatch( 'core/editor' ).editPost( {
										meta: {
											tripStartDate: '',
											tripEndDate: '',
										},
									} );
								} }
							/>
							{ postMeta.tripStartDate && ! postMeta.tripAllDay && (
								<>
									<TimePicker
										label="Start Time"
										value={ postMeta.tripStartDate }
										yearPlaceholder={ format( 'Y-m-d', postMeta.tripStartDate ) }
										onChange={ ( value ) => {
											const newMeta = {
												tripStartDate: value,
											};
											if ( value > postMeta.tripEndDate || ! postMeta.tripEndDate ) {
												newMeta.tripEndDate = value;
											}
											dispatch( 'core/editor' ).editPost( {
												meta: newMeta,
											} );
										} }
									/>
									<TimePicker
										label="End Time"
										value={ postMeta.tripEndDate }
										yearPlaceholder={ format( 'Y-m-d', postMeta.tripStartDate ) }
										onChange={ ( value ) => {
											const newMeta = {
												tripEndDate: value,
											};
											if ( value < postMeta.tripStartDate || ! postMeta.tripStartDate ) {
												newMeta.tripStartDate = value;
											}
											dispatch( 'core/editor' ).editPost( {
												meta: newMeta,
											} );
										} }
									/>
								</>
							) }
						</>
					) }
					{ postMeta.tripMultiday && (
						<>
							{ postMeta.tripAllday && (
								<>
									<DatePicker
										label="Start Date"
										value={ postMeta.tripStartDate }
										onChange={ ( value ) => {
											const newMeta = {
												tripStartDate: value,
											};
											if ( ! postMeta.tripEndDate || value > postMeta.tripEndDate ) {
												newMeta.tripEndDate = value;
											}
											dispatch( 'core/editor' ).editPost( {
												meta: newMeta,
											} );
										} }
									/>
									<DatePicker
										label="End Date"
										value={ postMeta.tripEndDate }
										onChange={ ( value ) => {
											const newMeta = {
												tripEndDate: value,
											};
											if ( ! postMeta.tripStartDate || value < postMeta.tripStartDate ) {
												newMeta.tripStartDate = value;
											}
											dispatch( 'core/editor' ).editPost( {
												meta: newMeta,
											} );
										} }
									/>
								</>
							) }
							{ ! postMeta.tripAllday && (
								<>
									<DateTimePicker
										label="Start Date/Time"
										value={ postMeta.tripStartDate }
										onChange={ ( value ) => {
											const newMeta = {
												tripStartDate: value,
											};
											if ( ! postMeta.tripEndDate || value > postMeta.tripEndDate ) {
												newMeta.tripEndDate = value;
											}
											dispatch( 'core/editor' ).editPost( {
												meta: newMeta,
											} );
										} }
									/>
									<DateTimePicker
										label="End Date/Time"
										value={ postMeta.tripEndDate }
										onChange={ ( value ) => {
											const newMeta = {
												tripEndDate: value,
											};
											if ( ! postMeta.tripStartDate || value < postMeta.tripStartDate ) {
												newMeta.tripStartDate = value;
											}
											dispatch( 'core/editor' ).editPost( {
												meta: newMeta,
											} );
										} }
									/>
								</>
							) }
						</>
					) }
				</Flex>
			</PluginDocumentSettingPanel>
			<PluginDocumentSettingPanel name="cwps-trip-details" title={ 'Trip Details' }>
				<Flex direction="column" gap="16px">
					{ linkedProduct?.id && (
						<BaseControl { ...baseControlProps }>
							<a
								href={ `/wp-admin/post.php?post=${ linkedProduct.id }&action=edit` }
								target="_blank"
								rel="noreferrer"
							>
								{ linkedProduct.title.raw }
							</a>
						</BaseControl>
					) }
					<TextControl
						label="Price"
						value={ postMeta.tripPrice }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									tripPrice: value,
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="Spaces"
						type="number"
						value={ postMeta.tripSpots }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									tripSpots: value,
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TMCEControl
						label="Trip Includes"
						value={ postMeta.tripIncludes }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									tripIncludes: value,
								},
							} );
						} }
					/>
					<TMCEControl
						label="Not Included"
						value={ postMeta.tripNotIncluded }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									tripNotIncluded: value,
								},
							} );
						} }
					/>
				</Flex>
			</PluginDocumentSettingPanel>
		</>
	);
}
