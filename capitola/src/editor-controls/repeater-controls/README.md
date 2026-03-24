# RepeaterControls

A WordPress Gutenberg editor control component that provides a toolbar interface for managing repeater field rows. This component renders a set of action buttons for adding, removing, moving, and managing repeater items directly in the editor interface.

![RepeaterControls Screenshot](../_screenshots/RepeaterControls-1.png)

## Properties

| Property        | Type       | Required | Default | Description |
|-----------------|------------|----------|---------|-------------|
| `props`         | `object`   | Yes      |         | Block props containing `attributes` and `setAttributes` |
| `attribute`     | `string`   | Yes      |         | The attribute name for the repeater field |
| `index`         | `number`   | Yes      |         | The current row index |
| `newValues`     | any        | Yes      |         | Default values for new rows |
| `vertical`      | `boolean`  | No       | `false` | Whether to use vertical icons for the move buttons (up/down vs left/right) |
| `onImageChange` | `function` | No       | `false` | Callback when an image is selected |
| `imageValue`    | `integer`  | No       | `false` | Current image ID if the `onImageChange` prop is set |
| `onAddAfter`    | `function` | No       | `false` | Callback when a row is added after the current one |
| `allowNull`     | `boolean`  | No       | `false` | Whether to allow deleting the last remaining row |
| `style`         | `object`   | No       |         | Custom styles for the controls container |

## Control Buttons

The component renders several action buttons based on the current context:

### Delete Button

- **Condition**: Shown when `allowNull` is true OR there's more than one row
- **Action**: Removes the current row from the repeater array
- **Icon**: Trash icon
- **CSS Class**: `capitola-repeater-controls__button --delete`

### Move Buttons

- **Move Before**: Moves current row up/left (shown when not first row)
- **Move After**: Moves current row down/right (shown when not last row)
- **Icons**: Directional arrows (up/down for vertical, left/right for horizontal)

### Add Buttons

- **Add Before**: Inserts a new row before the current one
- **Add After**: Inserts a new row after the current one

### Image Button

- **Condition**: Shown when `onImageChange` prop is provided
- **Action**: Opens WordPress media library for image selection

## Usage Examples

### Import

```jsx
import { RepeaterControls } from '../../editor-controls';
```

### Basic Implementation

```jsx
{ exampleItems.map( (item, index ) => {
	return (
		<div key={ index } className="item">
			<RichText
				className="item-title"
				value={ attributes.exampleItems[index].title }
				placeholder="Title..."
				allowedFormats={ [] }
				onChange={ ( value ) => {
					const newItems = [ ...exampleItems ];
					newItems[ index ] = {
						...newItems[ index ],
						title: value,
					};
					setAttributes( {
						exampleItems: newItems,
					} );
				} }
			/>
			<RichText
				className="item-desc"
				value={ attributes.exampleItems[index].desc }
				label="Description"
				allowedFormats={ [] }
				onChange={ ( value ) => {
					const newItems = [ ...exampleItems ];
					newItems[ index ] = {
						...newItems[ index ],
						desc: value,
					};
					setAttributes( {
						exampleItems: newItems,
					} );
				} }
			/>
			<RepeaterControls
				props={ props }
				attribute="exampleItems"
				index={ index }
				newValues={ { title: '', desc: '' } }
			/>
		</div>
	)
} ) }
```

### With Image Support

```jsx
<RepeaterControls
	props={ props }
	attribute="gallery"
	index={ index }
	newValues={ { image: null, caption: '' } }
	onImageChange={ ( value ) => {
		const newItems = [ ...exampleItems ];
		newItems[index] = {
			...newItems[index],
			image: { id: value.id, source_url: value.url }
		};
		setAttributes( { exampleItems: newItems } );
	} }
	imageValue={ exampleItems[index].image?.id }
/>
```

### With Custom Callback

```jsx
<RepeaterControls
	props={ props }
	attribute="items"
	index={ index }
	newValues={ { title: '', content: "" } }
	onAddAfter={ () => {
		// Custom logic after adding a row
		console.log('New row added after index:', index);
	} }
/>
```

## Related Components

- [WordPress Button Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/button)
- [WordPress Icon Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/icon)
- [WordPress MediaUpload Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/media-upload)

## Change Callback Examples

Saving array items can be tricky as memory leaks between blocks can occur if not done correctly. These are examples of updating attributes inside a map function.

### Simple Array

If the attribute is an array of single values:

```jsx
( value ) => {
	const newItems = [ ...exampleItems ];
	newItems[index] = value;
	setAttributes( { exampleItems: newItems } );
}
```

### Array of Objects

If the attribute is an array of objects, and you are saving a value inside an object, for example `'desc'` :

```jsx
( value ) => {
	const newItems = [ ...exampleItems ];
	newItems[ index ] = {
		...newItems[ index ],
		desc: value,
	};
	setAttributes( { exampleItems: newItems } );
}
```
