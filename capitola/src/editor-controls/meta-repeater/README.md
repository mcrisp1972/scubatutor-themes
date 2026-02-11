# MetaRepeater

A WordPress Gutenberg editor control component for managing repeatable fields stored in post meta. For use in block editor sidebars, it provides a full-featured interface for adding, removing, reordering, and editing repeating data structures.

![MetaRepeater Screenshot](../_screenshots/MetaRepeater-1.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `postMeta` | `object` | - | **Required.** The post meta object |
| `metaKey` | `string` | - | **Required.** The post meta key where the repeater data is stored |
| `label` | `string` | - | **Required.** Singular label for each repeater row (e.g., "Item") |
| `pluralLabel` | `string` | - | **Required.** Plural label for the entire repeater section (e.g., "Items") |
| `fields` | `Function` | - | **Required.** Render function that receives the row index and returns the fields for that row |
| `newObject` | `object\|string` | - | **Required.** Template for new rows. Object for structured data, string/primitive for flat data |
| `help` | `string` | - | Optional help text displayed as a tip above the repeater |

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

### `MetaRepeaterOnChange( postMeta, metaKey, value, index, key )`

Helper function for updating individual field values within a repeater row.

**Parameters:**
- `postMeta` (object): The post meta object
- `metaKey` (string): The meta key of the repeater
- `value` (any): The new value to set
- `index` (number): The row index
- `key` (string|undefined): The property key within the row object. Omit for flat repeaters.

## Usage

### Import
```jsx
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { MetaRepeater, MetaRepeaterOnChange } from '../../editor-controls';
```

### Setup Post Meta Hook

```jsx
const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType(), [] );
const [ postMeta, setPostMeta ] = useEntityProp( 'postType', postType, 'meta' );
```

### Object-based Repeater (Complex Data)

```jsx
const newTestimonial = {
    author: '',
    quote: '',
    company: ''
};

<InspectorControls>
    <PanelBody title="Settings" initialOpen={ true }>
        <MetaRepeater
            postMeta={ postMeta }
            metaKey="testimonials"
            label="Testimonial"
            pluralLabel="Testimonials"
            newObject={ newTestimonial }
            help="Add customer testimonials to display on this page."
            fields={ ( index ) => {
                return (
                    <>
                        <TextControl
                            label="Author"
                            value={ postMeta.testimonials[ index ].author }
                            onChange={ ( value ) => {
                                MetaRepeaterOnChange( postMeta, 'testimonials', value, index, 'author' );
                            } }
                        />
                        <TextareaControl
                            label="Quote"
                            value={ postMeta.testimonials[ index ].quote }
                            onChange={ ( value ) => {
                                MetaRepeaterOnChange( postMeta, 'testimonials', value, index, 'quote' );
                            } }
                        />
                        <TextControl
                            label="Company"
                            value={ postMeta.testimonials[ index ].company }
                            onChange={ ( value ) => {
                                MetaRepeaterOnChange( postMeta, 'testimonials', value, index, 'company' );
                            } }
                        />
                    </>
                );
            } }
        />
    </PanelBody>
</InspectorControls>
```

### Flat Repeater (Simple Values)

```jsx
<InspectorControls>
    <PanelBody title="Settings" initialOpen={ true }>
        <MetaRepeater
            postMeta={ postMeta }
            metaKey="bullet_points"
            label="Bullet Point"
            pluralLabel="Bullet Points"
            newObject=""
            help="Add bullet points to highlight key features."
            fields={ ( index ) => {
                return (
                    <TextControl
                        label={ `Bullet Point ${ index + 1 }` }
                        value={ postMeta.bullet_points[ index ] }
                        onChange={ ( value ) => {
                            MetaRepeaterOnChange( postMeta, 'bullet_points', value, index );
                        } }
                    />
                );
            } }
        />
    </PanelBody>
</InspectorControls>
```

### Advanced Example with Image and URL Fields

```jsx
const newSlide = {
    image: '',
    title: '',
    subtitle: '',
    linkUrl: '',
    linkText: ''
};

<InspectorControls>
    <PanelBody title="Settings" initialOpen={ true }>
        <MetaRepeater
            postMeta={ postMeta }
            metaKey="hero_slides"
            label="Slide"
            pluralLabel="Hero Slides"
            newObject={ newSlide }
            fields={ ( index ) => {
                const slide = postMeta.hero_slides[ index ];
                return (
                    <>
                        <ImageSelectButton
                            label="Slide Image"
                            imageId={ slide.image }
                            onSelect={ ( image ) => {
                                MetaRepeaterOnChange( postMeta, 'hero_slides', image.id, index, 'image' );
                            } }
                            onRemove={ () => {
                                MetaRepeaterOnChange( postMeta, 'hero_slides', '', index, 'image' );
                            } }
                        />
                        <TextControl
                            label="Title"
                            value={ slide.title }
                            onChange={ ( value ) => {
                                MetaRepeaterOnChange( postMeta, 'hero_slides', value, index, 'title' );
                            } }
                        />
                        <TextControl
                            label="Subtitle"
                            value={ slide.subtitle }
                            onChange={ ( value ) => {
                                MetaRepeaterOnChange( postMeta, 'hero_slides', value, index, 'subtitle' );
                            } }
                        />
                        <TextControl
                            label="Link URL"
                            value={ slide.linkUrl }
                            onChange={ ( value ) => {
                                MetaRepeaterOnChange( postMeta, 'hero_slides', value, index, 'linkUrl' );
                            } }
                        />
                        <TextControl
                            label="Link Text"
                            value={ slide.linkText }
                            onChange={ ( value ) => {
                                MetaRepeaterOnChange( postMeta, 'hero_slides', value, index, 'linkText' );
                            } }
                        />
                    </>
                );
            } }
        />
    </PanelBody>
</InspectorControls>
```
