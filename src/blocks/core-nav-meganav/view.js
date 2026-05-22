/**
 * WordPress dependencies
 */
import { store, getContext, getElement, withScope, withSyncEvent } from '@wordpress/interactivity';

// Configuration constants
const CONFIG = {
	// Viewport breakpoints
	MOBILE_BREAKPOINT: 600, // px - Below this is considered mobile

	// Hover behavior
	HOVER: {
		BASE_DELAY: 300, // ms - Base hover intent delay
		DELAY_PER_PX: 2, // ms - Additional delay per pixel of top spacing
	},

	// Menu dimensions
	MENU: {
		MIN_WIDTH: 200, // px - Minimum width for menus
		MIN_WIDTH_BEFORE_ANCHOR: 400, // px - Minimum width before switching to anchoring
		VIEWPORT_OFFSET: 120, // px - Space reserved for modal header
		MOBILE_BG_OPACITY: 1, // Opacity for mobile background color
		DEFAULT_BG_FALLBACK: 'rgba(255, 255, 255, 1)', // Fallback mobile background
	},

	// CSS classes
	CLASSES: {
		MENU_CONTAINER: '.wp-block-capitola-core-nav-meganav__sub-menu',
		NAV_BLOCK: '.wp-block-navigation',
		RESPONSIVE_CONTAINER: '.wp-block-navigation__responsive-container',
	},
};

// Menu utility functions
const menuUtils = {
	// DOM query helpers
	getMenu: ( ref ) => {
		return ref.querySelector( CONFIG.CLASSES.MENU_CONTAINER );
	},
	getNavBlock: ( menu ) => {
		return menu.closest( CONFIG.CLASSES.NAV_BLOCK );
	},
	getResponsiveContainer: ( menu ) => {
		return menu.closest( CONFIG.CLASSES.RESPONSIVE_CONTAINER );
	},
};

// Track the currently open hover menu globally
let currentHoverMenu = null;
// Track the currently open click menu globally
let currentClickMenu = null;
// Track resize debounce timers per element
const resizeTimers = new WeakMap();

const { state, actions } = store( 'capitola/core-nav-meganav', {
	state: {
		get isMenuOpen() {
			// The menu is opened if either `click`, `focus`, or `hover` is true.
			console.log(Object.values( state.menuOpenedBy ).filter( Boolean ).length > 0);
			return Object.values( state.menuOpenedBy ).filter( Boolean ).length > 0;
		},
		get menuOpenedBy() {
			const context = getContext();
			return context.menuOpenedBy;
		},
		get isDesktop() {
			return window.innerWidth >= CONFIG.MOBILE_BREAKPOINT;
		},
		hoverTimeout: null,
		get dynamicHoverDelay() {
			const context = getContext();
			const topSpacing = context.topSpacing || 0;
			// Add delay based on top spacing to give users more time
			const extraDelay = topSpacing * CONFIG.HOVER.DELAY_PER_PX;
			return CONFIG.HOVER.BASE_DELAY + extraDelay;
		},
		isProcessingClick: false,
	},
	actions: {
		// Helper to close all menu states
		closeAllMenus() {
			actions.closeMenu( 'click' );
			actions.closeMenu( 'focus' );
			actions.closeMenu( 'hover' );
		},
		// Apply top spacing to menu based on configuration
		applyTopSpacing( menu ) {
			const topSpacing = menu.dataset.topSpacing;
			if ( topSpacing && parseInt( topSpacing ) > 0 && state.isDesktop ) {
				menu.style.top = `${ topSpacing }px`;
			} else if ( ! state.isDesktop ) {
				// Reset top spacing on mobile
				menu.style.top = '';
			}
		},
		// Determine menu justification based on menu and nav block classes
		determineJustification( menu, navBlock ) {
			// Check menu-specific justification first (higher priority)
			if ( menu.classList.contains( 'menu-justified-center' ) ) {
				return 'center';
			} else if ( menu.classList.contains( 'menu-justified-right' ) ) {
				return 'right';
			} else if ( menu.classList.contains( 'menu-justified-left' ) ) {
				return 'left';
			}

			// Fall back to nav block justification
			if (
				navBlock.classList.contains( 'items-justified-center' ) ||
				navBlock.classList.contains( 'items-justified-space-between' )
			) {
				return 'center';
			} else if ( navBlock.classList.contains( 'items-justified-right' ) ) {
				return 'right';
			}

			return 'left'; // Default
		},
		// Get menu measurements for positioning calculations
		getMenuMeasurements( menu, navBlock ) {
			const windowSpace = window.innerWidth;
			let originalMenuWidth = menu.offsetWidth;

			// For custom width menus, use the configured width
			if ( menu.dataset.customWidth ) {
				originalMenuWidth = parseInt( menu.dataset.customWidth );
			}

			return {
				windowSpace,
				originalMenuWidth,
				menuRect: menu.getBoundingClientRect(),
				navBlockRect: navBlock.getBoundingClientRect(),
				leftOffset: navBlock.getBoundingClientRect().left,
				leftSpace: ( windowSpace - originalMenuWidth ) / 2,
			};
		},
		// Reset inline positioning styles so getBoundingClientRect()
		// returns the element's natural CSS position. Called before
		// recalculating on resize to prevent compound offset drift.
		resetMenuPositionStyles( menu ) {
			menu.style.left = '';
			menu.style.width = '';
			menu.style.maxWidth = '';
		},
		// Adjust a single dropdown menu
		adjustMegaMenu() {
			const { ref } = getElement();
			const menu = menuUtils.getMenu( ref );
			if ( ! menu ) {
				return;
			}

			const navBlock = menuUtils.getNavBlock( menu );
			if ( ! navBlock ) {
				return;
			}

			// Apply positioning helpers
			actions.applyTopSpacing( menu );

			// Determine justification
			const justification = actions.determineJustification( menu, navBlock );

			// Get measurements
			const measurements = actions.getMenuMeasurements( menu, navBlock );

			// Apply justification-based positioning
			actions.applyJustificationPositioning(
				menu,
				justification,
				measurements.windowSpace,
				measurements.originalMenuWidth,
				measurements.menuRect,
				measurements.leftOffset,
				measurements.leftSpace,
				measurements.navBlockRect
			);
		},
		// Apply justification-based positioning
		applyJustificationPositioning( menu, justification, windowSpace, menuWidth, menuRect ) {
			const minWidth = CONFIG.MENU.MIN_WIDTH;

			// Step 1: Handle width constraints for ALL menus
			if ( menuWidth > windowSpace ) {
				const newWidth = Math.max( windowSpace, minWidth );
				menu.style.width = `${ newWidth }px`;
				// Update dimensions to use constrained width for calculations
				menuWidth = newWidth;
			}

			// Use window.innerWidth instead of 100vw to avoid scrollbar issues
			menu.style.width = `${ windowSpace }px`;
			menu.style.maxWidth = `${ windowSpace }px`;
			// Calculate offset needed to reach viewport left edge
			menu.style.left = `${ -menuRect.left }px`;
		},
		// Handle window resize using Interactivity API
		handleResize() {
			const { ref } = getElement();
			const menu = menuUtils.getMenu( ref );
			if ( ! menu ) {
				return;
			}

			// Clear any hover timeouts on resize
			actions.clearHoverTimeout();

			// Close hover menus if we resize below desktop breakpoint
			if ( ! state.isDesktop && state.menuOpenedBy.hover ) {
				actions.closeMenu( 'hover' );
			}

			// Debounce the positioning recalculation to prevent
			// flickering during continuous resize events.
			const existingTimer = resizeTimers.get( ref );
			if ( existingTimer ) {
				cancelAnimationFrame( existingTimer );
			}

			resizeTimers.set(
				ref,
				requestAnimationFrame(
					withScope( () => {
						// Reset justification swap flag on resize to allow re-evaluation
						delete menu.dataset.justificationSwapped;

						// Reset inline positioning so recalculation starts
						// from the element's natural CSS position.
						actions.resetMenuPositionStyles( menu );

						// Re-apply full positioning logic on resize
						actions.adjustMegaMenu();

						resizeTimers.delete( ref );
					} )
				)
			);
		},
		toggleMenuOnClick: withSyncEvent( ( event ) => {
			const context = getContext();

			// Safari fix: Set flag to prevent focusout from interfering with click handling
			state.isProcessingClick = true;

			// On mobile, always toggle the menu even if it's a link with hover enabled
			// On desktop with hover enabled and URL, allow default link behavior
			// if ( context.showOnHover && context.url && state.isDesktop ) {
			// 	// Let the link navigate on desktop when hover is enabled with URL
			// 	state.isProcessingClick = false;
			// 	console.log('here');
			// 	return;
			// }

			// Prevent default link navigation on mobile or when no URL
			if ( event && event.preventDefault ) {
				event.preventDefault();
			}

			// Safari won't send focus to the clicked element, so we need to manually place it: https://bugs.webkit.org/show_bug.cgi?id=22261
			const { ref } = getElement();
			if ( window.document.activeElement !== ref ) {
				ref.focus();
			}

			// Close any other currently open click menu before toggling this one
			if ( currentClickMenu && currentClickMenu !== context ) {
				currentClickMenu.menuOpenedBy.click = false;
				currentClickMenu.menuOpenedBy.focus = false;
			}

			// Only check click state for toggling (focus state is for keyboard nav)
			if ( state.menuOpenedBy.click ) {
				actions.closeMenu( 'click' );
				actions.closeMenu( 'focus' );
			} else {
				// Close focus state and open by click
				actions.closeMenu( 'focus' );
				context.previousFocus = ref;
				actions.openMenu( 'click' );
				// Track this as the current click menu
				currentClickMenu = context;
			}

			// Safari fix: Clear flag after focus events have settled
			// This prevents focusout from closing the menu during click processing
			setTimeout( () => {
				state.isProcessingClick = false;
			}, 100 );
		} ),
		closeMenuOnClick() {
			actions.closeMenu( 'click' );
			actions.closeMenu( 'focus' );
		},

		// ========== HOVER FUNCTIONALITY ==========
		// Hover timeout management
		clearHoverTimeout() {
			if ( state.hoverTimeout ) {
				clearTimeout( state.hoverTimeout );
				state.hoverTimeout = null;
			}
		},
		setHoverTimeout( callback, delay ) {
			actions.clearHoverTimeout();
			state.hoverTimeout = setTimeout( withScope( callback ), delay );
		},
		// Check if hover should be active
		shouldActivateHover() {
			const context = getContext();
			return context.showOnHover && state.isDesktop;
		},
		// Handle mouse enter on toggle button
		handleMouseEnter() {
			if ( ! actions.shouldActivateHover() ) {
				return;
			}

			actions.setHoverTimeout( () => {
				if ( ! state.menuOpenedBy.click ) {
					// Close the previously open hover menu if it exists
					if ( currentHoverMenu && currentHoverMenu !== getContext() ) {
						currentHoverMenu.menuOpenedBy.hover = false;
					}
					// Track this as the current hover menu
					currentHoverMenu = getContext();
					// Don't interfere with click-opened menus
					actions.openMenu( 'hover' );
				}
			}, CONFIG.HOVER.BASE_DELAY );
		},
		// Handle mouse leave from toggle button
		handleMouseLeave() {
			if ( ! actions.shouldActivateHover() ) {
				return;
			}

			actions.setHoverTimeout( () => {
				actions.closeMenu( 'hover' );
			}, state.dynamicHoverDelay ); // Use dynamic delay based on top spacing
		},
		// Handle mouse enter on menu container
		handleMenuMouseEnter() {
			if ( ! actions.shouldActivateHover() ) {
				return;
			}

			// Clear any close timeout to keep menu open
			actions.clearHoverTimeout();
		},
		// Handle mouse leave from menu container
		handleMenuMouseLeave() {
			if ( ! actions.shouldActivateHover() ) {
				return;
			}

			actions.setHoverTimeout( () => {
				actions.closeMenu( 'hover' );
			}, CONFIG.HOVER.BASE_DELAY ); // Use base delay when leaving menu
		},
		// ========== END HOVER FUNCTIONALITY ==========

		openMenuOnFocus() {
			// Only open if not already open
			if ( state.isMenuOpen ) {
				return;
			}

			// Only open on focus for desktop (keyboard navigation)
			// On mobile, require explicit click to open
			if ( ! state.isDesktop ) {
				return;
			}

			// Open menu for keyboard accessibility
			actions.openMenu( 'focus' );
		},
		handleMenuKeydown( event ) {
			if ( state.menuOpenedBy.click || state.menuOpenedBy.focus ) {
				// If Escape close the menu.
				if ( event?.key === 'Escape' ) {
					actions.closeMenu( 'click' );
					actions.closeMenu( 'focus' );
				}
			}
		},
		handleMenuFocusout( event ) {
			// Safari fix: Ignore focusout during click processing
			// When clicking the toggle, Safari fires focusout events that can interfere
			if ( state.isProcessingClick ) {
				return;
			}

			const context = getContext();
			const { ref } = getElement();
			const menuContainer = context.megaMenu?.querySelector(
				'.wp-block-ollie-mega-menu__menu-container'
			);

			// Safari fix: Don't close when focus moves to navigation UI elements
			// These elements are part of the navigation system but outside the menu container
			if ( event.relatedTarget ) {
				const isNavigationUI =
					event.relatedTarget.classList?.contains(
						'wp-block-navigation__responsive-close'
					) || event.relatedTarget === ref;

				if ( isNavigationUI ) {
					return;
				}
			}

			// When relatedTarget is null, check if it's because the window lost focus
			// or because focus truly left the menu container
			if ( event.relatedTarget === null ) {
				// Use a short timeout to check if the window still has focus
				// If the window lost focus, don't close the menu
				setTimeout(
					withScope( () => {
						// If no element in the document has focus, the window likely lost focus
						// In this case, keep the menu open
						if ( ! document.hasFocus() ) {
							return;
						}

						// If the document has focus but the menu container doesn't contain the active element,
						// then focus legitimately moved elsewhere in the page - close the menu
						if (
							! menuContainer?.contains( window.document.activeElement ) &&
							window.document.activeElement !== ref
						) {
							actions.closeAllMenus();
						}
					} ),
					0
				);
				return;
			}

			// Close menu if focus leaves the menu container to another element in the document
			if (
				! menuContainer?.contains( event.relatedTarget ) &&
				event.target !== window.document.activeElement
			) {
				actions.closeAllMenus();
			}
		},
		openMenu( menuOpenedOn = 'click' ) {
			state.menuOpenedBy[ menuOpenedOn ] = true;
		},
		closeMenu( menuClosedOn = 'click' ) {
			const context = getContext();
			state.menuOpenedBy[ menuClosedOn ] = false;

			// Reset the menu reference and button focus when closed.
			if ( ! state.isMenuOpen ) {
				// Clear the global hover menu reference if this was the hover menu
				if ( currentHoverMenu === context ) {
					currentHoverMenu = null;
				}
				// Clear the global click menu reference if this was the click menu
				if ( currentClickMenu === context ) {
					currentClickMenu = null;
				}

				if ( context.megaMenu?.contains( window.document.activeElement ) ) {
					context.previousFocus?.focus();
				}
				context.previousFocus = null;

				// Reset justification swap flag when menu closes
				if ( context.megaMenu ) {
					const menu = menuUtils.getMenu( context.megaMenu );
					if ( menu ) {
						delete menu.dataset.justificationSwapped;
					}
				}

				context.megaMenu = null;
			}
		},
	},
	callbacks: {
		initMenu() {
			const context = getContext();
			const { ref } = getElement();

			// Set the menu reference when initialized.
			if ( state.isMenuOpen ) {
				context.megaMenu = ref;
			}
		},
		// Initialize and adjust menu on component ready
		initMenuLayout() {
			// Wait for page to fully load before calculating position
			// This prevents miscalculation due to layout shifts during page load
			// (e.g., images loading, resource fetching, CSS settling)
			if ( document.readyState === 'complete' ) {
				// Page already loaded, calculate immediately
				actions.adjustMegaMenu();
			} else {
				// Wait for load event to ensure stable layout
				window.addEventListener(
					'load',
					withScope( () => {
						actions.adjustMegaMenu();
					} ),
					{ once: true }
				);
			}
		},
	},
} );
