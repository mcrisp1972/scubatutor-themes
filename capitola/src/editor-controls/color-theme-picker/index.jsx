import { BaseControl, useBaseControlProps, Tooltip } from '@wordpress/components';
import { Icon, check } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';

function ColorThemeOption( { theme, checked, onClick } ) {
	return (
		<div className="components-circular-option-picker__option-wrapper">
			<Tooltip text={ theme.name }>
				<button
					type="button"
					className={ `capitola-theme-picker__option ${
						checked ? '--checked' : ''
					} components-button components-circular-option-picker__option is-next-40px-default-size` }
					onClick={ onClick }
				>
					<div className="capitola-theme-picker__option-swatch">
						<div
							className="capitola-theme-picker__option-bg"
							style={ {
								backgroundColor: theme.palette.background,
							} }
						/>
						<div
							className="capitola-theme-picker__option-primary"
							style={ { backgroundColor: theme.palette.primary } }
						/>
						<div
							className="capitola-theme-picker__option-secondary"
							style={ {
								backgroundColor: theme.palette.secondary,
							} }
						></div>
						{ checked && (
							<div className="capitola-theme-picker__option-selected">
								<Icon icon={ check } />
							</div>
						) }
					</div>
				</button>
			</Tooltip>
		</div>
	);
}

function ColorThemePicker( { label, onChange, value, help } ) {
	// Apply filter inside component so child theme filters are registered first
	const colorThemes = applyFilters( 'capitola.colorThemes' );

	const handleColorClick = ( slug ) => {
		onChange( slug );
	};

	const { baseControlProps } = useBaseControlProps( {
		label,
		help,
		className: 'components-circular-option-picker',
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<div className="capitola-theme-picker components-circular-option-picker__swatches">
				<div className="components-circular-option-picker__option-group components-circular-option-picker__swatches">
					{ colorThemes.map( ( theme, index ) => {
						if ( theme.palette ) {
							return (
								<ColorThemeOption
									key={ index }
									theme={ theme }
									checked={ theme.slug === value }
									onClick={ () => {
										return handleColorClick( theme.slug );
									} }
								/>
							);
						}
						return null;
					} ) }
				</div>
			</div>
		</BaseControl>
	);
}

export default ColorThemePicker;
