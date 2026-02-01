import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<div
				{ ...useInnerBlocksProps(
					{
						className: `wp-block-capitola-detailed-links-list__list`,
					},
					{
						defaultBlock: { name: 'capitola/detailed-links-item' },
						allowedBlocks: [ 'capitola/detailed-links-item' ],
						template: [ [ 'capitola/detailed-links-item' ] ],
						templateLock: false,
						directInsert: true,
					}
				) }
			/>
		</div>
	);
}
