import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	LinkControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Popover,
	RadioControl,
	SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { LinkSelect } from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { link, title, alignment, populationMethod, autoPopulatePostType } = attributes;
	const [ isLinkControlVisible, setIsLinkControlVisible ] = useState( false );

	const childPages = useSelect(
		( select ) => {
			if ( populationMethod === 'manual' ) {
				return [];
			}
			const args = {
				per_page: 40,
				orderby: 'menu_order',
				order: 'asc',
			};
			if ( populationMethod === 'children' && link?.id ) {
				args.parent = link.id;
			}

			return select( 'core' ).getEntityRecords(
				'postType',
				populationMethod === 'children' ? 'page' : autoPopulatePostType,
				args
			);
		},
		[ link, populationMethod, autoPopulatePostType ]
	);

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-nav-dropdown__sub-menu-items',
		},
		{
			defaultBlock: { name: 'capitola/nav-sublink' },
			allowedBlocks: [ 'capitola/nav-sublink' ],
			directInsert: true,
		}
	);

	const postTypes = useSelect( ( select ) => {
		const types = select( coreDataStore ).getPostTypes( { per_page: -1 } );
		return types
			? types.filter( ( type ) => {
					return (
						type.supports?.[ 'page-attributes' ] && type.visibility?.show_in_nav_menus
					);
			  } )
			: [ populationMethod, autoPopulatePostType ];
	} );

	const blockProps = useBlockProps( {
		className: 'wp-block-capitola-nav__menu-item',
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Dropdown Settings" initialOpen={ true }>
					<TextControl
						label="Label"
						value={ title }
						onChange={ ( value ) => {
							setAttributes( { title: value } );
						} }
						__next40pxDefaultSize
					/>
					<LinkSelect
						label="Link"
						value={ link }
						onChange={ ( value ) => {
							const newAttributes = { link: value };
							if ( ! title && value?.title ) {
								newAttributes.title = value?.title;
							}
							setAttributes( newAttributes );
						} }
						onRemove={ () => {
							return setAttributes( { link: {} } );
						} }
					/>
					<RadioControl
						label="Alignment"
						selected={ alignment }
						options={ [
							{ label: 'Left', value: '--left-align' },
							{ label: 'Center', value: '--center-align' },
							{ label: 'Right', value: '--right-align' },
						] }
						onChange={ ( value ) => {
							setAttributes( { alignment: value } );
						} }
					/>
					<RadioControl
						label="Population Method"
						selected={ populationMethod }
						options={ [
							{ label: 'Manual', value: 'manual' },
							{ label: 'Child Pages', value: 'children' },
							{ label: 'Post Type', value: 'post-type' },
						] }
						onChange={ ( value ) => {
							setAttributes( { populationMethod: value } );
						} }
						help={
							// eslint-disable-next-line no-nested-ternary
							populationMethod === 'children'
								? 'Automatically populate with child pages of the main linked page.'
								: populationMethod === 'post-type'
								? 'Automatically populate with items from a selected post type.'
								: 'Add submenu items manually.'
						}
					/>
					{ populationMethod === 'post-type' && (
						<SelectControl
							label="Post Type to Populate"
							value={ autoPopulatePostType }
							options={ [
								...postTypes?.map( ( type ) => {
									return {
										label: type?.labels?.singular_name,
										value: type?.slug,
									};
								} ),
							] }
							onChange={ ( value ) => {
								setAttributes( {
									autoPopulatePostType: value,
								} );
							} }
							help="Select which post type to pull items from for automatic population."
							disabled={ populationMethod !== 'post-type' }
							__next40pxDefaultSize
						/>
					) }
				</PanelBody>
			</InspectorControls>
			{ isLinkControlVisible && (
				<Popover
					position="middle center"
					variant="toolbar"
					onClose={ () => {
						return setIsLinkControlVisible( false );
					} }
				>
					<LinkControl
						searchInputPlaceholder="Search..."
						value={ link }
						settings={ [
							{
								id: 'opensInNewTab',
								title: 'New tab',
							},
						] }
						onChange={ ( value ) => {
							const newAttributes = { link: value };
							if ( ! title && value?.title ) {
								newAttributes.title = value?.title;
							}
							setAttributes( newAttributes );
						} }
						withCreateSuggestion={ false }
						onRemove={ () => {
							return setAttributes( { link: {} } );
						} }
					/>
				</Popover>
			) }
			<RichText
				className="wp-block-capitola-nav__menu-item-link"
				value={ title }
				allowedFormats={ [] }
				placeholder="Link Text..."
				onChange={ ( value ) => {
					setAttributes( { title: value } );
				} }
			/>
			<button type="button" className="wp-block-capitola-nav__menu-item-toggle"></button>
			<div className="wp-block-capitola-nav__menu-item-caret"></div>
			<div className={ `wp-block-capitola-nav-dropdown__sub-menu ${ alignment }` }>
				<div className="wp-block-capitola-nav-dropdown__sub-menu-height">
					{ populationMethod !== 'manual' ? (
						<div className="wp-block-capitola-nav-dropdown__sub-menu-items">
							{ childPages?.map( ( page ) => {
								return (
									<div key={ page.id } className="wp-block-capitola-nav-sublink">
										<div className="wp-block-capitola-nav-sublink__link">
											{ page.title.raw }
										</div>
									</div>
								);
							} ) }
						</div>
					) : (
						<div { ...innerBlocksProps } />
					) }
				</div>
			</div>
		</div>
	);
}
