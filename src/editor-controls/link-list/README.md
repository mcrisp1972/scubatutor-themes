# LinkList

A WordPress Gutenberg editor control component that provides an interface for managing a list of links with custom titles. This component allows users to add, edit, reorder, and delete multiple links through an intuitive popover-based interface.

![LinkList Screenshot](../_screenshots/LinkList-1.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Array` | - | **Required.** Array of link objects with structure `{ title: string, link: object }` |
| `onChange` | `Function` | - | **Required.** Callback function called when the link list changes |
| `linkClass` | `string` | - | Optional CSS class to apply to each link item button |
| `disableAdd` | `boolean` | `false` | Whether to hide the "Add Link" button |

## Link Object Structure

Each link in the `value` array should have the following structure:

```jsx
{
  title: '', // Custom display text for the link
  link: {
    url: '',           // The URL
    title: '',         // Link title from WordPress (if internal)
    opensInNewTab: false, // Whether to open in new tab
    // Additional WordPress LinkControl properties...
  }
}
```

## Features

### Link Display
- Shows link title (custom `title` or falls back to `link.title`)
- Displays "Link..." as placeholder for incomplete links
- Incomplete links appear with reduced opacity (0.62)

### Edit Link Popover
Each link item opens a popover with:
- **Link Text**: Custom text field for display title
- **Link Control**: WordPress LinkControl for URL selection with:
  - Search functionality for internal content
  - "New tab" setting
  - Remove link option
- **Move Up/Down**: Reorder links in the list
- **Delete**: Remove the link with confirmation dialog
- **Close**: Close the popover

### Add Link Popover
When clicking "+ Add Link":
- Same interface as edit popover
- "Add Link" button enabled only when link has a title and URL
- Cancel button to abort adding

## Usage Examples

### Import
```jsx
import { LinkList } from '../../editor-controls';
```

### Basic Implementation

```jsx
import { LinkList } from '../../editor-controls';

<LinkList
    value={ attributes.footerLinks }
    onChange={ ( newLinks ) => {
        setAttributes( { footerLinks: newLinks } );
    } }
    linkClass="custom-link-item"
/>
```

### With Add Link Disabled

```jsx
<LinkList
    value={ attributes.socialLinks }
    onChange={ ( newLinks ) => {
        setAttributes( { socialLinks: newLinks } );
    } }
    linkClass="custom-link-item"
    disableAdd={ attributes.socialLinks.length > 6 }
/>
```

### Block.json Attribute Definition

```json
{
  "attributes": {
    "linkList": {
      "type": "array",
      "default": []
    }
  }
}
```

## Validation Helper

The component uses an internal `isCompleteLink` function to validate links. A link is considered complete when:
- It has a title (either custom `title` or `link.title` from WordPress)
- AND it has a `link.url`

You can implement a similar validation in your render or save functions:

```jsx
function isCompleteLink( linkItem ) {
  return ( !! linkItem.title || !! linkItem.link.title ) && !! linkItem.link.url;
}

// Filter out incomplete links before rendering
const validLinks = linkList.filter( isCompleteLink );
```

## Link Reordering

Links can be reordered using the up/down arrow buttons:
- Up arrow moves the link one position earlier in the array
- Down arrow moves the link one position later in the array
- First link doesn't show up arrow
- Last link doesn't show down arrow

## Link Deletion

The delete button:
- Shows a confirmation dialog before removing
- Completely removes the link from the array
- Cannot be undone (uses WordPress undo/redo history)

## Styling Notes

Custom styling can be applied via the `linkClass` prop to the clickable link items.

