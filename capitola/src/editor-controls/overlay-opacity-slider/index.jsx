import { RangeControl } from '@wordpress/components';

export function OverlayOpacitySlider( { label = 'Image Overlay Opacity', value, onChange } ) {
	return (
		<RangeControl
			label={ label }
			value={ value }
			withInputField={ false }
			min={ 0.0 }
			max={ 0.5 }
			step={ 0.1 }
			showTooltip={ false }
			onChange={ onChange }
			marks={ [
				{
					value: 0.0,
					label: '0',
				},
				{
					value: 0.1,
					label: '0.1',
				},
				{
					value: 0.2,
					label: '0.2',
				},
				{
					value: 0.3,
					label: '0.3',
				},
				{
					value: 0.4,
					label: '0.4',
				},
				{
					value: 0.5,
					label: '0.5',
				},
			] }
			beforeIcon={
				<div
					style={ {
						height: '20px',
						width: '20px',
						backgroundColor: '#FFF',
						border: '1px solid #949494',
						borderRadius: '10px',
					} }
				></div>
			}
			afterIcon={
				<div
					style={ {
						height: '20px',
						width: '20px',
						backgroundColor: '#00000080',
						border: '1px solid #949494',
						borderRadius: '10px',
					} }
				></div>
			}
			help="0.5 is recommended to ensure there is enough contrast. Reduce for darker images."
			__next40pxDefaultSize
		/>
	);
}
