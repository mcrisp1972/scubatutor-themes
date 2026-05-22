import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { animationPreviewClass } from '../../editor-controls';

export default function Edit( props ) {
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
			innerBlockCount < 4 ? ` --count-${ innerBlockCount }` : ''
		} ${ animationPreviewClass( revealAnimation, 'figure' ) }`,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		defaultBlock: { name: 'capitola/stats-item' },
		allowedBlocks: [ 'capitola/stats-item' ],
		template: [ [ 'capitola/stats-item' ] ],
		templateLock: false,
		directInsert: true,
	} );

	return <div { ...innerBlocksProps } />;
}
