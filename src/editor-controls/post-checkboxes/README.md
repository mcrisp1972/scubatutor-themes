# PostCheckboxes

A WordPress Gutenberg editor control component for selecting multiple posts via checkboxes. This control fetches posts from a specified post type and displays them as individual checkbox controls, allowing users to select multiple posts at once.

![PostCheckboxes Screenshot](../_screenshots/PostCheckboxes-1.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Label text for the control |
| `value` | `array` | - | **Required.** Array of selected post IDs |
| `onChange` | `Function` | - | **Required.** Callback function when the selection changes |
| `postType` | `string` | - | **Required.** WordPress post type to fetch posts from (e.g., 'post', 'page', 'product') |
| `orderBy` | `string` | `'title'` | Field to order posts by. Defaults to 'title' with ascending order |

## Value Structure

The `value` prop should be an array of post IDs:

```javascript
[123, 456, 789] // Array of post IDs
```

## Features

- **Multi-Selection**: Select multiple posts using individual checkboxes
- **Dynamic Loading**: Automatically fetches posts from specified post type
- **Flexible Ordering**: Order posts by different fields (defaults to title)
- **Efficient Queries**: Only fetches post ID and title for performance
- **Real-time Updates**: Checkbox states update immediately when selections change

## Usage

### Import
```jsx
import { PostCheckboxes } from '../../editor-controls';
```

### Basic Post Selection

```jsx
<PostCheckboxes
    label="Select Posts"
    value={ attributes.selectedPosts }
    onChange={ ( value ) => {
        setAttributes( { selectedPosts: value } );
    } }
    postType="post"
/>
```

### With Custom Ordering

```jsx
<PostCheckboxes
    label="Select Products"
    value={ attributes.selectedProducts }
    onChange={ ( value ) => {
        setAttributes( { selectedProducts: value } );
    } }
    postType="product"
    orderBy="date"
/>
```
