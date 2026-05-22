import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit( props ) {
	const { context } = props;
	const { gridLayout, gridGap, excerptLines } = context;

	const innerBlockCount = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlockCount( props.clientId );
		},
		[ props.clientId ]
	);

	const oddChildrenClass = innerBlockCount % 2 !== 0 ? ' --odd-children' : '';

	const twoThirdsFirstClass = ( innerBlockCount + 1 ) % 3 === 0 ? ' --two-thirds-first' : '';

	const twoThirdsFirstTwoClass =
		( innerBlockCount + 2 ) % 3 === 0 ? ' --two-thirds-first --two-thirds-second' : '';

	const oneHalfFirstClass =
		gridLayout === '4-col' && ( innerBlockCount + 1 ) % 4 === 0 ? ' --one-half-first' : '';

	const oneHalfFirstTwoClass =
		gridLayout === '4-col' && ( innerBlockCount + 2 ) % 4 === 0
			? ' --one-half-first --one-half-second'
			: '';

	const oneHalfFirstThreeClass =
		gridLayout === '4-col' && ( innerBlockCount + 3 ) % 4 === 0
			? ' --one-half-first --one-half-second --one-half-third'
			: '';

	const blockProps = useBlockProps( {
		className: 'alignfull',
		style: { '--wp--custom--truncate-lines': excerptLines },
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-image-link-grid__grid --theme-image-overlay --layout-${ gridLayout } ${ oddChildrenClass } ${ twoThirdsFirstClass } ${ twoThirdsFirstTwoClass } ${ oneHalfFirstClass } ${ oneHalfFirstTwoClass } ${ oneHalfFirstThreeClass } ${
				gridGap ? '--grid-gap' : ''
			}`,
		},
		{
			defaultBlock: {
				name: 'capitola/image-link-grid-item',
			},
			allowedBlocks: [ 'capitola/image-link-grid-item' ],
			template: [ [ 'capitola/image-link-grid-item' ] ],
			templateLock: false,
			directInsert: true,
			orientation: 'horizontal',
		}
	);

	return (
		<div { ...blockProps }>
			<div className="wp-block-capitola-image-link-grid__width">
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
