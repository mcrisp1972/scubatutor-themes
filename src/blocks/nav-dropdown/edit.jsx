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
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { LinkSelect } from '../../editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { link, title, alignment, autoPopulate } = attributes;
	const [ isLinkControlVisible, setIsLinkControlVisible ] = useState( false );

	const childPages = useSelect(
		( select ) => {
			return autoPopulate && link.id && link.type === 'page'
				? select( 'core' ).getEntityRecords( 'postType', 'page', {
						per_page: -1,
						parent: link.id,
						orderby: 'menu_order',
						order: 'desc',
				  } )
				: undefined;
		},
		[ link, autoPopulate ]
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

	wp.apiFetch( { path: '/wp/v2/types' } ).then( ( types ) => {
		Object.keys( types ).forEach( ( postType ) => {
			console.log( postType, types[ postType ].supports );
		} );
	} );

	return (
		<div
			{ ...useBlockProps( {
				className: 'wp-block-capitola-nav__menu-item',
			} ) }
		>
			<InspectorControls>
				<PanelBody title="Dropdown Settings" initialOpen={ true }>
					<TextControl
						label="Label"
						value={ title }
						onChange={ ( value ) => {
							setAttributes( { title: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
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
					{ link.id && link.type === 'page' && (
						<ToggleControl
							label="Auto-populate with child pages"
							checked={ autoPopulate }
							onChange={ ( value ) => {
								setAttributes( { autoPopulate: value } );
							} }
							__nextHasNoMarginBottom
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
					{ autoPopulate && !! childPages ? (
						<div className="wp-block-capitola-nav-dropdown__sub-menu-items">
							{ childPages.map( ( page ) => {
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
