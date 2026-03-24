# OverlayOpacitySlider

A WordPress Gutenberg editor control component for adjusting image overlay opacity using a range slider. For use in block editor sidebars, it provides a visual slider interface where users can adjust the opacity of image overlays with precise control.

![OverlayOpacitySlider Screenshot](../_screenshots/OverlayOpacitySlider-1.png)

## Properties

| Property   | Type       | Required | Default                   | Description |
|------------|------------|----------|---------------------------|-------------|
| `value`    | `number`   | Yes      |                           | Current opacity value (0.0 to 0.5) |
| `onChange` | `function` | Yes      |                           | Callback function when the opacity value changes |
| `label`    | `string`   | No       | `'Image Overlay Opacity'` | Label for the control |

## Value Structure

The `value` prop should be a number representing the overlay opacity:

```javascript
0.3  // 30% opacity
```

## Opacity Range

The control accepts opacity values within a specific range:

```javascript
// Valid opacity values
0.0  // Completely transparent (no overlay)
0.1  // 10% opacity
0.2  // 20% opacity
0.3  // 30% opacity
0.4  // 40% opacity
0.5  // 50% opacity (maximum recommended)
```

## Control Configuration

The slider is configured with specific parameters:

- **Minimum Value**: 0.0 (completely transparent)
- **Maximum Value**: 0.5 (50% opacity)
- **Step Size**: 0.1 (10% increments)
- **Input Field**: Disabled (slider only)
- **Tooltip**: Enabled for precise value display
- **Help Text**: Provides guidance on recommended values

## Related Components

- [WordPress RangeControl Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/range-control)

## Usage

### Import

```jsx
import { OverlayOpacitySlider } from '../../editor-controls';
```

### Basic Overlay Opacity Control

```jsx
<OverlayOpacitySlider
	label="Image Overlay Opacity"
	value={ attributes.overlayOpacity }
	onChange={ ( value ) => {
		setAttributes( { overlayOpacity: value } );
	} }
/>
```
