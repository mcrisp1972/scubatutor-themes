# DateTimePicker

A WordPress Gutenberg editor control component for selecting both dates and times. For use in block editor templates, it displays a button with a calendar icon and formatted date/time, and when clicked, opens a dropdown with a date picker interface and time selection controls.

![DateTimePicker Screenshot](../_screenshots/DateTimePicker-1.png)

![DateTimePicker Screenshot](../_screenshots/DateTimePicker-2.png)

## Properties

| Property   | Type       | Required | Description |
|------------|------------|----------|-------------|
| `value`    | `string`   | Yes      | Current date/time value in ISO format |
| `onChange` | `function` | Yes      | Callback function when the date/time value changes |
| `onClear`  | `function` | No       | Optional callback function to clear the selected date/time |
| `label`    | `string`   | No       | Label for the control |

## Value Structure

The `value` prop should be a string in ISO date/time format:

```javascript
"2024-01-15T14:30:00"
```

## Control States

The interface adapts based on the current state:

- **No date/time selected**: Shows "Select Date" placeholder text
- **Date/time selected**: Shows formatted date/time using WordPress date settings (e.g., "January 15, 2024, 2:30pm")
- **Clear button**: Appears when `onClear` prop is provided and a date/time is selected

## Features

- **Date Selection**: WordPress CoreDatePicker integration for intuitive date picking
- **Time Selection**: Hour and minute dropdowns with AM/PM toggle
- **Internationalization**: Uses WordPress date settings for formatting
- **Timezone Support**: Automatically detects and uses current timezone
- **Clear Functionality**: Optional clear button to remove selected date/time
- **Accessible**: Proper ARIA attributes and keyboard navigation support
- **Responsive**: Dropdown positioning adapts to available space
- **Time Format**: 12-hour format with 5-minute intervals for minutes

## Time Selection Details

- **Hours**: 12-hour format (1-12) with AM/PM toggle
- **Minutes**: 5-minute intervals (00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55)
- **AM/PM Toggle**: ToggleGroupControl for switching between AM and PM

## Related Components

- [WordPress DatePicker Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/date-picker)

## Usage

### Import
```jsx
import { DateTimePicker } from '../../editor-controls';
```

### Basic Date/Time Picker Control

```jsx
<DateTimePicker
	label="Event Date & Time"
	value={ attributes.eventDateTime }
	onChange={ ( value ) => {
		setAttributes( { eventDateTime: value } );
	} }
	onClear={ () => {
		setAttributes( { eventDateTime: '' } );
	} }
/>
```

### Date/Time Picker Without Clear Option

```jsx
<DateTimePicker
	label="Start Date & Time"
	value={ attributes.startDateTime }
	onChange={ ( value ) => {
		setAttributes( { startDateTime: value } );
	} }
/>
```

### Example with Default Time

```jsx
<DateTimePicker
	label="Meeting Time"
	value={ attributes.meetingTime || '2024-01-15T09:00:00' }
	onChange={ ( value ) => {
		setAttributes( { meetingTime: value } );
	} }
/>
```
