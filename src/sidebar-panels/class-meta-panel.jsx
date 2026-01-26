import { dispatch, select, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { TextControl, BaseControl, useBaseControlProps, SelectControl, Spinner, Flex } from '@wordpress/components';
import { PostPicker, DatePicker, TimePicker, MetaRepeater, MetaRepeaterOnChange } from '../editor-controls';
import { format } from '@wordpress/date';
import { classStartEndDates } from '../scripts/modules/date-functions';

export default function classMetaPanels() {
	const nextSessionDate = () => {
		const lastDate = classStartEndDates( currentMeta )?.end;
		if ( ! lastDate ) {
			return '';
		}
		const date = new Date( lastDate );
		date.setDate( date.getDate() + 1 );
		return date.toISOString().substring( 0, 19 );
	};
	const postType = select( 'core/editor' ).getCurrentPostType();
	if ( postType !== 'class' ) {
		return null;
	}

	const setClassDefaults = ( courseId ) => {
		if ( parseInt( courseId ) ) {
			apiFetch( { path: '/wp/v2/course/' + courseId } ).then( ( result ) => {
				dispatch( 'core/editor' ).editPost( {
					meta: {
						classEnrollFee: String( result.meta.courseEnrollFee ),
						classInstFee: String( result.meta.courseInstructorFee ),
						classSpaces: result.meta.courseDefaultSpaces,
						classParentCourseName: result.title.rendered,
					},
				} );
			} );
		} else {
			dispatch( 'core/editor' ).editPost( {
				meta: {
					classEnrollFee: '',
					classInstFee: '',
					classSpaces: '',
					classParentCourseName: '',
				},
			} );
		}
	};

	const venues = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'tribe_venue' );
	} );

	const currentMeta = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	}, [] );

	const linkedProduct = useSelect(
		( select ) => {
			return currentMeta?.classProductId
				? select( 'core' ).getEntityRecord( 'postType', 'product', currentMeta.classProductId )
				: undefined;
		},
		[ currentMeta ]
	);

	const { baseControlProps } = useBaseControlProps( { label: 'Linked Product', __nextHasNoMarginBottom: true } );

	return (
		<>
			<PluginDocumentSettingPanel name="cwps-class-meta" title={ 'Class Details' }>
				<Flex direction="column" gap="16px">
					{ linkedProduct?.id && (
						<BaseControl { ...baseControlProps }>
							<br />
							<a
								href={ `/wp-admin/post.php?post=${ linkedProduct.id }&action=edit` }
								target="_blank"
								rel="noreferrer"
							>
								{ linkedProduct.title.raw }
							</a>
						</BaseControl>
					) }
					<PostPicker
						label="Course"
						postType="course"
						value={ currentMeta.classParentCourseId }
						orderBy="title"
						onChange={ ( value ) => {
							setClassDefaults( value );
							dispatch( 'core/editor' ).editPost( {
								meta: {
									classParentCourseId: value,
								},
							} );
						} }
					/>
					<TextControl
						label="Enrollment Fee"
						value={ currentMeta.classEnrollFee }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									classEnrollFee: String( value ),
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="Instructor Fee"
						value={ currentMeta.classInstFee }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									classInstFee: String( value ),
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						type="number"
						min="1"
						label="Spaces"
						value={ currentMeta.classSpaces }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									classSpaces: value,
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</Flex>
			</PluginDocumentSettingPanel>
			<PluginDocumentSettingPanel name="cwps-class-schedule" title={ 'Schedule' }>
				<MetaRepeater
					postMeta={ currentMeta }
					metaKey="classSchedule"
					label="Session"
					pluralLabel="Sessions"
					newObject={ {
						type: 'Class Session',
						venue: '',
						start: nextSessionDate(),
						end: nextSessionDate(),
					} }
					fields={ ( index ) => {
						return [
							<SelectControl
								label="Session Type"
								key={ 'type' + index }
								value={ currentMeta.classSchedule[ index ]?.type }
								options={ [
									{ label: 'Class Session', value: 'Class Session' },
									{ label: 'Pool Session', value: 'Pool Session' },
									{ label: 'Open Water Session', value: 'Open Water Session' },
								] }
								onChange={ ( value ) => {
									MetaRepeaterOnChange( currentMeta, 'classSchedule', value, index, 'type' );
								} }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>,
							!! venues ? (
								<SelectControl
									key={ 'venue' + index }
									label="Location"
									value={ currentMeta.classSchedule[ index ]?.venue }
									options={ [
										{ label: 'Select One', value: 0 },
										...venues.map( ( i ) => {
											return { label: i.title.raw, value: i.id };
										} ),
									] }
									onChange={ ( value ) => {
										MetaRepeaterOnChange( currentMeta, 'classSchedule', value, index, 'venue' );
									} }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
							) : (
								<Spinner key={ 'venue' + index } />
							),
							<DatePicker
								key={ 'date' + index }
								label="Session Date"
								value={ currentMeta.classSchedule[ index ]?.start }
								onChange={ ( value ) => {
									const newStartTime =
										format( 'Y-m-d', value ) +
										'T' +
										( currentMeta.classSchedule[ index ]?.start
											? currentMeta.classSchedule[ index ]?.start.slice( -8 )
											: '08:00:00' );
									const newEndTime =
										format( 'Y-m-d', value ) +
										'T' +
										( currentMeta.classSchedule[ index ]?.end
											? currentMeta.classSchedule[ index ]?.end.slice( -8 )
											: '08:00:00' );
									MetaRepeaterOnChange( currentMeta, 'classSchedule', newStartTime, index, 'start' );
									MetaRepeaterOnChange( currentMeta, 'classSchedule', newEndTime, index, 'end' );
								} }
							/>,
							<TimePicker
								key={ 'startTime' + index }
								label="Start Time"
								yearPlaceholder={
									currentMeta.classSchedule[ index ]?.start
										? format( 'Y-m-d', currentMeta.classSchedule[ index ]?.start )
										: '1972-01-01'
								}
								value={ currentMeta.classSchedule[ index ]?.start }
								onChange={ ( value ) => {
									MetaRepeaterOnChange( currentMeta, 'classSchedule', value, index, 'start' );
									if ( value > currentMeta.classSchedule[ index ]?.end ) {
										MetaRepeaterOnChange( currentMeta, 'classSchedule', value, index, 'end' );
									}
								} }
							/>,
							<TimePicker
								key={ 'endTime' + index }
								label="End Time"
								yearPlaceholder={
									currentMeta.classSchedule[ index ]?.start
										? format( 'Y-m-d', currentMeta.classSchedule[ index ]?.start )
										: '1972-01-01'
								}
								value={ currentMeta.classSchedule[ index ]?.end }
								onChange={ ( value ) => {
									MetaRepeaterOnChange( currentMeta, 'classSchedule', value, index, 'end' );
									if ( value < currentMeta.classSchedule[ index ]?.start ) {
										MetaRepeaterOnChange( currentMeta, 'classSchedule', value, index, 'start' );
									}
								} }
							/>,
						];
					} }
				/>
			</PluginDocumentSettingPanel>
		</>
	);
}
