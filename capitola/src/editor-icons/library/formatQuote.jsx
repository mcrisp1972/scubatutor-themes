import { SVG, Path } from '@wordpress/components';

// https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aformat_list_numbered_rtl%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4024
const formatQuote = (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 0 24 24"
		width="24px"
		fill="#000000"
	>
		<path d="M0 0h24v24H0V0z" fill="none" />
		<Path d="M7.17 17c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94zm10 0c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94z" />
	</SVG>
);

export default formatQuote;
