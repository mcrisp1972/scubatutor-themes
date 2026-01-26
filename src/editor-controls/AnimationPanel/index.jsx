import { PanelBody, RadioControl } from '@wordpress/components';

function AnimationPanel( { props, allowFigureReveal, initialOpen } ) {
	const { attributes, setAttributes } = props;

	const { allowRevealSectionSelect, revealAnimation, revealSection } = attributes;

	return (
		<PanelBody title="Animation" initialOpen={ initialOpen ? true : false }>
			<RadioControl
				label="Amination Style"
				selected={ revealAnimation }
				options={ [
					{ label: 'None', value: '0' },
					{ label: 'Fade In', value: 'fadein' },
					{ label: 'Fade Up', value: 'fadeup' },
					{ label: 'Fade Side', value: 'fadeslide' },
				] }
				onChange={ ( value ) => {
					return setAttributes( { revealAnimation: value } );
				} }
			/>
			{ allowRevealSectionSelect && revealAnimation !== '0' && (
				<RadioControl
					label="Aminated Section"
					selected={ revealSection }
					options={ [
						{ label: 'Whole Block', value: 'block' },
						{ label: 'Intro Section Only', value: 'body' },
						...( allowFigureReveal ? [ { label: 'Figure Section Only', value: 'figure' } ] : [] ),
					] }
					onChange={ ( value ) => {
						return setAttributes( { revealSection: value } );
					} }
				/>
			) }
		</PanelBody>
	);
}

export default AnimationPanel;
