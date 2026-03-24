# ImageSelectButton

A WordPress Gutenberg editor control component that provides a button interface for selecting images from the WordPress media library. Built on top of the WordPress `MediaUpload` component with specialized functionality for single image selection and gallery management.

![ImageSelectButton Screenshot](../_screenshots/ImageSelectButton-1.png)

## Properties

| Property       | Type              | Required | Default     | Description |
|----------------|-------------------|----------|-------------|-------------|
| `value`        | `number\|object`  | Yes      |             | Current image ID (number) or gallery object (object) |
| `onSelect`     | `function`        | Yes      |             | Callback function when an image is selected |
| `allowedTypes` | `array`           | No       | `['image']` | Array of allowed media types for selection |
| `label`        | `string\|boolean` | No       | `false`     | Custom label for the button. If false, uses dynamic labels based on value state |
| `flexWrap`     | `boolean`         | No       | `false`     | Wraps the button in an absolute positioned flex container for layout purposes. Use this when necessary to center-align the button. |

## Button Labels

The button text is dynamically determined based on the current state:

- **No image selected**: "Choose Image"
- **Single image selected**: "Change Image"
- **Gallery selected**: "Edit Images"
- **Custom label provided**: Uses the `label` prop value

## Gallery vs Single Image

The component automatically detects whether you're working with a single image or a gallery based on the `value` prop type:

- **Single Image**: `value` is a number (image ID)
- **Gallery**: `value` is an object (gallery data)

When `value` is an object, the component enables:
- `multiple="add"` - Allows adding multiple images
- `gallery={true}` - Enables gallery mode in the media library

## Related Components

- [WordPress MediaUpload Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/media-upload)
- [WordPress MediaUploadCheck Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/media-upload-check)

## Usage

### Import

```jsx
import { ImageSelectButton } from '../../editor-controls';
```

### Single Image Selection

```jsx
<ImageSelectButton
	value={ attributes.imageId }
	onSelect={ ( value ) => {
		setAttributes( {
			image: { id: value.id, source_url: value.url }
		} );
	} }
	label="Select Featured Image"
/>
```

### Gallery Selection

```jsx
<ImageSelectButton
	value={ attributes.images.map( ( image ) => image.id ) }
	onSelect={ ( values ) => {
		setAttributes( {
			images: values.map( ( image ) => {
				return { id: image.id, source_url: image.url };
			} ),
		} );
	} }
	label="Manage Gallery"
/>
```

### Custom Allowed Types

```jsx
<ImageSelectButton
	...
	allowedTypes={ ['image', 'video'] }
	label="Select Media"
/>
```
