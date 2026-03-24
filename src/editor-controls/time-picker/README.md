# TimePicker

A WordPress Gutenberg editor control component for selecting times. For use in block editor templates, it displays a button with a clock icon and formatted time, and when clicked, opens a dropdown with hour, minute, and AM/PM selection controls.

![TimePicker Screenshot](../_screenshots/TimePicker-1.png)

## Properties

| Property          | Type       | Required | Default        | Description |
|-------------------|------------|----------|----------------|-------------|
| `value`           | `string`   | Yes      |                | Current time value in ISO format |
| `onChange`        | `function` | Yes      |                | Callback function when the time value changes |
| `onClear`         | `function` | No       |                | Optional callback function to clear the selected time |
| `label`           | `string`   | No       |                | Label for the control |
| `yearPlaceholder` | `string`   | No       | `'1972-01-01'` | Year placeholder for constructing ISO datetime string |

## Value Structure

The `value` prop should be a string in ISO datetime format:

```javascript
"1972-01-01T14:30:00"
```

Note: The date portion is used as a placeholder and defaults to 1972-01-01, but can be customized via the `yearPlaceholder` prop.

## Control States

The interface adapts based on the current state:

- **No time selected**: Shows "Select Time" placeholder text
- **Time selected**: Shows formatted time in 12-hour format (e.g., "2:30 PM")
- **Clear button**: Appears when `onClear` prop is provided and a time is selected

## Features

- **Time Selection**: Hour dropdown (1-12) with AM/PM toggle and minute selection (5-minute intervals)
- **12-Hour Format**: Displays time in familiar 12-hour format with AM/PM
- **Minute Intervals**: 5-minute intervals (00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55)
- **Internationalization**: Uses WordPress date formatting for display
- **Clear Functionality**: Optional clear button to remove selected time

## Related Components

- [WordPress DatePicker Component](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/date-picker)

## Usage

### Import

```jsx
import { TimePicker } from '../../editor-controls';
```

### Basic Time Picker Control

```jsx
<TimePicker
	label="Event Time"
	value={ attributes.eventTime }
	onChange={ ( value ) => {
		setAttributes( { eventTime: value } );
	} }
	onClear={ () => {
		setAttributes( { eventTime: '' } );
	} }
/>
```

### Time Picker Without Clear Option

```jsx
<TimePicker
	label="Start Time"
	value={ attributes.startTime }
	onChange={ ( value ) => {
		setAttributes( { startTime: value } );
	} }
/>
```

### Time Picker with Custom Year Placeholder

```jsx
<TimePicker
	label="Meeting Time"
	value={ attributes.meetingTime }
	yearPlaceholder="2024-01-01"
	onChange={ ( value ) => {
		setAttributes( { meetingTime: value } );
	} }
/>
```
