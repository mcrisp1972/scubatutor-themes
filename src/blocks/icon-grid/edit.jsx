import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit( props ) {
	const { clientId } = props;
	const innerBlockCount = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlockCount( clientId );
		},
		[ clientId ]
	);

	return (
		<div
			{ ...useInnerBlocksProps(
				useBlockProps( {
					className: `${ innerBlockCount < 4 ? ' --count-' + innerBlockCount : '' } `,
				} ),
				{
					defaultBlock: { name: 'cwps/icon-item' },
					allowedBlocks: [ 'cwps/icon-item' ],
					template: [ [ 'cwps/icon-item' ] ],
					templateLock: false,
					directInsert: true,
					orientation: 'horizontal',
				}
			) }
		/>
	);
}
