# Post Form Fields

The `Post_Form` class adds custom fields to the Add/Edit Post and Custom Post Type forms in the WordPress admin. It's specifically intended for use in the classic editor. For teh block editor, it's recommended you add fields to the sidebar using core React components.

## Field Appearance
Forms are displayed using classic meta boxes, and fields are built using WordPress' native form structure and styles. This ensures a seamless and consistent experience for users managing post fields.

## Properties
Before instantiating the class, you'll need to build an array of properties.

| Property    | Type   | Required | Description |
|-------------|--------|----------|-------------|
| `post_type` | string | Yes      | WordPress post type (e.g., 'post', 'page', or a custom post type) to which you want to add custom fields |
| `box_title` | string | Yes      | Title to display in the meta box header |
| `box_id`    | string | Yes      | A unique ID to assign to the meta box |
| `fields`    | array  | Yes      | Accepts an array of field definition arrays, as described in the [Field Reference](./field-reference) doc |

## Example Instantiation

```php
use Capitola\Admin_Forms\Post_Form;

function add_post_fields() {
	new Post_Form(
		array(
			'post_type' => 'trip',
			'box_title' => 'Additional Details',
			'box_id'    => 'capitola-trip-meta-box',
			'fields'   => array(
				array(
					'type'  => 'text',
					'label' => 'Subheading',
					'name'  => 'post_subheading',
					'help'  => 'A subheading to display in the post template.',
				),
				array(
					'type'  => 'wysiwyg',
					'label' => 'Summary',
					'name'  => 'trip_summary',
					'help'  => 'A short summary for use in listings and previews.',
				),
			),
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\\add_post_fields' );
```

## Field Reference
See the [Field Reference](./field-reference) documentation for details on supported field types and their properties.
