# Field Reference

Below are the supported field types in `class-fields.php`, with descriptions and example usage in a fields array:

## Text

Single-line text input.

### Properties

| Property | Type     | Required | Description |
|----------|----------|----------|-------------|
| `type`   | `string` | Yes      | Must be `'text'` |
| `label`  | `string` | No       | Label to display next to the field |
| `name`   | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`     | `string` | No       | Field id attribute (defaults to the name value) |
| `size`   | `string` | No       | The width of the field. Defaults to 'medium', Options are tiny, small, medium, large, full |
| `class`  | `string` | No       | CSS classes for the input |
| `help`   | `string` | No       | Help text to display below the field |

### Example

```php
array(
	'type'  => 'text',
	'label' => 'Store Name',
	'name'  => 'capitola_store_name',
	'size'  => 'large',
	'help'  => 'Enter the name of your business. This will be displayed in the site footer and contact sections.',
),
```

## Textarea

Multi-line text input.

### Properties

| Property | Type     | Required | Description |
|----------|----------|----------|-------------|
| `type`   | `string` | Yes      | Must be `'textarea'` |
| `label`  | `string` | No       | Label to display next to the field |
| `name`   | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`     | `string` | No       | Field id attribute (defaults to the name value) |
| `size`   | `string` | No       | The width of the field. Defaults to 'medium'. Options are medium, large, full |
| `rows`   | `string` | No       | Number of visible text lines (height) for the textarea. Defaults to 3 |
| `class`  | `string` | No       | CSS classes for the input |
| `help`   | `string` | No       | Help text to display below the field |

### Example

```php
array(
	'type'  => 'textarea',
	'label' => 'Store Address',
	'name'  => 'capitola_store_address',
	'size'  => 'full',
	'rows'  => 3,
	'help'  => 'Enter the full address of your business. This will be shown in the site footer and contact page.',
),
```

## Select

Dropdown menu.

### Properties

| Property           | Type      | Required | Description |
|--------------------|-----------|----------|-------------|
| `type`             | `string`  | Yes      | Must be `'select'` |
| `label`            | `string`  | No       | Label to display next to the field |
| `name`             | `string`  | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`               | `string`  | No       | Field id attribute (defaults to the name value) |
| `options`          | `array`   | Yes      | Key-value pairs where each key is the option value and each value is the display label shown in the dropdown |
| `allow_null`       | `boolean` | No       | Allows selection of an empty (null) value. Defaults to true |
| `null_option_text` | `string`  | No       | Label shown for the empty (null) option. Defaults to 'Select One' |
| `class`            | `string`  | No       | CSS classes for the input |
| `help`             | `string`  | No       | Help text to display below the field |

### Example

```php
array(
	'type'             => 'select',
	'label'            => 'Default Color Theme',
	'name'             => 'capitola_default_color_theme',
	'options'          => array(
		'light' => 'Light',
		'dark'  => 'Dark',
		'blue'  => 'Ocean Blue',
	),
	'null_option_text' => 'Select a color theme',
	'help'             => 'Choose the default color theme for your site. This can be overridden on individual pages.',
),
```

## Checkbox

Boolean toggle.

### Properties

| Property | Type     | Required | Description |
|----------|----------|----------|-------------|
| `type`   | `string` | Yes      | Must be `'checkbox'` |
| `label`  | `string` | No       | Label to display next to the field |
| `name`   | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`     | `string` | No       | Field id attribute (defaults to the name value) |
| `help`   | `string` | No       | Help text to display to the right of the checkbox |

### Example

```php
array(
	'type'  => 'checkbox',
	'label' => 'Show Notice Banner',
	'name'  => 'capitola_notice_banner_display',
	'help'  => 'Enable this to display a notice banner at the top of your site for important updates.',
),
```

## Radio

Multiple choices, single selection.

### Properties

| Property  | Type     | Required | Description |
|-----------|----------|----------|-------------|
| `type`    | `string` | Yes      | Must be `'radio'` |
| `label`   | `string` | No       | Label to display next to the field |
| `name`    | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`      | `string` | No       | Field id attribute (defaults to the name value) |
| `options` | `array`  | No       | Key-value pairs where each key is the radio button value and each value is the display label shown next to the radio button |
| `help`    | `string` | No       | Help text to display below the radio buttons |

### Example

```php
array(
	'type'    => 'radio',
	'label'   => 'Banner Type',
	'name'    => 'capitola_notice_banner_type',
	'options' => array(
		'update' => 'Update (General Store Update)',
		'alert'  => 'Alert (Urgent Notice)',
	),
	'help'    => 'Select the type of notice banner to display. "Alert" is for urgent messages, "Update" is for general store updates.',
),
```

## Media Selector

Media selector. When an item is selected, it shows the title, filesize, and a link to the item. If an image is selected, a thumnbnail is also displayed.

### Properties

| Property        | Type     | Required | Description |
|-----------------|----------|----------|-------------|
| `type`          | `string` | Yes      | Must be `'media'` |
| `label`         | `string` | No       | Label to display next to the field |
| `name`          | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`            | `string` | No       | Field id attribute (defaults to the name value) |
| `allowed_types` | `string` | No       | Comma separated list of multiple attachment types, or single `string` if just one type is allowed. Defaults to 'image'. Options are image, video, application/pdf |
| `help`          | `string` | No       | Help text to display below the field |

### Example

```php
array(
	'type'          => 'media',
	'label'         => 'Fallback Image',
	'name'          => 'capitola_post_default_image',
	'help'          => 'Sets the fallback featured image if no image is set at the post or term level.',
),
```

## WYSIWYG

Rich text editor (TinyMCE).

### Properties

| Property | Type     | Required | Description |
|----------|----------|----------|-------------|
| `type`   | `string` | Yes      | Must be `'wysiwyg'` |
| `label`  | `string` | No       | Label to display next to the field |
| `name`   | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`     | `string` | No       | Field id attribute (defaults to the name value) |
| `rows`   | `string` | No       | Number of visible text lines (height) for the textarea. Defaults to 4 |
| `help`   | `string` | No       | Help text to display below the field |

### Example

```php
array(
	'type'  => 'wysiwyg',
	'label' => 'Banner Text',
	'name'  => 'capitola_banner_text',
	'rows'  => 3,
	'help'  => 'Enter text to display in the site banner.',
),
```

## Date

Date picker input.

### Properties

| Property | Type     | Required | Description |
|----------|----------|----------|-------------|
| `type`   | `string` | Yes      | Must be `'date'` |
| `label`  | `string` | No       | Label to display next to the field |
| `name`   | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`     | `string` | No       | Field id attribute (defaults to the name value) |
| `size`   | `string` | No       | The width of the field. Defaults to 'medium', Options are tiny, small, medium, large, full |
| `class`  | `string` | No       | CSS classes for the input |
| `help`   | `string` | No       | Help text to display below the field |

### Example

```php
array(
	'type'  => 'date',
	'label' => 'Store Opening Date',
	'name'  => 'capitola_store_opening_date',
	'size'  => 'small',
	'help'  => 'Select the date your business first opened. This may be displayed in the About or History section of your site.',
),
```

## Page Select

Dropdown for selecting a WordPress page.

### Properties

| Property | Type     | Required | Description |
|----------|----------|----------|-------------|
| `type`   | `string` | Yes      | Must be `'page_select'` |
| `label`  | `string` | No       | Label to display next to the field |
| `name`   | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`     | `string` | No       | Field id attribute (defaults to the name value) |
| `class`  | `string` | No       | CSS classes for the input |
| `help`   | `string` | No       | Help text to display below the field |

### Example

```php
array(
	'type'    => 'page_select',
	'label'   => 'Contact Page',
	'name'    => 'capitola_contact_page',
	'help'    => 'Select the page to use for your site’s contact form. This will be linked from the site footer and navigation.',
),
```

## Term Select

Dropdown for selecting a taxonomy term.

### Properties

| Property   | Type     | Required | Description |
|------------|----------|----------|-------------|
| `type`     | `string` | Yes      | Must be `'term_select'` |
| `taxonomy` | `string` | Yes      | The WordPress taxonomy from which to list selectable terms |
| `label`    | `string` | No       | Label to display next to the field |
| `name`     | `string` | Yes      | Field name (setting, post_meta, or term_meta) |
| `id`       | `string` | No       | Field id attribute (defaults to the name value) |
| `class`    | `string` | No       | CSS classes for the input |
| `help`     | `string` | No       | Help text to display below the field |

### Example

```php
array(
	'type'    => 'term_select',
	'label'   => 'Default Blog Category',
	'name'    => 'capitola_default_blog_category',
	'help'    => 'Choose the default category for new blog posts. This will be pre-selected when creating a new post.',
),
```
