# AddGrandChildButton

A WordPress Gutenberg editor toolbar control for inserting a default block into a specific nested child block.

This component finds a child block by `targetBlockName` within the current block, reads that target block's `defaultBlock` setting, and inserts a new block into that nested target.

![AddChildButton Screenshot](./_screenshots/AddChildButton-1.png)

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `clientId` | `string` | Yes | | Block editor client ID for the top-level parent block |
| `targetBlockName` | `string` | Yes | | Block name of the nested child container to insert into |
| `label` | `string` | No | `"Add Item"` | Toolbar button text |

## Behavior

- Finds the first inner block matching `targetBlockName`.
- Uses that target block's `getBlockListSettings( targetClientId ).defaultBlock` value.
- Supports both string and object `defaultBlock` values.
- Disables the button if target block cannot be found or no default block name is available.

## Usage

### Import

```jsx
import { AddGrandChildButton } from '../../editor-controls';
```

### Basic Example

```jsx
<AddGrandChildButton
	clientId={ clientId }
	targetBlockName="capitola/tabbed-contents-panel"
	label="Add Panel Item"
/>
```

## Notes

- This control assumes the target nested block defines `defaultBlock`.
- Inserted blocks are created without custom attributes.
