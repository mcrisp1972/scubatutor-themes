# PlaceholderVideo

A WordPress Gutenberg editor control component for displaying a placeholder video icon. This component renders an SVG icon that represents a video placeholder, commonly used in block editor templates to indicate where a video will be displayed.

![PlaceholderVideo Screenshot](../_screenshots/PlaceholderVideo-1.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hasBgColor` | `boolean` | `true` | Whether to apply a background color to the placeholder |
| `style` | `object` | `{}` | CSS styles object to apply to the placeholder icon |
| `className` | `string` | `` | Additional className to add to the placeholder icon |

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
import { PlaceholderVideo } from '../../editor-controls';
```

### Basic Usage

```jsx
<PlaceholderVideo />
```

### Without Background Color

```jsx
<PlaceholderVideo hasBgColor={false} />
```

### With Custom Styles

```jsx
<PlaceholderVideo
  hasBgColor={true}
  style={{
    opacity: '0.3',
    backgroundColor: '#F0F0F0',
    width: '48px',
    height: '48px'
  }}
/>
```
