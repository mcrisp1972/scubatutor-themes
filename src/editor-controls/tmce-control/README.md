# TMCEControl

A WordPress Gutenberg editor control component that provides a TinyMCE (Tiny MCE) rich text editor interface within the block sidebar. This control allows users to create and edit rich text content with formatting options like bold, italic, lists, and links using the classic WordPress editor experience.

![TMCEControl Screenshot](../_screenshots/TMCEControl-1.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Label text for the control |
| `value` | `string` | - | **Required.** HTML content of the editor |
| `onChange` | `Function` | - | **Required.** Callback function when the content changes |

## Value Structure

The `value` prop should be HTML content:

```javascript
"<p>This is <strong>rich text</strong> content with <em>formatting</em>.</p>"
```

## Features

- **Rich Text Editing**: Full TinyMCE editor with formatting toolbar
- **Inline Mode**: Editor runs in inline mode for better integration
- **Debounced Updates**: Content changes are debounced (250ms) for performance
- **Keyboard Shortcuts**: Supports standard TinyMCE keyboard shortcuts
- **Undo/Redo**: Built-in undo/redo functionality
- **Link Support**: Add and edit links with WordPress link dialog
- **List Support**: Create ordered and unordered lists
- **Paste Handling**: Smart paste functionality with formatting preservation
- **Focus Management**: Proper focus handling and scroll position preservation
- **Toolbar Integration**: Fixed toolbar container for consistent UI

## Usage

### Import
```jsx
import { TMCEControl } from '../../editor-controls';
```

### Basic Rich Text Editing

```jsx
<TMCEControl
    label="Content"
    value={ attributes.content }
    onChange={ ( value ) => {
        setAttributes( { content: value } );
    } }
/>
```

## Toolbar Features

The editor includes the following toolbar buttons:
- **Bold** (`Ctrl+B`)
- **Italic** (`Ctrl+I`)
- **Bulleted List**
- **Numbered List**
- **Link** (`Ctrl+K`)
- **Paste as Text**
- **Remove Formatting**
