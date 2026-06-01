# Repeater

A WordPress Gutenberg editor control component for managing repeatable fields stored in block attributes. Provides a full-featured interface for adding, removing, reordering, and editing repeating data structures within custom blocks.

![Repeater Screenshot](../_screenshots/MetaRepeater-1.png)

## Properties

| Properties    | Type             | Required | Description |
|---------------|------------------|----------|-------------|
| `props`       | `object`         | Yes      | The block's props object containing `attributes` and `setAttributes` |
| `attribute`   | `string`         | Yes      | The attribute name where the repeater data is stored |
| `label`       | `string`         | Yes      | Singular label for each repeater row (e.g., "Item") |
| `pluralLabel` | `string`         | Yes      | Plural label for the entire repeater section (e.g., "Items") |
| `fields`      | `function`       | Yes      | Render function that receives the row index and returns the fields for that row |
| `newObject`   | `object\|string` | Yes      | Template for new rows. `Object` for structured data, `string` for flat data |
| `help`        | `string`         | No       | Help text displayed as a tip above the repeater |

## Data Structure

### Object-based Repeater (Structured Data)

For complex repeating data with multiple fields:

```javascript
// newObject template
{
	title: '',
	description: '',
	url: ''
}

// Stored data structure
[
	{ title: 'First Item', description: 'Description 1', url: 'https://example.com' },
	{ title: 'Second Item', description: 'Description 2', url: 'https://example.com/2' }
]
```

### Flat Repeater (Simple Data)

For simple repeating values:

```javascript
// newObject template
''

// Stored data structure
[ 'Value 1', 'Value 2', 'Value 3' ]
```

## Helper Function

### `repeaterOnChange( attribute, key, value, index, props )`

Helper function for updating individual field values within a repeater row.

**Parameters:**
- `attribute` (`string`): The attribute name of the repeater
- `key` (`string`|`false`|`null`): The property key within the row object. Use `false` or `null` for flat repeaters.
- `value` (any): The new value to set
- `index` (`number`): The row index
- `props` (`object`): The block's props object

## Usage

### Import
```jsx
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { Repeater, repeaterOnChange } from '../../editor-controls';
```

### Register Attribute in block.json

```json
{
	"attributes": {
		"testimonials": {
			"type": "array",
			"default": []
		}
	}
}
```

### Object-based Repeater (Complex Data)

```jsx
export function Edit( props ) {
	const newTestimonial = {
		author: '',
		quote: '',
		company: ''
	};

    return (
		<>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<Repeater
						props={ props }
						attribute="testimonials"
						label="Testimonial"
						pluralLabel="Testimonials"
						newObject={ newTestimonial }
						help="Add customer testimonials to display in this block."
						fields={ ( index ) => {
							return (
								<>
									<TextControl
										label="Author"
										value={ props.attributes.testimonials[ index ].author }
										onChange={ ( value ) => {
											repeaterOnChange( 'testimonials', 'author', value, index, props );
										} }
									/>
									<TextareaControl
										label="Quote"
										value={ props.attributes.testimonials[ index ].quote }
										onChange={ ( value ) => {
											repeaterOnChange( 'testimonials', 'quote', value, index, props );
										} }
									/>
									<TextControl
										label="Company"
										value={ props.attributes.testimonials[ index ].company }
										onChange={ ( value ) => {
											repeaterOnChange( 'testimonials', 'company', value, index, props );
										} }
									/>
								</>
							);
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{/* Block content */}
			</div>
		</>
	);
}
```

### Flat Repeater (Simple Values)

```jsx
export function Edit( props ) {
	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<Repeater
						props={ props }
						attribute="bullet_points"
						label="Bullet Point"
						pluralLabel="Bullet Points"
						newObject=""
						help="Add bullet points to highlight key features."
						fields={ ( index ) => {
							return (
								<TextControl
									label={ `Bullet Point ${ index + 1 }` }
									value={ props.attributes.bullet_points[ index ] }
									onChange={ ( value ) => {
										repeaterOnChange( 'bullet_points', false, value, index, props );
									} }
								/>
							);
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{/* Block content */}
			</div>
		</>
	);
}
```

### Advanced Example with Image and URL Fields

```jsx
import { ImageSelectButton } from '../../editor-controls';

export function Edit( props ) {
	const newSlide = {
		image: '',
		title: '',
		subtitle: '',
		linkUrl: '',
		linkText: ''
	};

	return (
        <>
			<InspectorControls>
				<PanelBody title="Settings" initialOpen={ true }>
					<Repeater
						props={ props }
						attribute="hero_slides"
						label="Slide"
						pluralLabel="Hero Slides"
						newObject={ newSlide }
						fields={ ( index ) => {
							const slide = props.attributes.hero_slides[ index ];
							return (
								<>
									<ImageSelectButton
										label="Slide Image"
										imageId={ slide.image }
										onSelect={ ( image ) => {
											repeaterOnChange( 'hero_slides', 'image', image.id, index, props );
										} }
										onRemove={ () => {
											repeaterOnChange( 'hero_slides', 'image', '', index, props );
										} }
									/>
									<TextControl
										label="Title"
										value={ slide.title }
										onChange={ ( value ) => {
											repeaterOnChange( 'hero_slides', 'title', value, index, props );
										} }
									/>
									<TextControl
										label="Subtitle"
										value={ slide.subtitle }
										onChange={ ( value ) => {
											repeaterOnChange( 'hero_slides', 'subtitle', value, index, props );
										} }
									/>
									<TextControl
										label="Link URL"
										value={ slide.linkUrl }
										onChange={ ( value ) => {
											repeaterOnChange( 'hero_slides', 'linkUrl', value, index, props );
										} }
									/>
									<TextControl
										label="Link Text"
										value={ slide.linkText }
										onChange={ ( value ) => {
											repeaterOnChange( 'hero_slides', 'linkText', value, index, props );
										} }
									/>
								</>
							);
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{/* Block content */}
			</div>
		</>
	);
}
```

## Visual Behavior

### Object-based Repeater

- Renders each row as a collapsible `PanelBody` with the label and row number as the title
- Includes delete, move up, and move down buttons at the bottom of each panel
- An "Add [Label]" button appears at the bottom to add new rows

### Flat Repeater

- Renders fields inline without collapsible panels
- Includes delete, move up, and move down buttons next to each field
- More compact layout suitable for simple values

## Notes

- The repeater automatically handles adding, removing, and reordering rows
- Move up/down buttons are conditionally shown (not shown for first/last items respectively)
- Empty repeaters will show only the "Add" button
- The component uses WordPress's `BaseControl` for consistent styling

