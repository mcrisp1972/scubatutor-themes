# Capitola Theme JS Filter Reference

## Table of Contents

- [capitola.postTypeOptions](#capitolaposttypeoptions)
- [capitola.colorThemes](#capitolacolorthemes)
- [capitola.postTypeCats](#capitolaposttypecats)
- [capitola.templatePostType](#capitolatemplateposttype)

This document lists all WordPress js filters in the Capitola theme that use `applyFilters()` with a filter name beginning with "capitola". These filters allow developers to modify or extend theme functionality.

---

## Available Filters

### capitola.postTypeOptions
Several of the custom blocks contain select fields for selecting from a list of post types to choose from. This filter allows you to add your custom post types to these select fields.

**Applied in:**
- src/blocks/detailed-links-item/edit.jsx
- src/blocks/featured-posts/edit.jsx
- src/blocks/image-link-grid-item/edit.jsx
- src/blocks/three-link-card/edit.jsx
- src/blocks/image-link-grid-item/edit.jsx

**Parameters:**
- options (js array): List of objects, each containing a 'label' and 'value' property. The label is for display in the editor, and the value is the post type name.

**Returns:**
- (js array) Modified list of post type options.

**Example:**
```js
import { addFilter } from '@wordpress/hooks';

addFilter( 'capitola.postTypeOptions', 'santacruzdivers/post-type-options', ( options ) => {
	return [
		...options,
		{ label: 'Trip', value: 'trip' },
		{ label: 'Course', value: 'course' },
		{ label: 'Staff', value: 'staff' },
	];
} );
```

### capitola.colorThemes
Sets the color themes used by the theme or child theme. It's primarily used to populate the color theme picker control.

**Applied in:**
- src/editor-controls/color-theme-picker/index.jsx
- src/blocks/nav/edit.jsx
- src/blocks/footer/edit.jsx

**Example:**
```js
import { addFilter } from '@wordpress/hooks';
import childColorThemes from '../../color-themes.json';

addFilter( 'capitola.colorThemes', 'santacruzdivers/color-themes', () => {
	return childColorThemes;
} );
```

### capitola.postTypeCats
This is basically the js version of the [capitola_{postType}_base_taxonomy](filters.md#capitola_posttype_base_taxonomy) PHP filter. It maps main taxonomies to post types.

**Applied in:**
- src/blocks/post-feed/edit.jsx
- src/blocks/related-posts/edit.jsx

**Parameters:**
- cats (object): object of taxonomy names keyed by their associated post type.

**Example:**
```js
import { addFilter } from '@wordpress/hooks';

addFilter( 'capitola.postTypeCats', 'santacruzdivers/post-type-cats', ( cats ) => {
	return {
		...cats,
		course: 'course_cat',
		trip: 'trip_cat',
		staff: 'department',
		tribe_events: 'tribe_events_cat',
	};
} );
```

### capitola.templatePostType
Used by the templatePostType() js function, this filter allows you to determine what post type an FSE template editor is associated with.

**Applied in:**
- src/scripts/modules/template-post-type.js

**Parameters:**
- defaultPostType : defaults to 'post'.
- templateSlug: the post type name you are checking against from the current template name.

**Example:**
```js
import { addFilter } from '@wordpress/hooks';

addFilter(
	'capitola.templatePostType',
	'santacruzdivers/custom-post-types',
	( defaultPostType, templateSlug ) => {
		if ( templateSlug === 'class' ) {
			return 'course';
		} else if ( templateSlug === 'trip' ) {
			return 'trip';
		} else if ( templateSlug === 'staff' ) {
			return 'staff';
		} else if ( templateSlug === 'tribe_events' ) {
			return 'tribe_events';
		} else if ( templateSlug === 'product' ) {
			return 'product';
		} else if ( templateSlug === 'course' ) {
			return 'course';
		}
		return defaultPostType;
	}
);
```
