# TruncateControl

A WordPress Gutenberg editor control component for setting the maximum number of excerpt lines using a range slider. For use in block editor sidebars, it provides a visual slider interface where users can control text truncation with precise line count selection.

![TruncateControl Screenshot](../_screenshots/TruncateControl-1.png)

## Props

| Prop       | Type       | Required | Default                   | Description |
|------------|------------|----------|---------------------------|-------------|
| `value`    | `number`   | Yes      |                           | Current maximum excerpt lines value (1 to 10) |
| `onChange` | `function` | Yes      |                           | Callback function when the line count value changes |
| `label`    | `string`   | No       | `'Maximum Excerpt Lines'` | Label for the control |

## Related Components

- [WordPress RangeControl Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/range-control)

## Usage

### Import

```jsx
import { TruncateControl } from '../../editor-controls';
```

### Basic Excerpt Line Control

```jsx
<TruncateControl
	label="Maximum Excerpt Lines"
	value={ attributes.maxLines }
	onChange={ ( value ) => {
		setAttributes( { maxLines: value } );
	} }
/>
```
