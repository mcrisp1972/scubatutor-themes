# ImageFocalPoint

A Gutenberg editor control component for selecting the focal point of an image. For use in block editor sidebars, it provides a visual interface where users can click to set the most important area of an image.

The best use-case for this control is when a block defines an aspect ratio for displayed images and uses the css `object-fit: cover` property. You can use the `ImageFocalPoint` component to define the `object-position` css property to set the cropped position of the image.

This is a wrapper of the `FocalPointPicker` Wordpress component, see the [reference guide](https://developer.wordpress.org/block-editor/reference-guides/components/focal-point-picker/) for more information.

![ImageFocalPoint Screenshot](../_screenshots/ImageFocalPoint-1.png)

## Properties

| Property   | Type             | Required | Default               | Description |
|------------|------------------|----------|-----------------------|-------------|
| `value`    | `string`         | Yes      |                       | Current selected focal point value (e.g., "50% 50%") |
| `image`    | `number\|string` | Yes      |                       | Image to display in the control. Can be a url to the image or an attachment ID |
| `onChange` | `function`       | Yes      |                       | Callback function when the focal point value changes |
| `label`    | `string`         | No       | `'Image focal point'` | Label for the control |
| `help`     | `string`         | No       |                       | Help text for the control |

## Value Structure

The `value` prop should be a string representing the focal point as percentages:

```javascript
"50% 50%"
```

## Focal Point Values

The control accepts any valid percentage values for x and y:

```javascript
// Example focal point values
"0% 0%"     // Top-left corner
"50% 50%"   // Center (default)
"100% 100%" // Bottom-right corner
"25% 75%"   // Custom position
```

## Control States

The interface adapts based on the current state:

- **Focal point selected**: Highlights the selected position in the picker
- **Picker interaction**: Visual feedback when hovering or dragging the focal point

## Features

- **Visual Focal Point Picker**: Provides an intuitive interface for selecting the image's main focus
- **WordPress Integration**: Uses WordPress FocalPointPicker and BaseCopntrol components
- **Automatically Converts Values**: The FocalPointPicker normally returns an object of `x` and `y` coordinates in decimal format. The `ImageFocalPoint` selector converts this object to a string containing a pair of percentages that can be directly inserted into inline CSS.
- **Accessible**: Built-in accessibility support through WordPress components
- **Consistent Styling**: Matches WordPress editor design patterns
- **Real-time Preview**: Immediate visual feedback of focal point changes

## Related Components

- [WordPress FocalPointPicker Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/focal-point-picker)

## Usage

### Import

```jsx
import { ImageFocalPoint } from '../../editor-controls';
```

### Basic Focal Point Control

```jsx
<ImageFocalPoint
	value={ attributes.imageFocalPoint }
	image={ attributes.image.id }
	label="Image Focal Point"
	onChange={ ( value ) => {
		setAttributes( { imageFocalPoint: value } );
	} }
/>
```
### Using the Attribute in HTML

```php
<img src="" alt="" style="object-position: <?php echo $attributes['']; ?>;">
