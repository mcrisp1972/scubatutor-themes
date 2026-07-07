import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { animationPreviewClass } from '@capitola/editor-controls';

export function Edit( props ) {
	const { attributes, setAttributes, context, clientId } = props;

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

	const blockProps = useBlockProps( {
		className: `alignfull ${ animationPreviewClass(
			context[ 'capitola/revealAnimation' ],
			'figure'
		) }`,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-capitola-tabbed-contents-tabs__panels',
		},
		{
			defaultBlock: {
				name: 'capitola/tabbed-contents-panel',
			},
			allowedBlocks: [ 'capitola/tabbed-contents-panel' ],
			orientation: 'horizontal',
			template: [ [ 'capitola/tabbed-contents-panel' ] ],
			directInsert: true,
			templateLock: false,
			renderAppender: () => {
				return false;
			},
		}
	);

	return (
		<div { ...blockProps }>
			<div className="wp-block-capitola-tabbed-contents-tabs__width">
				<div className="wp-block-capitola-tabbed-contents-tabs__body">
					<div className="wp-block-capitola-tabbed-contents-tabs__tabs">
						{ innerBlocks.map( ( block ) => {
							if ( block.clientId === attributes.activePanel ) {
								return (
									<RichText
										key={ block.clientId }
										className="wp-block-capitola-tabbed-contents-tabs__tab --is-selected"
										value={ block.attributes.pillLabel }
										allowedFormats={ [] }
										placeholder="Label..."
										onChange={ ( value ) => {
											updateBlockAttributes( block.clientId, {
												pillLabel: value,
											} );
										} }
									/>
								);
							}
							return (
								<button
									key={ block.clientId }
									className="wp-block-capitola-tabbed-contents-tabs__tab"
									type="button"
									data-panel={ block.clientId }
									onClick={ ( e ) => {
										setAttributes( {
											activePanel: e.target.getAttribute( 'data-panel' ),
										} );
									} }
								>
									{ block.attributes.pillLabel
										? block.attributes.pillLabel
										: 'New Tab' }
								</button>
							);
						} ) }
						<button
							className="wp-block-capitola-tabbed-contents-tabs__tab"
							onClick={ () => {
								const newPanel = createBlock(
									'capitola/tabbed-contents-panel',
									{}
								);
								insertBlock( newPanel, innerBlocks.length, clientId );
								setAttributes( {
									activePanel: newPanel.clientId,
								} );
							} }
						>
							Add Panel
						</button>
					</div>
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</div>
	);
}
