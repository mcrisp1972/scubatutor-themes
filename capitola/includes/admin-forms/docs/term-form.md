# Term Form Fields

The `Term_Form` class adds custom fields to the Add Term and Edit Term forms.

## Field Appearance
Fields are built using WordPress' native form structure and styles. This provides a seamless implementation of your fields into the term forms.

## Properties
Before instantiating the class you'll need to build an array of properties.

| Property   | Type   | Required | Description |
|------------|--------|----------|-------------|
| `taxonomy` | string | Yes      | WordPress taxonomy (e.g., 'category', 'post_tag') to which you want to add custom fields |
| `fields`   | array  | Yes      | Accepts an array of field definition arrays, as described in the [Field Reference](./field-reference) doc |

## Predefined Fields
The Capitola theme is globally setup for 2 universal term meta fields:
- `term_thumb_id`: Defines an image ID to be used in the post fallback image system, as well as for display in term listing blocks.
- `term_page_id`: A page ID that is used as a replacement for the term archive page (applied in the term_link filter, [/includes/term-link.php](../../term-link.php)).

To ensure consistency across terms, as well as for convenience, the `Term_Form` class includes 2 constants:
- `Term_Form::$term_thumb`
- `Term_Form::$term_page`

`$term_thumb` is defined with the following properties:
```php
public static $term_thumb = array(
	'id'      => 'term_thumb_id',
	'name'    => 'term_thumb_id',
	'label'   => 'Thumbnail Image',
	'type'    => 'media',
	'default' => 0,
);
```

`$term_page` is defined with the following properties:
```php
public static $term_page = array(
	'id'      => 'term_page_id',
	'name'    => 'term_page_id',
	'label'   => 'Term Landing Page',
	'type'    => 'page_select',
	'default' => 0,
	'help'    => "If a page is selected, links to this term will point to the selected page. Otherwise, links will point the post type's archive page.",
);
```

## Example Instantiation

```php
use Capitola\Admin_Forms\Term_Form;

function add_term_fields() {
	new Term_Form(
		array(
			'taxonomy' => 'category',
			'fields'   => array(
				Term_Form::$term_thumb,
				Term_Form::$term_page,
				array(
					'type'  => 'wysiwyg',
					'label' => 'Extended Description',
					'name'  => 'term_extended_desc',
					'help'  => 'Used in some blocks to provide an introduction to the posts assigned to the term.',
				),
			),
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\add_term_fields' );
```
