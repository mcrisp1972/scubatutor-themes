import { dispatch, select, useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { TextControl, Flex } from '@wordpress/components';
import { TMCEControl, PostCheckboxes, MetaRepeater, MetaRepeaterOnChange, PostPicker } from '../editor-controls';

export default function courseMetaPanels() {
	const postType = select( 'core/editor' ).getCurrentPostType();

	if ( postType !== 'course' ) {
		return null;
	}

	const postMeta = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	} );

	return (
		<>
			<PluginDocumentSettingPanel name="cwps-class-defaults" title={ 'Course Defaults' }>
				<Flex direction="column" gap="16px">
					<TextControl
						label="Enrollment Fee"
						value={ postMeta.courseEnrollFee }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									courseEnrollFee: value,
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="E-learning Fee"
						value={ postMeta.courseElearnFee }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									courseElearnFee: value,
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="Instructor Fee"
						value={ postMeta.courseInstructorFee }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									courseInstructorFee: value,
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="Spaces"
						type="number"
						value={ postMeta.courseDefaultSpaces }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									courseDefaultSpaces: value,
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TMCEControl
						label="Course Short Description"
						value={ postMeta.courseDescription }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									courseDescription: value,
								},
							} );
						} }
					/>
					<TMCEControl
						label="Includes"
						value={ postMeta.courseIncludes }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									courseIncludes: value,
								},
							} );
						} }
					/>
					<TMCEControl
						label="Not Includes"
						value={ postMeta.courseNotIncludes }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									courseNotIncludes: value,
								},
							} );
						} }
					/>
					<PostCheckboxes
						label="Prerequisite Courses"
						postType="course"
						value={ postMeta.coursePrerequisites }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									coursePrerequisites: value,
								},
							} );
						} }
					/>
					<TextControl
						label="E-Learning Link"
						value={ postMeta.courseElearnLink }
						onChange={ ( value ) => {
							dispatch( 'core/editor' ).editPost( {
								meta: {
									courseElearnLink: value,
								},
							} );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</Flex>
			</PluginDocumentSettingPanel>
			<PluginDocumentSettingPanel name="cwps-course-add-ons" title={ 'Included Add-Ons' }>
				<Flex direction="column" gap="16px">
					<MetaRepeater
						postMeta={ postMeta }
						metaKey="courseReqAddOns"
						label="Required Add On"
						pluralLabel="Required Add Ons"
						help="Selected products will be included in course and class price totals, and automatically added to the cart when a class ids booked."
						newObject={ 0 }
						fields={ ( index ) => {
							return (
								<PostPicker
									key="product"
									label="Product"
									value={ postMeta.courseReqAddOns[ index ] }
									postType="product"
									orderBy="title"
									onChange={ ( value ) => {
										MetaRepeaterOnChange( postMeta, 'courseReqAddOns', value, index );
									} }
								/>
							);
						} }
					/>
				</Flex>
			</PluginDocumentSettingPanel>
			<PluginDocumentSettingPanel name="cwps-course-opt-add-ons" title={ 'Suggested Products' }>
				<MetaRepeater
					postMeta={ postMeta }
					metaKey="courseCrossSells"
					label="Suggested Product"
					pluralLabel="Suggested Products"
					help="Selected products will be suggested during checkout and other displays of suggested add-ons to the course."
					newObject={ 0 }
					fields={ ( index ) => {
						return (
							<PostPicker
								key="product"
								label="Product"
								value={ postMeta.courseCrossSells[ index ] }
								postType="product"
								orderBy="title"
								onChange={ ( value ) => {
									MetaRepeaterOnChange( postMeta, 'courseCrossSells', value, index );
								} }
							/>
						);
					} }
				/>
			</PluginDocumentSettingPanel>
		</>
	);
}
