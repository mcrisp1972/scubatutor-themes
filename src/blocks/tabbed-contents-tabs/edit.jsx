import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {} = attributes;

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const innerBlocks = useSelect( ( select ) => {
		const block = select( 'core/block-editor' ).getBlock( clientId );
		return block.innerBlocks;
	} );

	const { insertBlock } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		if ( ! attributes.activePanel && innerBlocks?.[ 0 ]?.clientId ) {
			setAttributes( { activePanel: innerBlocks[ 0 ].clientId } );
		}
	}, [ attributes.activePanel, innerBlocks, setAttributes ] );

	return (
		<div { ...useBlockProps( { className: 'alignfull' } ) }>
			<div className="wp-block-cwps-tabbed-contents-tabs__width">
				<div className="wp-block-cwps-tabbed-contents-tabs__body">
					<div className="wp-block-cwps-tabbed-contents-tabs__tabs">
						{ innerBlocks.map( ( block ) => {
							if ( block.clientId === attributes.activePanel ) {
								return (
									<RichText
										key={ block.clientId }
										className="wp-block-cwps-tabbed-contents-tabs__tab --is-selected"
										value={ block.attributes.pillLabel }
										allowedFormats={ [] }
										placeholder="Label..."
										onChange={ ( value ) => {
											updateBlockAttributes( block.clientId, { pillLabel: value } );
										} }
									/>
								);
							}
							return (
								<button
									key={ block.clientId }
									className="wp-block-cwps-tabbed-contents-tabs__tab"
									type="button"
									data-panel={ block.clientId }
									onClick={ ( e ) => {
										setAttributes( { activePanel: e.target.getAttribute( 'data-panel' ) } );
									} }
								>
									{ block.attributes.pillLabel ? block.attributes.pillLabel : 'New Tab' }
								</button>
							);
						} ) }
						<button
							className="wp-block-cwps-tabbed-contents-tabs__tab"
							onClick={ () => {
								const newPanel = createBlock( 'cwps/tabbed-contents-panel', {} );
								insertBlock( newPanel, innerBlocks.length, clientId );
								setAttributes( { activePanel: newPanel.clientId } );
							} }
						>
							Add Panel
						</button>
					</div>
					<div
						{ ...useInnerBlocksProps(
							{
								className: 'wp-block-cwps-tabbed-contents-tabs__panels',
							},
							{
								defaultBlock: { name: 'cwps/tabbed-contents-panel' },
								allowedBlocks: [ 'cwps/tabbed-contents-panel' ],
								orientation: 'horizontal',
								template: [ [ 'cwps/tabbed-contents-panel' ] ],
								directInsert: true,
								templateLock: false,
								renderAppender: () => {
									return false;
								},
							}
						) }
					/>
				</div>
			</div>
		</div>
	);
}
