# ImageSelect

A WordPress Gutenberg editor control component for use in the block sidebar. It is inspiredd by the WP Featured Image selector.

![ImageSelect Screenshot](../_screenshots/ImageSelect-1.png)

## Properties

| Property   | Type             | Required  | Description |
|------------|------------------|-----------|-------------|
| `label`    | `string`         | Yes       | Label for the control |
| `value`    | `number\|object` | Yes       | Current image ID (number) or image object (object) |
| `onChange` | `function`       | Yes       | Callback function when an image is selected or changed |

## Setting the value prop

You can assign either the media ID or an object as the value. Assigning an object will improve performance because it reduces REST API calls for the image source url. When using an object as the value, the object must include at least an id and source_url property. For example,

```
{
	id: 456,
	source_url: 'url to image',
}
```

## Button States

The interface adapts based on the current state:

- **No image selected**: Shows "Choose an image" button
- **Image selected**: Shows image preview with "Replace" and "Remove" buttons
- **Loading**: Shows spinner while image data is being fetched

## Related Components

- [WordPress MediaUpload Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/media-upload)
- [WordPress MediaUploadCheck Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/media-upload-check)

## Usage

### Import

```jsx
import { ImageSelect } from '../../editor-controls';
```

### Value as object, saved value as object

```jsx
<ImageSelect
	label="Featured Image"
	value={ attributes.image }
	onChange={ ( value ) => {
		setAttributes( {
			image: { id: value.id, source_url: value.url }
		} );
	} }
/>
```

### Value as id, saved value as object

```jsx
<ImageSelect
	label="Featured Image"
	value={ attributes.image.id }
	onChange={ ( value ) => {
		setAttributes( {
			image: { id: value.id, source_url: value.url }
		} );
	} }
/>
```

### Value as id, saved value as id

```jsx
<ImageSelect
	label="Featured Image"
	value={ attributes.image }
	onChange={ ( value ) => {
		setAttributes( {
			image: value.id
		} );
	} }
/>
```
