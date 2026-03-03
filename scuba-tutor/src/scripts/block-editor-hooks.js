import { addFilter } from '@wordpress/hooks';
import childColorThemes from '../../color-themes.json';

addFilter( 'capitola.colorThemes', 'scuba-tutor/color-themes', () => {
	return childColorThemes;
} );
