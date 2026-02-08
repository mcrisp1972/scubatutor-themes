# TagSelect

A WordPress Gutenberg editor control component for selecting HTML tag elements. This control wraps the WordPress SelectControl component to provide a dropdown for choosing semantic HTML tags, commonly used for typography and heading elements in block editor controls.

![TagSelect Screenshot](../_screenshots/TagSelect-1.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Label text for the control |
| `value` | `string` | - | **Required.** Current selected tag value (e.g., 'div', 'h1', 'h2') |
| `onChange` | `Function` | - | **Required.** Callback function when the tag value changes |

## Available Options

The control provides the following HTML tag options:

- **Div** (`div`) - Generic container element
- **H1** (`h1`) - Main heading (level 1)
- **H2** (`h2`) - Subheading (level 2)
- **H3** (`h3`) - Subheading (level 3)
- **H4** (`h4`) - Subheading (level 4)
- **H5** (`h5`) - Subheading (level 5)
- **H6** (`h6`) - Subheading (level 6)

## Usage

### Import
```jsx
import { TagSelect } from '../../editor-controls';
```

### Basic Tag Selection

```jsx
<TagSelect
    label="Select Tag"
    value={ attributes.tag }
    onChange={ ( value ) => {
        setAttributes( { tag: value } );
    } }
/>
```
