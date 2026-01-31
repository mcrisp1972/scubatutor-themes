import { addFilter } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';
import { default as themePanels } from './sidebar-panels/theme-panel';
import defaultColorThemes from '../../color-themes.json';
import './core-blocks';

registerPlugin( 'cwps-sidebar-theme', {
	render: themePanels,
} );

addFilter( 'cwps.colorThemes', 'cwps/color-themes', () => {
    return defaultColorThemes;
} );

addFilter( 'cwps.postTypeOptions', 'cwps/post-type-options', () => {
	return [
		{ label: 'Post', value: 'post' },
		{ label: 'Page', value: 'page' },
	];
} );

addFilter( 'cwps.postTypeCats', 'cwps/post-type-cats', () => {
	return {
		post: 'category',
	};
} );
