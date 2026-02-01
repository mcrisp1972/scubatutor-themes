import { store, getContext } from '@wordpress/interactivity';

store( 'capitola-tabbed-contents', {
	state: {
		get isSelected() {
			const context = getContext();
			return context.activePanel === context.panelIndex;
		},
	},
	actions: {
		togglePanel: () => {
			const context = getContext();
			context.activePanel = context.panelIndex;
		},
	},
} );
