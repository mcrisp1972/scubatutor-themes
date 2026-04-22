# Editor Controls

A collection of custom WordPress Gutenberg editor controls for building block editor templates. These reusable components provide enhanced functionality for managing content, selecting media, working with dates and times, and more.

## Table of Contents

### Fields
- [DatePicker](#datepicker)
- [DateTimePicker](#datetimepicker)
- [GoogleMapControl](#googlemapcontrol)
- [IconSelector](#iconselector)
- [ImageFocalPoint](#imagefocalpoint)
- [ImageSelect](#imageselect)
- [LabeledSpinner](#labeledspinner)
- [LinkSelect](#linkselect)
- [MetaRepeater](#metarepeater)
- [OverlayOpacitySlider](#overlayopacityslider)
- [PostCheckboxes](#postcheckboxes)
- [PostPicker](#postpicker)
- [Repeater](#repeater)
- [TagSelect](#tagselect)
- [TermCheckboxes](#termcheckboxes)
- [TimePicker](#timepicker)
- [TMCEControl](#tmcecontrol)
- [TruncateControl](#truncatecontrol)
- [VideoSelect](#videoselect)
- [Toolbar Dropdowns](#toolbar-dropdowns)
### Template Components
- [CtaControl](#ctacontrol)
- [ImageSelectButton](#imageselectbutton)
- [LinkList](#linklist)
- [PlaceholderIframe](#placeholderiframe)
- [PlaceholderImage](#placeholderimage)
- [PlaceholderVideo](#placeholdervideo)
- [RepeaterControls](#repeatercontrols)
- [RepeaterPopover](#repeaterpopover)

---

## `CtaControl`

![CtaControl Screenshot](./_screenshots/CtaControl-2.png)

A WordPress Gutenberg editor control component for creating call-to-action buttons or styled links. For use in block editor templates, it displays a placeholder for the button or link, and when clicked, opens a popover for editing button text and link settings.

[View Documentation →](./cta-control/README.md)

---

## `DatePicker`

![DatePicker Screenshot](./_screenshots/DatePicker-2.png)

A WordPress Gutenberg editor control component for selecting dates. For use in block editor templates, it displays a button with a calendar icon and formatted date, and when clicked, opens a dropdown with a date picker interface.

[View Documentation →](./date-picker/README.md)

---

## `DateTimePicker`

![DateTimePicker Screenshot](./_screenshots/DateTimePicker-1.png)

A WordPress Gutenberg editor control component for selecting both dates and times. For use in block editor templates, it displays a button with a calendar icon and formatted date/time, and when clicked, opens a dropdown with a date picker interface and time selection controls.

[View Documentation →](./date-time-picker/README.md)

---

## `GoogleMapControl`

![GoogleMapControl Screenshot](./_screenshots/GoogleMapControl-1.png)

A WordPress Gutenberg editor control component for selecting locations using Google Maps. For use in block editor templates, it displays an interactive Google Map with an autocomplete search input, allowing users to search for addresses and select locations with precise coordinates.

[View Documentation →](./google-map-control/README.md)

---

## `IconSelector`

![IconSelector Screenshot](./_screenshots/IconSelector-1.png)

A WordPress Gutenberg editor control component for selecting icons from a predefined list. For use in block editor sidebars, it displays a dropdown with icon options that show both the icon name and a visual preview of the icon.

[View Documentation →](./icon-selector/README.md)

---

## `ImageFocalPoint`

![ImageFocalPoint Screenshot](./_screenshots/ImageFocalPoint-1.png)

A WordPress Gutenberg editor control component for selecting the most important visual point of an image and controlling crop positions.

[View Documentation →](./image-focal-point/README.md)

---

## `ImageSelect`

![ImageSelect Screenshot](./_screenshots/ImageSelect-1.png)

A WordPress Gutenberg editor control component for use in the block sidebar. It is inspired by the WP Featured Image selector.

[View Documentation →](./image-select/README.md)

---

## `ImageSelectButton`

![ImageSelectButton Screenshot](./_screenshots/ImageSelectButton-1.png)

A WordPress Gutenberg editor control component that provides a button interface for selecting images from the WordPress media library. Built on top of the WordPress `MediaUpload` component with specialized functionality for single image selection and gallery management.

[View Documentation →](./image-select-button/README.md)

---

## `LabeledSpinner`

![LabeledSpinner Screenshot](./_screenshots/LabeledSpinner-1.png)

A simple WordPress Gutenberg editor control component that displays a loading spinner with a label. Useful for showing loading states in block editor controls.

[View Documentation →](./labeled-spinner/README.md)

---

## `LinkList`

![LinkList Screenshot](./_screenshots/LinkList-1.png)

A WordPress Gutenberg editor control component for managing a list of links. Provides an interface for adding, editing, and removing multiple links with title and URL settings, commonly used for navigation menus or resource lists in blocks.

[View Documentation →](./link-list/README.md)

---

## `LinkSelect`

![LinkSelect Screenshot](./_screenshots/LinkSelect-3.png)

A WordPress Gutenberg editor control component for managing links with URL and target settings. This control wraps the WordPress LinkControl component in a BaseControl for consistent styling and behavior within the block editor sidebar.

[View Documentation →](./link-select/README.md)

---

## `MetaRepeater`

![MetaRepeater Screenshot](./_screenshots/MetaRepeater-1.png)

A WordPress Gutenberg editor control component for managing repeating field groups stored in post meta. Provides functionality for adding, removing, and editing multiple rows of structured data that persist to WordPress post meta fields.

[View Documentation →](./meta-repeater/README.md)

---

## `OverlayOpacitySlider`

![OverlayOpacitySlider Screenshot](./_screenshots/OverlayOpacitySlider-1.png)

A WordPress Gutenberg editor control component for adjusting image overlay opacity using a range slider. For use in block editor sidebars, it provides a visual slider interface where users can adjust the opacity of image overlays with precise control.

[View Documentation →](./overlay-opacity-slider/README.md)

---

## `PlaceholderIframe`

![PlaceholderIframe Screenshot](./_screenshots/PlaceholderIframe-1.png)

A WordPress Gutenberg editor control component for displaying a placeholder iframe icon. This component renders an SVG icon that represents an iframe placeholder, commonly used in block editor templates to indicate where an iframe will be embedded.

[View Documentation →](./placeholder-iframe/README.md)

---

## `PlaceholderImage`

![PlaceholderImage Screenshot](./_screenshots/PlaceholderImage-1.png)

A WordPress Gutenberg editor control component for displaying a placeholder image icon. This component renders an SVG icon that represents an image placeholder, commonly used in block editor templates to indicate where an image will be displayed.

[View Documentation →](./placeholder-image/README.md)

---

## `PlaceholderVideo`

![PlaceholderVideo Screenshot](./_screenshots/PlaceholderVideo-1.png)

A WordPress Gutenberg editor control component for displaying a placeholder video icon. This component renders an SVG icon that represents a video placeholder, commonly used in block editor templates to indicate where a video will be displayed.

[View Documentation →](./placeholder-video/README.md)

---

## `PostCheckboxes`

![PostCheckboxes Screenshot](./_screenshots/PostCheckboxes-1.png)

A WordPress Gutenberg editor control component for selecting multiple posts via checkboxes. This control fetches posts from a specified post type and displays them as individual checkbox controls, allowing users to select multiple posts at once.

[View Documentation →](./post-checkboxes/README.md)

---

## `PostPicker`

![PostPicker Screenshot](./_screenshots/PostPicker-2.png)

A WordPress Gutenberg editor control component for selecting a single post via a searchable combobox. This control fetches posts from a specified post type and displays them in a searchable dropdown, allowing users to find and select a single post efficiently.

[View Documentation →](./post-picker/README.md)

---

## `Repeater`

![Repeater Screenshot](./_screenshots/MetaRepeater-1.png)

A WordPress Gutenberg editor control component for managing repeating field groups in block attributes. Provides a panel-based interface for adding, removing, and editing multiple rows of structured data within blocks.

[View Documentation →](./repeater/README.md)

---

## `RepeaterControls`

![RepeaterControls Screenshot](./_screenshots/RepeaterControls-1.png)

A WordPress Gutenberg editor control component that provides a toolbar interface for managing repeater field rows. This component renders a set of action buttons for adding, removing, moving, and managing repeater items directly in the editor interface.

[View Documentation →](./repeater-controls/README.md)

---

## `RepeaterPopover`

![RepeaterPopover Screenshot](./_screenshots/RepeaterPopover-3.png)

A WordPress Gutenberg editor control component that provides a popover interface for managing repeater field rows. Built on top of the WordPress `Popover` component with specialized functionality for adding, removing, moving, and managing repeater items.

[View Documentation →](./repeater-popover/README.md)

---

## `TagSelect`

![TagSelect Screenshot](./_screenshots/TagSelect-1.png)

A WordPress Gutenberg editor control component for selecting HTML tag elements. This control wraps the WordPress SelectControl component to provide a dropdown for choosing semantic HTML tags, commonly used for typography and heading elements in block editor controls.

[View Documentation →](./tag-select/README.md)

---

## `TermCheckboxes`

![TermCheckboxes Screenshot](./_screenshots/TermCheckboxes-1.png)

A WordPress Gutenberg editor control component for selecting multiple taxonomy terms via checkboxes. This control fetches terms from a specified taxonomy and displays them as individual checkbox controls, allowing users to select multiple terms at once.

[View Documentation →](./term-checkboxes/README.md)

---

## `TimePicker`

![TimePicker Screenshot](./_screenshots/TimePicker-1.png)

A WordPress Gutenberg editor control component for selecting times. For use in block editor templates, it displays a button with a clock icon and formatted time, and when clicked, opens a dropdown with hour, minute, and AM/PM selection controls.

[View Documentation →](./time-picker/README.md)

---

## `TMCEControl`

![TMCEControl Screenshot](./_screenshots/TMCEControl-1.png)

A WordPress Gutenberg editor control component that provides a TinyMCE (Tiny MCE) rich text editor interface within the block sidebar. This control allows users to create and edit rich text content with formatting options like bold, italic, lists, and links using the classic WordPress editor experience.

[View Documentation →](./tmce-control/README.md)

---

## Toolbar Dropdowns

A collection of reusable toolbar dropdown controls for WordPress Gutenberg blocks. These controls provide intuitive dropdown menus for various alignment, spacing, and formatting options.

### `JustifyToolbar`

A toolbar dropdown for horizontal justification/alignment options.

![JustifyToolbar Screenshot](./_screenshots/JustifyToolbar-1.png)

[View Documentation →](./toolbar-dropdowns/README.md#justifytoolbar)

### `VerticalAlignToolbar`

A toolbar dropdown for vertical alignment options.

![VerticalAlignToolbar Screenshot](./_screenshots/VerticalAlignToolbar-1.png)

[View Documentation →](./toolbar-dropdowns/README.md#verticalaligntoolbar)

### `IntroAlignToolbar`

A toolbar dropdown for intro/media positioning options.

![IntroAlignToolbar Screenshot](./_screenshots/IntroAlignToolbar-1.png)

[View Documentation →](./toolbar-dropdowns/README.md#introaligntoolbar)

### `TextAlignToolbar`

A toolbar dropdown for text alignment options.

![TextAlignToolbar Screenshot](./_screenshots/TextAlignToolbar-1.png)

[View Documentation →](./toolbar-dropdowns/README.md#textaligntoolbar)

### `AspectRatioToolbar`

A toolbar dropdown for media aspect ratio selection.

![AspectRatioToolbar Screenshot](./_screenshots/AspectRatioToolbar-1.png)

[View Documentation →](./toolbar-dropdowns/README.md#aspectratiotoolbar)

### `RadiusToolbar`

A toolbar dropdown for border radius selection.

![RadiusToolbar Screenshot](./_screenshots/RadiusToolbar-1.png)

[View Documentation →](./toolbar-dropdowns/README.md#radiustoolbar)

---

## `TruncateControl`

![TruncateControl Screenshot](./_screenshots/TruncateControl-1.png)

A WordPress Gutenberg editor control component for setting the maximum number of excerpt lines using a range slider. For use in block editor sidebars, it provides a visual slider interface where users can control text truncation with precise line count selection.

[View Documentation →](./truncate-control/README.md)

---

# `VideoSelect`

![VideoSelect Screenshot](./_screenshots/VideoSelect-1.png)

A WordPress Gutenberg editor control component for selecting video files from the WordPress media library. This control displays video metadata including title, file size, length, and URL.

[View Documentation →](./video-select/README.md)

---

## Installation

All controls are exported from the main `index.jsx` file and can be imported as needed:

```jsx
import {
	DatePicker,
	ImageSelect,
	PostPicker,
	// ... other controls
} from '../editor-controls';
```
