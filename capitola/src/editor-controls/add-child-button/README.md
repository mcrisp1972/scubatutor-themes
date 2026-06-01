# AddChildButton

A WordPress Gutenberg editor toolbar control for inserting a default child block into the current block.

This component reads the current block list settings for the provided `clientId`, resolves `defaultBlock`, and inserts one new inner block when clicked.

![AddChildButton Screenshot](./_screenshots/AddChildButton-1.png)

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `clientId` | `string` | Yes | | Block editor client ID for the parent block that receives the new inner block |
| `label` | `string` | No | `"Add Item"` | Toolbar button text |

## Behavior

- Uses `getBlockListSettings( clientId ).defaultBlock` to resolve which block to insert.
- Supports both string and object `defaultBlock` values.
- Disables the button if `clientId` is missing or no default block name is available.

## Usage

### Import

```jsx
import { AddChildButton } from '../../editor-controls';
```

### Basic Example

```jsx
<AddChildButton
	clientId={ clientId }
	label="Add Accordion Item"
/>
```

## Notes

- This control assumes your inner blocks configuration defines `defaultBlock`.
- Inserted blocks are created without custom attributes.
