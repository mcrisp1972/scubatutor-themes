import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { AddChildButton } from '@capitola/editor-controls';

export function Edit( props ) {
	const { context, clientId } = props;

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
		context[ 'capitola/gridLayout' ] === '4-col' && ( innerBlockCount + 1 ) % 4 === 0
			? ' --one-half-first'
			: '';

	const oneHalfFirstTwoClass =
		context[ 'capitola/gridLayout' ] === '4-col' && ( innerBlockCount + 2 ) % 4 === 0
			? ' --one-half-first --one-half-second'
			: '';

	const oneHalfFirstThreeClass =
		context[ 'capitola/gridLayout' ] === '4-col' && ( innerBlockCount + 3 ) % 4 === 0
			? ' --one-half-first --one-half-second --one-half-third'
			: '';

	const blockProps = useBlockProps( {
		className: 'alignfull',
		style: { '--wp--custom--truncate-lines': context[ 'capitola/excerptLines' ] },
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-image-link-grid__grid --theme-image-overlay --layout-${
				context[ 'capitola/gridLayout' ]
			} ${ oddChildrenClass } ${ twoThirdsFirstClass } ${ twoThirdsFirstTwoClass } ${ oneHalfFirstClass } ${ oneHalfFirstTwoClass } ${ oneHalfFirstThreeClass } ${
				context[ 'capitola/gridGap' ] ? '--grid-gap' : ''
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
			<AddChildButton clientId={ clientId } label="Add Link Grid Item" />
			<div className="wp-block-capitola-image-link-grid__width">
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}
