# TruncateControl

A WordPress Gutenberg editor control component for setting the maximum number of excerpt lines using a range slider. For use in block editor sidebars, it provides a visual slider interface where users can control text truncation with precise line count selection.

![TruncateControl Screenshot](../_screenshots/TruncateControl-1.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | **Required.** Current maximum excerpt lines value (1 to 10) |
| `onChange` | `Function` | - | **Required.** Callback function when the line count value changes |
| `label` | `string` | `'Maximum Excerpt Lines'` | Label for the control |

## Value Structure

The `value` prop should be a number representing the maximum number of excerpt lines:

```javascript
3  // Maximum 3 lines
```

## Line Count Range

The control accepts line count values within a specific range:

```javascript
// Valid line count values
1   // Single line excerpt
2   // Two line excerpt
3   // Three line excerpt
4   // Four line excerpt
5   // Five line excerpt
6   // Six line excerpt
7   // Seven line excerpt
8   // Eight line excerpt
9   // Nine line excerpt
10  // Ten line excerpt (maximum)
```

## Control Configuration

The slider is configured with specific parameters:

- **Minimum Value**: 1 (single line)
- **Maximum Value**: 10 (ten lines)
- **Step Size**: 1 (whole line increments)
- **Input Field**: Disabled (slider only)
- **Tooltip**: Enabled for precise value display
- **Help Text**: Provides guidance on recommended line counts

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
