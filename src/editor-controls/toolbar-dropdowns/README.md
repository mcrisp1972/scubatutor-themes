# ToolbarDropdowns

A collection of reusable toolbar dropdown controls for WordPress Gutenberg blocks. These controls provide intuitive dropdown menus for various alignment, spacing, and formatting options.

## Exported Controls

### JustifyToolbar
A toolbar dropdown for horizontal justification/alignment options.

![JustifyToolbar Screenshot](../_screenshots/JustifyToolbar-1.png)

**Props:**
- `props` (object) - Block props containing `attributes` and `setAttributes`
- `label` (string, optional) - Tooltip label for the dropdown (default: "Change text alignment")
- `attribute` (string) - The attribute name to control
- `options` (array, optional) - Available alignment options (default: `['left', 'center']`)

**Available Options:**
- `left` - Left alignment
- `center` - Center alignment
- `right` - Right alignment

**Usage:**
```jsx
<BlockControls>
    <ToolbarGroup>
        <JustifyToolbar
            props={ props }
            attribute="alignment"
            options={ [ 'left', 'center', 'right' ] }
            label="Change content alignment"
        />
    </ToolbarGroup>
</BlockControls>
```

### VerticalAlignToolbar
A toolbar dropdown for vertical alignment options.

![VerticalAlignToolbar Screenshot](../_screenshots/VerticalAlignToolbar-1.png)

**Props:**
- `props` (object) - Block props containing `attributes` and `setAttributes`
- `attribute` (string) - The attribute name to control
- `label` (string, optional) - Tooltip label for the dropdown (default: "Change vertical alignment")

**Available Options:**
- `top` - Top alignment
- `center` - Center alignment

**Usage:**
```jsx
<BlockControls>
    <ToolbarGroup>
        <VerticalAlignToolbar
            props={ props }
            attribute="verticalAlign"
            label="Change vertical alignment"
        />
    </ToolbarGroup>
</BlockControls>
```

### IntroAlignToolbar
A toolbar dropdown for intro/media positioning options.

![IntroAlignToolbar Screenshot](../_screenshots/IntroAlignToolbar-1.png)

**Props:**
- `props` (object) - Block props containing `attributes` and `setAttributes`
- `attribute` (string) - The attribute name to control
- `options` (array, optional) - Available positioning options (default: `['right', 'left', 'top']`)
- `label` (string, optional) - Tooltip label for the dropdown (default: "Change intro position")

**Available Options:**
- `right` - Show intro on right
- `left` - Show intro on left
- `top` - Show intro on top

**Usage:**
```jsx
<BlockControls>
    <ToolbarGroup>
        <IntroAlignToolbar
            props={ props }
            attribute="introPosition"
            options={ [ 'right', 'left', 'top' ] }
            label="Change intro position"
        />
    </ToolbarGroup>
</BlockControls>
```

### AspectRatioToolbar
A toolbar dropdown for media aspect ratio selection.

![AspectRatioToolbar Screenshot](../_screenshots/AspectRatioToolbar-1.png)

**Props:**
- `props` (object) - Block props containing `attributes` and `setAttributes`
- `attribute` (string) - The attribute name to control
- `options` (array) - Available aspect ratio options
- `label` (string, optional) - Tooltip label for the dropdown (default: "Change media aspect ratio")

**Available Options:**
- `21-9` - Ultra-wide aspect ratio (21:9)
- `16-9` - Widescreen aspect ratio (16:9)
- `3-2` - Standard aspect ratio (3:2)
- `4-3` - Traditional aspect ratio (4:3)
- `1` - Square aspect ratio (1:1)
- `full` - Full image dimensions

**Usage:**
```jsx
<BlockControls>
    <ToolbarGroup>
        <AspectRatioToolbar
            props={ props }
            attribute="aspectRatio"
            options={ [ '16-9', '4-3', '1' ] }
            label="Change image aspect ratio"
        />
    </ToolbarGroup>
</BlockControls>
```

### RadiusToolbar
A toolbar dropdown for border radius selection.

![RadiusToolbar Screenshot](../_screenshots/RadiusToolbar-1.png)

**Props:**
- `props` (object) - Block props containing `attributes` and `setAttributes`
- `attribute` (string) - The attribute name to control
- `options` (array, optional) - Available radius options (default: `['none', 'small', 'medium', 'large', 'arch']`)

**Available Options:**
- `none` - No border radius
- `small` - Small border radius
- `medium` - Medium border radius
- `large` - Large border radius
- `arch` - Arch-shaped border radius

**Usage:**
```jsx
<BlockControls>
    <ToolbarGroup>
        <RadiusToolbar
            props={ props }
            attribute="borderRadius"
            options={ [ 'none', 'small', 'medium', 'large' ] }
        />
    </ToolbarGroup>
</BlockControls>
```

### TextAlignToolbar
A toolbar dropdown for text alignment options.

![TextAlignToolbar Screenshot](../_screenshots/TextAlignToolbar-1.png)

**Props:**
- `props` (object) - Block props containing `attributes` and `setAttributes`
- `attribute` (string) - The attribute name to control
- `options` (array, optional) - Available alignment options (default: `['left', 'center']`)

**Available Options:**
- `left` - Left text alignment
- `center` - Center text alignment
- `right` - Right text alignment

**Usage:**
```jsx
<BlockControls>
    <ToolbarGroup>
        <TextAlignToolbar
            props={ props }
            attribute="textAlign"
            options={ [ 'left', 'center', 'right' ] }
        />
    </ToolbarGroup>
</BlockControls>
```

## Implementation in Block Toolbar

To use these controls in your block's toolbar, import them and add them to your block's `edit` function:

```jsx
import {
    JustifyToolbar,
    VerticalAlignToolbar,
    AspectRatioToolbar,
    RadiusToolbar,
    TextAlignToolbar
} from '../editor-controls';

// In your block's edit function
const BlockEdit = (props) => {
  return (
    <>
      <BlockControls>
            <ToolbarGroup>
                <JustifyToolbar
                    props={ props }
                    attribute="alignment"
                    options={ [ 'left', 'center', 'right' ] }
                />
                <AspectRatioToolbar
                    props={ props }
                    attribute="aspectRatio"
                    options={ [ '16-9', '4-3', '1' ] }
                />
                <RadiusToolbar
                    props={ props }
                    attribute="borderRadius"
                />
            </ToolbarGroup>
        </BlockControls>
      {/* Your block content */}
    </>
  );
};
```

## Notes

- All controls automatically handle the active state based on the current attribute value
- Controls can be customized by passing different `options` arrays to limit available choices
