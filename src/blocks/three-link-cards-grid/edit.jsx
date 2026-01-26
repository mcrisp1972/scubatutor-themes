import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { staggered, parallax } = attributes;

	const staggeredClass = staggered ? ' --staggered' : '';

	return (
		<div { ...useBlockProps( { className: 'alignfull' + staggeredClass } ) }>
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
			<div
				{ ...useInnerBlocksProps(
					{
						className: 'wp-block-cwps-three-link-cards-grid__width',
					},
					{
						// defaultBlock: { name: 'cwps/three-link-card' },
						// allowedBlocks: [ 'cwps/three-link-card' ],
						template: [
							[ 'cwps/three-link-card' ],
							[ 'cwps/three-link-card' ],
							[ 'cwps/three-link-card' ],
						],
						templateLock: 'all',
						directInsert: false,
					}
				) }
			/>
		</div>
	);
}
