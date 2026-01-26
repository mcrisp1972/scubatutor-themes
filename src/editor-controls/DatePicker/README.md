# DatePicker

A WordPress Gutenberg editor control component for selecting dates. For use in block editor templates, it displays a button with a calendar icon and formatted date, and when clicked, opens a dropdown with a date picker interface.

![DatePicker Screenshot](../_screenshots/DatePicker-1.png)

![DatePicker Screenshot](../_screenshots/DatePicker-2.png)

![DatePicker Screenshot](../_screenshots/DatePicker-3.png)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | **Required.** Current date value in ISO format |
| `onChange` | `Function` | - | **Required.** Callback function when the date value changes |
| `onClear` | `Function` | - | Optional callback function to clear the selected date |
| `label` | `string` | - | Label for the control |

## Value Structure

The `value` prop should be a string in ISO date format:

```javascript
"2024-01-15T00:00:00.000Z"
```

## Control States

The interface adapts based on the current state:

- **No date selected**: Shows "Select Date" placeholder text
- **Date selected**: Shows formatted date using WordPress date settings
- **Clear button**: Appears when `onClear` prop is provided and a date is selected

## Features

- **Date Selection**: WordPress CoreDatePicker integration for intuitive date picking
- **Internationalization**: Uses WordPress date settings for formatting
- **Timezone Support**: Automatically detects and uses current timezone
- **Clear Functionality**: Optional clear button to remove selected date
- **Accessible**: Proper ARIA attributes and keyboard navigation support
- **Responsive**: Dropdown positioning adapts to available space

## Related Components

- [WordPress DatePicker Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/date-picker)

## Usage

### Import
```jsx
import { DatePicker } from '../../editor-controls';
```

### Basic Date Picker Control

```jsx

<DatePicker
    label="Event Date"
    value={ attributes.eventDate }
    onChange={ ( value ) => {
        setAttributes( { eventDate: value } );
    } }
    onClear={ () => {
        setAttributes( { eventDate: '' } );
    } }
/>
```

### Date Picker Without Clear Option

```jsx
<DatePicker
    label="Start Date"
    value={ attributes.startDate }
    onChange={ ( value ) => {
        setAttributes( { startDate: value } );
    } }
/>
```
