import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<div
				{ ...useInnerBlocksProps(
					{
						className: `wp-block-cwps-detailed-links-list__list`,
					},
					{
						defaultBlock: { name: 'cwps/detailed-links-item' },
						allowedBlocks: [ 'cwps/detailed-links-item' ],
						template: [ [ 'cwps/detailed-links-item' ] ],
						templateLock: false,
						directInsert: true,
					}
				) }
			/>
		</div>
	);
}
