import { useBlockProps } from '@wordpress/block-editor';
import { CtaControl } from '../../../../capitola/src/editor-controls';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { prevPage, nextPage } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `alignfull is-layout-constrained has-global-padding`,
			} ) }
		>
			<div className="wp-block-capitola-page-nav__width alignwide">
				<CtaControl
					placeholder="Previous Page..."
					className="wp-block-capitola-page-nav__prev"
					value={ prevPage }
					onChange={ ( value ) => {
						return setAttributes( { prevPage: value } );
					} }
				/>
				<CtaControl
					placeholder="Next Page..."
					className="wp-block-capitola-page-nav__next"
					value={ nextPage }
					onChange={ ( value ) => {
						return setAttributes( { nextPage: value } );
					} }
				/>
			</div>
		</div>
	);
}
