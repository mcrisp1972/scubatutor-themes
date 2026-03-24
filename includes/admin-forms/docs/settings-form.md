# Settings Form

The `Settings_Form` class is used to create settings pages in the WordPress admin. They are specifically meant for saving theme or plugin settings, and all settings should be registered with the [register_setting()](https://developer.wordpress.org/reference/functions/register_setting/) function.

## Form Appearance

Forms are built using WordPress' native form structure and styles (see the Settings -> General form for an example). For complex forms, you can also set up a tabbed form.

The link to the settings form can be in the top level of the admin sidebar (with an icon), or a submenu page inside a collapsible sidebar menu (inside the Settings or Pages group for example). If you set the parent_slug property it will be a submenu, otherwise it will be a top-level link.

## Properties

Before instantiating the class you'll need to build an array of properties. Some of these properties are passed directly to the add_submenu_page() function, while others are filtered with fallbacks or specific to this class. Refer to the [add_submenu_page docs](https://developer.wordpress.org/reference/functions/add_submenu_page/#parameters) and [add_menu_page docs](https://developer.wordpress.org/reference/functions/add_menu_page/#parameters) for more information.

| Property        | Type      | Required | Description |
|-----------------|-----------|----------|-------------|
| `parent_slug`   | `string`  | No       | If the link should be inside a sidebar group set the group's slug here. If not defined the link will be a top-level link with an icon. [more info](#parent_slug) |
| `icon_url`      | `string`  | No       | Adds an icon to top-level menu items. Can be either a Dashicon helper class or a base64-encoded SVG. Defaults to 'dashicons-admin-generic' (gear icon) |
| `menu_title`    | `string`  | Yes      | Title to display in the menu |
| `page_title`    | `string`  | No       | Text to be displayed in the title tags of the page when the menu is selected |
| `menu_slug`     | `string`  | Yes      | From WP docs: The slug name to refer to this menu by. Should be unique for this menu and only include lowercase alphanumeric, dashes, and underscores characters to be compatible with [sanitize_key()](https://developer.wordpress.org/reference/functions/sanitize_key/). [Read More](./registering-settings) |
| `menu_position` | `integer` | No       | Position of the menu item in the submenu. Defaults to 50. See the [official docs](https://developer.wordpress.org/reference/functions/add_menu_page/#default-bottom-of-menu-structure) for default positions.   |
| `fields`        | `array`   | No       | Array of fields to display in the form. If you want to group fields in tabs, use the `tabs` property instead. Instructions are provided in the [Adding Fields to the Form](#adding-fields-to-the-form) section. |
| `tabs`          | `array`   | No       | If you want your fields organized using tabs define this property. Otherwise define the fields in the `fields` property. |

## Adding Fields to the Form

The `fields` property accepts an array of field definition arrays, as described in the [Field Reference](./field-reference) doc.

### The `sectionstart` Field Type

The `Settings_Form` class includes a `sectionstart` field type that can be added with your fields. This allows you to add headings or descriptions before your fields or between fields for improved organization. Properties include:

| Property  | Type     | Required | Description |
|-----------|----------|----------|-------------|
| `type`    | `string` | Yes      | Must be `'sectionstart'` |
| `heading` | `string` | No       | Heading to display |
| `desc`    | `string` | No       | Additional text to describe the purpose of the fields |

While the `'heading'` and `'desc'` properties are both optional, at least one should be included.

### `'option'` Field Property

An additional `'option'` property must be added to all fields. This allows the form to populate the field with the current value.

For settings that are a single value (not an object of multiple settings) you only need to pass the setting's name.

If the field is part of an object, pass an array, with the first item being the name of the setting object, and the second item being the key of the object's item. For example, if you have a 'social_links' setting that is a list of social media links, each keyed by a slug for the social media site and a value containing the link, and one of them is a Facebook link, the 'option' property should be defined as:

```php
'option' => array( 'social_links', 'facebook' ),
'name' => 'social_links[facebook]',
```

### Example

```php
$fields = array(
	array(
		'type'  => 'sectionstart',
		'heading' => 'Social Media Options',
		'desc'  => 'Description of field group',
	),
	array(
		'type'    => 'checkbox',
		'label'   => 'Show Links in Footer',
		'option'  => 'show_footer_social_links',
		'name'    => 'show_footer_social_links',
	),
	array(
		'type'    => 'checkbox',
		'label'   => 'Show Links in Navigation',
		'option'  => 'show_nav_social_links',
		'name'    => 'show_nav_social_links',
	),
	array(
		'type'  => 'sectionstart',
		'heading' => 'Social Media Links',
	),
	array(
		'type'  => 'text',
		'label' => 'Facebook Profile',
		'option' => array( 'social_links', 'facebook' ),
		'name'  => 'social_links[facebook]',
		'size'  => 'full',
	),
	array(
		'type'  => 'text',
		'label' => 'Youtube Channel',
		'option' => array( 'social_links', 'youtube' ),
		'name'  => 'social_links[youtube]',
		'size'  => 'full',
	)
);
```

## Creating a Tabbed Layout

To create a tabbed settings form use the 'tabs' property instead of the 'fields' property.

The `'tabs'` property is an associative array of tab definitions, each keyed with a unique tab slug and including the following properties:

| Property   | Type     | Required | Description |
|------------|----------|----------|-------------|
| `text`     | `string` | Yes      | Label for the tab |
| `tab_slug` | `string` | Yes      | The `'tab_slug'` MUST match the $option_group parameter passed when using register_settings() to register each of the settings being saved by the tab. see [theme-options.php](../theme-options.php) for real examples. |
| `fields`   | `array`  | Yes      | An array of the fields to include in the tab. Follows the same structure as the main ['fields'](#adding-fields-to-the-form) property. |

### Example

```php
$tabs = array(
	'business-info' => array(
		'text'   => 'Business Info',
		'tab_slug' => 'capitola-business-info',
		'fields'      => array(
			array(
				'type' => 'sectionstart',
				'heading' => 'Contact Info'
			),
			array(
				'type'   => 'text',
				'label'  => 'Phone Number',
				'option' => 'capitola_phone_number',
				'name'   => 'capitola_phone_number',
				'size'   => 'medium',
			),
			array(
				'type'   => 'text',
				'label'  => 'Email',
				'option' => 'capitola_email_address',
				'name'   => 'capitola_email_address',
				'size'   => 'medium',
			),
		),
	),
	'social-media' => array(
		'text'   => 'Social Media Options',
		'tab_slug' => 'capitola-socials',
		'fields'      => array(
			array(
				'type' => 'sectionstart',
				'heading' => 'Contact Info'
			),
			array(
				'type'  => 'text',
				'label' => 'Facebook Profile',
				'option' => array( 'social_links', 'facebook' ),
				'name'  => 'social_links[facebook]',
				'size'  => 'full',
			),
			array(
				'type'  => 'text',
				'label' => 'Youtube Channel',
				'option' => array( 'social_links', 'youtube' ),
				'name'  => 'social_links[youtube]',
				'size'  => 'full',
			)
		),
	),
);
```

## Instantiating a New `Settings_Form` Class

To add a new settings form instantiate a new `Settings_Form` class with a single properties array. It should be added to the init hook.

```php
use Capitola\Admin_Forms\Settings_Form;

function add_settings_form() {
	$properties = array(
		// properties
	);

	new Settings_Form( $properties );
}

add_action( 'init', 'add_settings_form' );
```
## Footnotes

### parent_slug

If the link should be inside a sidebar group set the group's slug here. If not defined the link will be a top-level link with an icon
Examples:
- `'options-general.php'`: Adds the link to the Settings group.
- `'tools.php'`: Adds the link to the Tools group.
- `'themes.php'`: Adds the link to the Appearance group
- `'edit.php'`: Adds the link to the Posts group
- `'edit.php?post_type=page'`: Adds the link to the Pages group
- `'edit.php?post_type=trip'`: Adds the link to a Trips custom post type group.

You can add the link to any other group. Check the href of the top-level link to determine the correct parent_slug, it should be the slug following 'wp-admin/'.

