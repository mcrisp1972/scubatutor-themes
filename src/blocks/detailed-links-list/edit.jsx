import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { animationPreviewClass } from '../../editor-controls';

export default function Edit( props ) {
	const { context } = props;
	const { revealAnimation } = context;
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `wp-block-capitola-detailed-links-list__list ${ animationPreviewClass(
				revealAnimation,
				'figure'
			) }`,
		},
		{
			defaultBlock: { name: 'capitola/detailed-links-item' },
			allowedBlocks: [ 'capitola/detailed-links-item' ],
			template: [ [ 'capitola/detailed-links-item' ] ],
			templateLock: false,
			directInsert: true,
		}
	);

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
		</div>
	);
}
