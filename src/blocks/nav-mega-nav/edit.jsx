import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	LinkControl,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	TextControl,
	Popover,
	SelectControl,
	RadioControl,
} from '@wordpress/components';
import { store as coreDataStore } from '@wordpress/core-data';
import { useState } from '@wordpress/element';
import { ImageSelect, LinkSelect } from '../../editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		link,
		title,
		headline,
		intro,
		imageId,
		linksPerColumn,
		populationMethod,
		autoPopulatePostType,
	} = attributes;
	const [ isLinkControlVisible, setIsLinkControlVisible ] = useState( false );

	const imageObject = useSelect(
		( select ) => {
			return imageId
				? select( 'core' ).getEntityRecord( 'postType', 'attachment', imageId )
				: undefined;
		},
		[ imageId ]
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

	const blockProps = useBlockProps( {
		className: 'wp-block-capitola-nav__menu-item',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className:
				'wp-block-capitola-nav-mega-nav__sub-menu-items --row-limit-' + linksPerColumn,
		},
		{
			defaultBlock: { name: 'capitola/nav-sublink' },
			allowedBlocks: [ 'capitola/nav-sublink' ],
			directInsert: true,
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Layout" initialOpen={ true }>
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
					<TextControl
						type="number"
						min="1"
						max="10"
						label="Links Per Column"
						value={ linksPerColumn }
						onChange={ ( value ) => {
							setAttributes( {
								linksPerColumn: parseInt( value ),
							} );
						} }
						__next40pxDefaultSize
					/>
					<ImageSelect
						label="Image"
						value={ imageId }
						onChange={ ( value ) => {
							setAttributes( { imageId: value.id } );
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
			<div className="wp-block-capitola-nav__menu-item-caret"></div>
			<div className="wp-block-capitola-nav-mega-nav__sub-menu">
				<div className="wp-block-capitola-nav-mega-nav__sub-menu-height">
					<div className="wp-block-capitola-nav-mega-nav__head">
						<RichText
							className="wp-block-capitola-nav-mega-nav__headline --hl-m"
							value={ headline }
							allowedFormats={ [] }
							placeholder="Headline..."
							onChange={ ( value ) => {
								setAttributes( { headline: value } );
							} }
						/>
						<RichText
							className="wp-block-capitola-nav-mega-nav__intro"
							value={ intro }
							placeholder="Intro..."
							onChange={ ( value ) => {
								setAttributes( { intro: value } );
							} }
						/>
					</div>
					{ populationMethod !== 'manual' ? (
						<div
							className={
								'wp-block-capitola-nav-mega-nav__sub-menu-items --row-limit-' +
								linksPerColumn
							}
						>
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
					{ !! imageObject && (
						<div className="wp-block-capitola-nav-mega-nav__image">
							<img src={ imageObject.source_url } alt="" />
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
