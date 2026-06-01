import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { animationPreviewClass, AddChildButton } from '../../editor-controls';

export function Edit( props ) {
	const { context, clientId } = props;
	const { revealAnimation } = context;
	const innerBlockCount = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlockCount( clientId );
		},
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: `${
			innerBlockCount < 4 ? ' --count-' + innerBlockCount : ''
		} ${ animationPreviewClass( revealAnimation, 'figure' ) }`,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		defaultBlock: { name: 'capitola/icon-item' },
		allowedBlocks: [ 'capitola/icon-item' ],
		template: [ [ 'capitola/icon-item' ] ],
		templateLock: false,
		directInsert: true,
		orientation: 'horizontal',
	} );

	return (
		<>
			<AddChildButton clientId={ clientId } label="Add Icon" />
			<div { ...innerBlocksProps } />
		</>
	);
}
