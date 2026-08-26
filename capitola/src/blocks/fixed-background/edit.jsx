import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { PanelBody, ToolbarGroup, ToggleControl } from '@wordpress/components';
import {
	ImageSelect,
	ColorThemePanel,
	OverlayOpacitySlider,
	AnimationPanel,
	JustifyToolbar,
} from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		introAlign,
		mobileImage,
		tabletImage,
		desktopImage,
		colorThemeBody,
		colorTheme,
		imageOpacity,
		bodyTextOptions,
	} = attributes;

	const bodyBlockId = useSelect(
		( select ) => {
			const block = select( 'core/block-editor' ).getBlock( clientId );
			return block.innerBlocks[ 0 ].clientId;
		},
		[ clientId ]
	);

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const blockProps = useBlockProps( {
		className: `alignfull ${
			colorThemeBody ? `--theme-${ colorTheme }` : ' --theme-image-overlay'
		}`,
		style: {
			height: '750px',
		},
	} );

	const defaultBodyRadius = 'medium';

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: `wp-block-capitola-fixed-background__img js-background-image ${
				introAlign ? ' --align-' + introAlign : ''
			} ${ ! desktopImage.id ? ' --no-image' : '' }`,
			style: desktopImage.source_url
				? {
						backgroundImage: 'url(' + desktopImage.source_url + ' )',
				  }
				: {},
		},
		{
			template: [ [ 'capitola/body-text', { borderRadius: defaultBodyRadius } ] ],
			templateLock: 'all',
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls group="settings">
				<PanelBody title="Background Images" initialOpen={ true }>
					<ImageSelect
						label="Desktop Image"
						value={ desktopImage.id }
						onChange={ ( value ) => {
							return setAttributes( {
								desktopImage: {
									id: value.id,
									source_url: value.url,
								},
							} );
						} }
					/>
					<ImageSelect
						label="Tablet Image"
						value={ tabletImage.id }
						onChange={ ( value ) => {
							return setAttributes( {
								tabletImage: {
									id: value.id,
									source_url: value.url,
								},
							} );
						} }
					/>
					<ImageSelect
						label="Mobile Image"
						value={ mobileImage.id }
						onChange={ ( value ) => {
							return setAttributes( {
								mobileImage: {
									id: value.id,
									source_url: value.url,
								},
							} );
						} }
					/>
				</PanelBody>
				<PanelBody title="Body Text Options" initialOpen={ true }>
					<ToggleControl
						label="Color Theme Body"
						checked={ colorThemeBody }
						onChange={ ( value ) => {
							setAttributes( {
								colorThemeBody: value,
								bodyTextOptions: {
									...bodyTextOptions,
									enableRadius: value,
								},
							} );
							updateBlockAttributes( bodyBlockId, {
								borderRadius: value ? defaultBodyRadius : 'none',
							} );
						} }
					/>
					{ ! colorThemeBody && (
						<OverlayOpacitySlider
							value={ imageOpacity }
							onChange={ ( value ) => {
								setAttributes( { imageOpacity: value } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
				<AnimationPanel props={ props } sections={ [] } />
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<JustifyToolbar
						props={ props }
						attribute="introAlign"
						options={ [ 'right', 'left', 'center' ] }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...innerBlocksProps }>
				<div
					className="wp-block-capitola-fixed-background__opacity"
					style={ { opacity: imageOpacity } }
				/>
				{ children }
			</div>
		</div>
	);
}
