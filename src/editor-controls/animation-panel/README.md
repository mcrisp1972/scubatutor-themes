# AnimationPanel

A WordPress Gutenberg editor control component for configuring reveal animations on block content. This panel is built with `ToolsPanel` and updates a block's `revealAnimation` attribute with animation style, section targeting, duration, easing, and optional direction controls.

## Properties

| Property   | Type     | Required | Default              | Description |
|------------|----------|----------|----------------------|-------------|
| `props`    | `object` | Yes      |                      | Standard block edit props (`attributes`, `setAttributes`, `name`, `clientId`) |
| `sections` | `array`  | No       | `[ 'block', 'body' ]` | Available section choices for animation targeting |

## Attribute Structure

`AnimationPanel` expects a `revealAnimation` object in block attributes.

```javascript
{
	animation: '',
	section: 'block',
	duration: 1,
	easing: 'ease',
	origin: 'right',
	direction: 'horizontal',
	startPosition: '100%'
}
```

## Supported Animation Styles

The panel exposes the following preset styles:

| Animation Key | Label       | Defaults | Optional Controls |
|---------------|-------------|----------|-------------------|
| `fadeIn`      | Fade In     | `duration: 1`, `easing: 'ease-in'` | Duration, easing |
| `fadeUp`     | Fade Up    | `direction: 'vertical'`, `startPosition: '40px'`, `duration: 1`, `easing: 'ease'` | Start position, duration, easing |
| `sideReveal`  | Side Reveal | `direction: 'horizontal'`, `origin: 'right'`, `startPosition: '100%'`, `duration: 1`, `easing: 'ease'` | Duration, easing, reveal origin |
| `sideShift`   | Side Shift  | `direction: 'horizontal'`, `origin: 'right'`, `startPosition: '200px'`, `duration: 1`, `easing: 'ease'` | Start position, duration, easing, reveal origin |

## Section Behavior

- `block`: Animates the full block wrapper.
- `body`: Animates body/intro content only.
- `figure`: Optional, if included in `sections`, typically used for image/media regions.

When `origin` is available, reveal direction is adjusted by section and alignment to ensure movement appears to come from the expected side.

## Helper Function

`animationPreviewClass( animationAttribute, animatedSection )` returns a `js-animation-preview` class when the provided section matches the selected animation section. Use this helper on rendered elements to mark the preview target.

```javascript
const className = animationPreviewClass( attributes.revealAnimation, 'body' );
```

## Features

- Preset animation styles with per-style defaults
- Context-aware controls (only shows relevant fields for the selected style)
- Manual preview button in editor controls
- Auto-preview when changing key settings (style, duration, easing, origin, start position)
- `ToolsPanel` reset support for individual controls and full panel reset

## Usage

### Import

```jsx
import AnimationPanel, { animationPreviewClass } from '../../editor-controls/animation-panel';
```

### Add to Inspector Controls

```jsx
<AnimationPanel
	props={ props }
	sections={ [ 'block', 'body', 'figure' ] }
/>
```

### Apply Preview Target Class in Block Markup

```jsx
<div className={ `my-block${ animationPreviewClass( attributes.revealAnimation, 'block' ) }` }>
	<div className={ `my-block__body${ animationPreviewClass( attributes.revealAnimation, 'body' ) }` }>
		{ /* body content */ }
	</div>
</div>
```

## Notes

- Duration values are stored as numbers in seconds (for example `1`, `0.5`, `0.2`).
- Start position is managed as a unit value string for transform usage (for example `40px`, `100%`).
