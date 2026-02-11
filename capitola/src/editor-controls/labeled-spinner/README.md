# LabeledSpinner

A WordPress Gutenberg editor control component for displaying a loading spinner with a label. For use in block editor sidebars when content is being loaded asynchronously or processed.

![LabeledSpinner Screenshot](../_screenshots/LabeledSpinner-1.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Label text to display above the spinner |

## Related Components

- [WordPress Spinner Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/spinner)

## Usage

### Import
```jsx
import { LabeledSpinner } from '../../editor-controls';
```

### Basic Loading Spinner

```jsx
<LabeledSpinner label="Loading data..." />
```

### Conditional Loading State

```jsx
const { isLoading, data } = useSelect( ( select ) => {
    return {
        isLoading: select( 'core/data' ).isResolving( 'getItems' ),
        data: select( 'core/data' ).getItems()
    };
} );

<InspectorControls>
    <PanelBody title="Some Title" initialOpen={ true }>
        { isLoading ? (
            <LabeledSpinner label="Loading items..." />
        ) : (
            // Render your loaded content here
            <div>{ data.map( item => <div>{ item.name }</div> ) }</div>
        ) }
    </PanelBody>
</InspectorControls>
```
