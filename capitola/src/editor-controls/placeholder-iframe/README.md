# PlaceholderIframe

A WordPress Gutenberg editor control component for displaying a placeholder iframe icon. This component renders an SVG icon that represents an iframe placeholder, commonly used in block editor templates to indicate where an iframe will be embedded.

![PlaceholderIframe Screenshot](../_screenshots/PlaceholderIframe-1.png)

## Properties

| Propery     | Type     | Required | Description |
|-------------|----------|----------|-------------|
| `style`     | `object` | No       | CSS styles object to apply to the placeholder icon |
| `className` | `string` | No       | Additional className to add to the placeholder icon |

## Default Styles

The component applies the following default styles that can be overridden:

```javascript
{
	objectFit: 'contain',
	opacity: '0.5',
	backgroundColor: '#CCCCCC'
}
```

## Features

- **SVG Icon**: Displays a code/iframe icon using an inline SVG data URI
- **Customizable Styling**: Accepts custom styles that merge with defaults

## Usage

### Import

```jsx
import { PlaceholderIframe } from '../../editor-controls';
```

### Basic Usage

```jsx
<PlaceholderIframe />
```

### With Custom Styles

```jsx
<PlaceholderIframe
	style={ {
		opacity: '0.3',
		backgroundColor: '#F0F0F0',
		width: '48px',
		height: '48px'
	} }
/>
```
