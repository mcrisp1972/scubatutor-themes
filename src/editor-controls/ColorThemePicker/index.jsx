import { BaseControl, useBaseControlProps, Tooltip } from '@wordpress/components';
import { Icon, check } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';

function ColorThemeOption( { theme, checked, onClick } ) {
	return (
		<div className="cwps-theme-picker__option-wrapper">
			<Tooltip text={ theme.name }>
				<button
					type="button"
					className={ `cwps-theme-picker__option ${ checked ? '--checked' : '' }` }
					onClick={ onClick }
				>
					<div className="cwps-theme-picker__option-swatch">
						<div
							className="cwps-theme-picker__option-bg"
							style={ { backgroundColor: theme.palette.background } }
						></div>
						<div
							className="cwps-theme-picker__option-primary"
							style={ { backgroundColor: theme.palette.primary } }
						/>
						<div
							className="cwps-theme-picker__option-secondary"
							style={ { backgroundColor: theme.palette.secondary } }
						></div>
						{ checked && (
							<div className="cwps-theme-picker__option-selected">
								<Icon icon={ check } />
							</div>
						) }
					</div>
				</button>
			</Tooltip>
		</div>
	);
}

function ColorThemePicker( { label, onChange, value } ) {
	// Apply filter inside component so child theme filters are registered first
	const colorThemes = applyFilters( 'cwps.colorThemes' );

	const handleColorClick = ( slug ) => {
		onChange( slug );
	};

	const { baseControlProps } = useBaseControlProps( { label, __nextHasNoMarginBottom: true } );

	return (
		<BaseControl { ...baseControlProps }>
			<div className="cwps-theme-picker">
				<div className="cwps-theme-picker__swatches">
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
