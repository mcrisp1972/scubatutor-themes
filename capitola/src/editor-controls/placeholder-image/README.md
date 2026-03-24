# PlaceholderImage

A WordPress Gutenberg editor control component for displaying a placeholder image icon. This component renders an SVG icon that represents an image placeholder, commonly used in block editor templates to indicate where an image will be displayed.

![PlaceholderImage Screenshot](../_screenshots/PlaceholderImage-1.png)

## Properties

| Property     | Type      | Required | Default | Description |
|--------------|-----------|----------|---------|-------------|
| `hasBgColor` | `boolean` | No       | `true`  | Whether to apply a background color to the placeholder |
| `style`      | `object`  | No       |         | CSS styles object to apply to the placeholder icon |
| `className`  | `string`  | No       |         | Additional className to add to the placeholder icon |

## Default Styles

The component applies the following default styles that can be overridden:

```javascript
{
	objectFit: 'contain',
	opacity: '0.5',
	backgroundColor: hasBgColor ? '#CCCCCC' : 'none'
}
```

## Usage

### Import

```jsx
import { PlaceholderImage } from '../../editor-controls';
```

### Basic Usage

```jsx
<PlaceholderImage />
```

### Without Background Color

```jsx
<PlaceholderImage hasBgColor={false} />
```

### With Custom Styles

```jsx
<PlaceholderImage
	hasBgColor={ true }
	style={ {
		opacity: '0.3',
		backgroundColor: '#F0F0F0',
		width: '48px',
		height: '48px'
	} }
/>
```
