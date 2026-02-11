import { useBlockProps, RichText, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { Platform } from '@wordpress/element';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import HeadingLevelDropdown from './htag-dropdown';

export default function Edit( { attributes, setAttributes, onReplace, clientId } ) {
	const { content, tag, textAlign } = attributes;

	return (
		<div { ...useBlockProps() }>
			{
				<BlockControls>
					<HeadingLevelDropdown
						selectedLevel={ tag }
						onChange={ ( value ) => {
							setAttributes( { tag: value } );
						} }
					/>
					<AlignmentControl
						value={ textAlign }
						onChange={ ( value ) => {
							setAttributes( { textAlign: value } );
						} }
					/>
				</BlockControls>
			}
			<RichText
				tagName="div"
				value={ content }
				allowedFormats={ [] }
				className={ `--eyebrow ${ textAlign ? `has-text-align-${ textAlign }` : '' }` }
				onChange={ ( value ) => {
					setAttributes( { content: value } );
				} }
				onSplit={ ( value, isOriginal ) => {
					let block;

					if ( isOriginal || value ) {
						block = createBlock( 'capitola/eyebrow', {
							...attributes,
							content: value,
						} );
					} else {
						block = createBlock( getDefaultBlockName() ?? 'core/paragraph' );
					}

					if ( isOriginal ) {
						block.clientId = clientId;
					}

					return block;
				} }
				textAlign={ textAlign }
				onReplace={ onReplace }
				placeholder={ 'Eyebrow...' }
				{ ...( Platform.isNative && { deleteEnter: true } ) }
			/>
		</div>
	);
}
