# User Form Fields

The `User_Form` class adds custom fields to user the user profile form.

## Field Appearance
Fields are built using WordPress' native form structure and styles. This provides a seamless implementation of your fields into the user form.

## Properties
Before instantiating the class you'll need to build an array of properties.

| Property   | Type    | Required | Description |
|------------|---------|----------|-------------|
| `priority` | int     | No       | Position where your fields will appear in the default form |
| `fields`   | array   | Yes      | Accepts an array of field definition arrays, as described in the [Field Reference](./field-reference) doc |

## The `sectionstart` Field Type
The `User_Form` class includes a `sectionstart` field type that can be added with your fields. This allows you to add headings or descriptions before your fields or between fields for improved organization. Properties include:

| Property  | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `type`    | string | Yes      | Must be `'sectionend'` |
| `heading` | string | No       | Heading to display |
| `desc`    | string | No       | Additional text to describe the purpose of the fields |

While the `'heading'` and `'desc'` properties are both optional, at least one should be included.

## Example Implementation
Here we add a profile image field to the user form:

```php
function add_user_fields() {
	new User_Form(
		array(
			'priority' => 5,
			'fields'   => array(
				array(
					'type'  => 'sectionstart',
					'heading' => 'Public User Details',
					'desc' => 'These are public-facing details that are used in front-end templates.',
				),
				array(
					'label' => 'Profile Picture',
					'name'  => 'userProfilePhoto',
					'type'  => 'media',
					'help'  => 'Photo to display where post author details are displayed.',
				),
			),
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\add_user_fields' );
```
