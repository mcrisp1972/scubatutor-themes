import { registerPlugin } from '@wordpress/plugins';

import { default as tripMetaPanels } from '../sidebar-panels/trip-meta-panel';

import { default as themePanels } from '../sidebar-panels/theme-panel';

import { default as classMetaPanels } from '../sidebar-panels/class-meta-panel';

import { default as courseMetaPanels } from '../sidebar-panels/course-meta-panel';

import './core-blocks';

registerPlugin( 'cwps-sidebar-class-meta', {
	render: classMetaPanels,
} );

registerPlugin( 'cwps-sidebar-course-meta', {
	render: courseMetaPanels,
} );

registerPlugin( 'cwps-sidebar-trip-meta', {
	render: tripMetaPanels,
} );

registerPlugin( 'cwps-sidebar-theme', {
	render: themePanels,
} );
