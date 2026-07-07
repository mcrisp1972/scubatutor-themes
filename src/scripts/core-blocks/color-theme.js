import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { ColorThemePanel } from '@capitola/editor-controls';

const themedBlocks = [ 'core/column', 'core/group' ];

// Add colorTheme attribute to core column block
addFilter( 'blocks.registerBlockType', 'capitola/column_block_attributes', ( props, name ) => {
	if ( ! themedBlocks.includes( name ) ) {
		return props;
	}

	return {
		...props,
		attributes: {
			...props.attributes,
			colorTheme: {
				type: 'string',
				default: '',
			},
		},
	};
} );

// Add ColorThemePanel to inspector controls and handle theme changes
addFilter(
	'editor.BlockEdit',
	'capitola/column_block_inspector_controls',
	createHigherOrderComponent( ( BlockEdit ) => {
		return ( props ) => {
			if ( ! themedBlocks.includes( props.name ) ) {
				return <BlockEdit { ...props } />;
			}

			const { attributes, setAttributes } = props;
			const { colorTheme, className } = attributes;

			// Handle theme change
			const handleThemeChange = ( newTheme ) => {
				const themeClass = newTheme ? ` --theme-${ newTheme }` : '';

				// Remove any existing theme classes from className
				let updatedClassName = className || '';
				updatedClassName = updatedClassName.replace( /\s*--theme-[^\s]*/g, '' );

				// Add the new theme class
				if ( newTheme ) {
					updatedClassName += themeClass;
				}

				setAttributes( {
					colorTheme: newTheme,
					className: updatedClassName.trim(),
				} );
			};

			return (
				<>
					<BlockEdit { ...props } />
					<InspectorControls group="styles">
						<ColorThemePanel
							props={ {
								...props,
								attributes: { ...attributes, colorTheme },
								setAttributes: ( attrs ) => {
									if ( attrs.colorTheme !== undefined ) {
										handleThemeChange( attrs.colorTheme );
									} else {
										setAttributes( attrs );
									}
								},
							} }
							initialOpen={ true }
						/>
					</InspectorControls>
				</>
			);
		};
	}, 'withColumnColorTheme' )
);
