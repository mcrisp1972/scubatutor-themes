import { addFilter } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';
import { default as ThemePanels } from './sidebar-panels/theme-panel';
import defaultColorThemes from '../../color-themes.json';
import './core-blocks';

addFilter( 'capitola.colorThemes', 'capitola/color-themes', () => {
	return defaultColorThemes;
} );

registerPlugin( 'capitola-sidebar-theme', {
	render: ThemePanels,
} );

addFilter( 'capitola.postTypeOptions', 'capitola/post-type-options', () => {
	return [
		{ label: 'Post', value: 'post' },
		{ label: 'Page', value: 'page' },
	];
} );

addFilter( 'capitola.postTypeCats', 'capitola/post-type-cats', () => {
	return {
		post: 'category',
	};
} );
