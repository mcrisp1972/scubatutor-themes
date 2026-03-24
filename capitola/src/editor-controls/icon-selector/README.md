# IconSelector

A WordPress Gutenberg editor control component for selecting icons from a predefined list. For use in block editor sidebars, it displays a dropdown with icon options that show both the icon name and a visual preview of the icon.

![IconSelector Screenshot](../_screenshots/IconSelector-1.png)

## Properties

| Property   | Type       | Required | Description |
|------------|------------|----------|-------------|
| `value`    | `string`   | Yes      | Current selected icon slug |
| `onChange` | `function` | Yes      | Callback function when the icon value changes |
| `label`    | `string`   | No       | Label for the control |
| `icons`    | `array`    | Yes      | Array of icon objects with name and slug properties |
| `iconPath` | `string`   | Yes      | Path to the icon directory relative to the theme root |

## Value Structure

The `value` prop should be a string representing the icon slug:

```javascript
"arrow-right"
```

## Icon Data Structure

The `icons` prop should be an array of objects with the following structure:

```javascript
[
	{
		name: "Arrow Right",
		slug: "arrow-right"
	},
	{
		name: "Calendar",
		slug: "calendar"
	}
]
```

## Control States

The interface adapts based on the current state:

- **No icon selected**: Shows "None" option at the top of the dropdown
- **Icon selected**: Shows the selected icon with visual preview and name
- **Dropdown open**: Displays all available icons with visual previews

## Features

- **Visual Icon Preview**: Icons are displayed as background images in the dropdown options
- **Theme Integration**: Automatically constructs icon URLs using the current theme's stylesheet
- **None Option**: Always includes a "None" option for clearing the selection
- **Custom Styling**: Icons are displayed with consistent sizing and positioning
- **Accessible**: Uses WordPress CustomSelectControl for proper accessibility support
- **Dynamic Options**: Icons are mapped from the provided array to dropdown options

## Related Components

- [WordPress CustomSelectControl Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/custom-select-control)

## Usage

### Import

```jsx
import { IconSelector } from '../../editor-controls';
```

### Basic Icon Selector Control

```jsx
const iconOptions = [
	{ name: 'Arrow Right', slug: 'arrow-right' },
	{ name: 'Calendar', slug: 'calendar' },
	{ name: 'User', slug: 'user' }
];

<IconSelector
	label="Select Icon"
	value={ attributes.selectedIcon }
	onChange={ ( value ) => {
		setAttributes( { selectedIcon: value } );
	} }
	icons={ iconOptions }
	iconPath="assets/svgs/icons"
/>
```

### Icon Selector with Dynamic Icon List

```jsx
const availableIcons = getAvailableIcons(); // Your function to get icons

<IconSelector
	label="Button Icon"
	value={ attributes.buttonIcon }
	onChange={ ( value ) => {
		setAttributes( { buttonIcon: value } );
	} }
	icons={ availableIcons }
	iconPath="assets/svgs/utility"
/>
```
