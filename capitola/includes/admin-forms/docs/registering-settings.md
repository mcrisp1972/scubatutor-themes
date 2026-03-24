# Registering Settings

This doc explains the process of registering custom settings that will be compatible with forms setup using the `Settings_Form` class, as well as WordPress' `add_settings_field()` function.

While the [official docs](https://developer.wordpress.org/reference/functions/register_setting/) should be your first go-to, they can be unclear on how to properly use the `$option_group` parameter, as well as setting up `$args['show_in_rest']`.

## `$option_group`
The official docs describe this parameter as 'A settings group name. Should correspond to an allowed option key name.' They also state that the 'Default allowed option key names include `general'`, `'discussion'`, `'media'`, `'reading'`, `'writing'`, and `'options'`.

So the question is, what option key name should you use?

### Registering Settings For Default WordPress Settings Forms

If you're going to add a field to a default Settings form (General, Writing, Reading, Discussion, Media, Permalinks, Privacy) the `$option_group` must be the slug in the permalink that follows 'wp-admin/options-'. So if you are going to add a field to the General Settings form (/wp-admin/options-general.php), the `$option_group` must be 'general'. And if you're adding a field to the Permalinks form (/wp-admin/options-permalink.php) the `$option_group` must be 'permalink'.

### Registering Settings For Custom Forms

If you're registering a setting that will be included in a custom form using the `Settings_Form` class, the `$option_group` value depends on whether the form uses tabs or is a single-page form.

If the form is a single-page form (no tabs), you must register all settings with the `$option_group` equal to the value of the `'menu_slug'` arg passed to the `Settings_Form`'s `'menu_slug'` arg.

For tabbed form pages, each array in the `'tabs'` arg has its own `'tab_slug'` property. Settings registered for editing in a tab must have its `$option_group` set to the `'tab_slug'`.

## `$args['show_in_rest']`

Before we begin, understand that the settings REST endpoint is only available if logged in, so data is secure.

In many situations we will want some settings to be available in the REST API, especially for displaying content in the editor.

The `register_setting()` `$args` parameter includes an optional `'show_in_rest'` property, which adds the setting to the REST API. It accepts `'bool'` or `'array'`.

If the setting has a `'string'`, `'boolean'`, `'integer'`, or `'number'` type, setting the `'show_in_rest'` property to true easily adds it to the setting REST API. It gets more complicated for `'array'` and `'object'` types, because those require a schema to be assigned as an array. These are documented [here](https://make.wordpress.org/core/2019/10/03/wp-5-3-supports-object-and-array-meta-types-in-the-rest-api/).
