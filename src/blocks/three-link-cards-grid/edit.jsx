import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { staggered, parallax } = attributes;

	const staggeredClass = staggered ? ' --staggered' : '';

	const blockProps = useBlockProps( {
		className: `alignfull ${ staggeredClass }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-three-link-cards-grid__width',
		},
		{
			template: [
				[ 'capitola/three-link-card' ],
				[ 'capitola/three-link-card' ],
				[ 'capitola/three-link-card' ],
			],
			templateLock: { move: true, remove: false, insert: false },
			directInsert: false,
		}
	);

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Link Details" initialOpen={ true }>
					<ToggleControl
						label="Vertical Stagger"
						checked={ staggered }
						onChange={ ( value ) => {
							return setAttributes( { staggered: value } );
						} }
					/>
					{ staggered && (
						<ToggleControl
							label="Parallax Scrolling"
							checked={ parallax }
							onChange={ ( value ) => {
								return setAttributes( { parallax: value } );
							} }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</div>
	);
}
