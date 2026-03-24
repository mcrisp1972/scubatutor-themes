# VideoSelect

A WordPress Gutenberg editor control component for selecting video files from the WordPress media library. This control displays video metadata including title, file size, length, and URL.

![VideoSelect Screenshot](../_screenshots/VideoSelect-1.png)

## Props

| Prop       | Type             | Required | Description |
|------------|------------------|----------|-------------|
| `label`    | `string`         | Yes      | Label for the control |
| `value`    | `number\|object` | Yes      | Current video ID (`number`) or video object (`object`) |
| `onChange` | `function`       | Yes      | Callback function when a video is selected or changed |

## Setting the value prop

You can assign either the media ID or an object as the value. Assigning an object will improve performance because it reduces REST API calls for the video source url. When using an object as the value, the object must include at least an id and url property. For example,

```
{
	id: 456,
	url: 'url to video',
}
```

## Button States

The interface adapts based on the current state:

- **No video selected**: Shows "Choose a video" button
- **Video selected**: Shows video metadata (title, size, length, URL) with "Replace" and "Remove" buttons
- **Loading**: Shows spinner while video data is being fetched

## Video Information Displayed

When a video is selected, the control displays:
- **Title**: The video's title in WordPress
- **Size**: File size formatted in human-readable format (KB, MB, GB, etc.)
- **Length**: Video duration in formatted time
- **URL**: Full URL to the video file

## Related Components

- [WordPress MediaUpload Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/media-upload)
- [WordPress MediaUploadCheck Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/media-upload-check)

## Usage

### Import

```jsx
import { VideoSelect } from '../../editor-controls';
```

### Value as object, saved value as object

```jsx

<VideoSelect
	label="Background Video"
	value={ attributes.video }
	onChange={ ( value ) => {
		setAttributes( {
			video: { id: value.id, url: value.url }
		} );
	} }
/>
```

### Value as id, saved value as object

```jsx
<VideoSelect
	label="Background Video"
	value={ attributes.video.id }
	onChange={ ( value ) => {
		setAttributes( {
			video: { id: value.id, url: value.url }
		} );
	} }
/>
```

### Value as id, saved value as id

```jsx
<VideoSelect
	label="Background Video"
	value={ attributes.video }
	onChange={ ( value ) => {
		setAttributes( {
			video: value.id
		} );
	} }
/>
```

