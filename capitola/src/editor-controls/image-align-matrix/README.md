# ImageAlignMatrix

A WordPress Gutenberg editor control component for selecting image alignment using a matrix-style interface. For use in block editor sidebars, it provides a visual grid where users can click to select alignment positions for images.

![ImageAlignMatrix Screenshot](../_screenshots/ImageAlignMatrix-1.png)

## Properties

| Property   | Type       | Required | Description |
|------------|------------|----------|-------------|
| `value`    | `string`   | Yes      | Current selected alignment value |
| `onChange` | `function` | Yes      | Callback function when the alignment value changes |
| `label`    | `string`   | No       | Label for the control |

## Value Structure

The `value` prop should be a string representing the alignment position:

```javascript
"center center"
```

## Alignment Values

The control accepts standard CSS alignment values:

```javascript
// Common alignment values
"top left"      // Top-left corner
"top center"    // Top center
"top right"     // Top-right corner
"center left"   // Center left
"center center" // Center (default)
"center right"  // Center right
"bottom left"   // Bottom-left corner
"bottom center" // Bottom center
"bottom right" // Bottom-right corner
```

## Control States

The interface adapts based on the current state:

- **No alignment selected**: Shows default center position
- **Alignment selected**: Highlights the selected position in the matrix
- **Matrix interaction**: Visual feedback when hovering over alignment options

## Features

- **Visual Matrix Interface**: Provides an intuitive grid-based alignment selector
- **WordPress Integration**: Uses WordPress AlignmentMatrixControl component
- **Accessible**: Built-in accessibility support through WordPress components
- **Consistent Styling**: Matches WordPress editor design patterns
- **Real-time Preview**: Immediate visual feedback of alignment changes

## Related Components

- [WordPress AlignmentMatrixControl Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/alignment-matrix-control)

## Usage

### Import

```jsx
import { ImageAlignMatrix } from '../../editor-controls';
```

### Basic Image Alignment Control

```jsx
<ImageAlignMatrix
	label="Image Alignment"
	value={ attributes.imageAlignment }
	onChange={ ( value ) => {
		setAttributes( { imageAlignment: value } );
	} }
/>
```
