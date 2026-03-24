# TermCheckboxes

A WordPress Gutenberg editor control component for selecting multiple taxonomy terms via checkboxes. This control fetches terms from a specified taxonomy and displays them as individual checkbox controls, allowing users to select multiple terms at once.

![TermCheckboxes Screenshot](../_screenshots/TermCheckboxes-1.png)

## Properties

| Property   | Type       | Required | Default  | Description |
|------------|------------|----------|----------|-------------|
| `label`    | `string`   | Yes      |          | Label text for the control |
| `value`    | `array`    | Yes      |          | Array of selected term IDs |
| `onChange` | `function` | Yes      |          | Callback function when the selection changes |
| `taxonomy` | `string`   | Yes      |          | WordPress taxonomy to fetch terms from (e.g., `'category'`, `'post_tag'`, `'product_cat'`) |
| `orderBy`  | `string`   | No       | `'name'` | Field to order terms by. Defaults to `'name'` with `'asc'` order |

## Value Structure

The `value` prop should be an array of term IDs:

```javascript
[123, 456, 789] // Array of term IDs
```

## Usage

### Import

```jsx
import { TermCheckboxes } from '../../editor-controls';
```

### Basic Term Selection

```jsx
<TermCheckboxes
	label="Select Categories"
	value={ attributes.selectedCategories }
	onChange={ ( value ) => {
		setAttributes( { selectedCategories: value } );
	} }
	taxonomy="category"
/>
```

### With Custom Ordering

```jsx
<TermCheckboxes
	label="Select Product Categories"
	value={ attributes.selectedProductCategories }
	onChange={ ( value ) => {
		setAttributes( { selectedProductCategories: value } );
	} }
	taxonomy="product_cat"
	orderBy="count"
/>
```
