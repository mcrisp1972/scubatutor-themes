import { store, getContext } from '@wordpress/interactivity';

store( 'cwps-accordion', {
	state: {
		get isOpen() {
			const context = getContext();

			// If keepOpen is true, each item maintains its own state
			if ( context.keepOpen === true ) {
				return context.itemIsOpen === true;
			}

			// If keepOpen is false, only one item can be open at a time
			return context.activeItemId === context.itemId;
		},
	},
	actions: {
		toggle: () => {
			const context = getContext();

			// If keepOpen is true, toggle individual item state
			if ( context.keepOpen === true ) {
				context.itemIsOpen = ! context.itemIsOpen;
			} else if ( context.activeItemId === context.itemId ) {
				// If keepOpen is false and clicking the currently open item, close it
				context.activeItemId = null;
			} else {
				// Otherwise, open this item (closes others automatically)
				context.activeItemId = context.itemId;
			}
		},
	},
} );
