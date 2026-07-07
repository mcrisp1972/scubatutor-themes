import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { ColorThemePanel, CtaControl } from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { prevPage, nextPage, colorTheme } = attributes;
	const blockProps = useBlockProps( {
		className: `alignfull is-layout-constrained has-global-padding --theme-${ colorTheme }`,
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls group="styles">
				<ColorThemePanel props={ props } />
			</InspectorControls>
			<div className="wp-block-capitola-page-nav__width alignwide">
				<CtaControl
					className="wp-block-capitola-page-nav__prev"
					placeholder="Previous Page..."
					value={ prevPage }
					onChange={ ( value ) => {
						return setAttributes( { prevPage: value } );
					} }
				/>
				<CtaControl
					className="wp-block-capitola-page-nav__next"
					placeholder="Next Page..."
					value={ nextPage }
					onChange={ ( value ) => {
						return setAttributes( { nextPage: value } );
					} }
				/>
			</div>
		</div>
	);
}
