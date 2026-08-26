import { ToolbarDropdownMenu, SVG, Path, Rect } from '@wordpress/components';
import {
	justifyCenter,
	justifyLeft,
	justifyRight,
	justifyTop,
	justifyBottom,
	justifyCenterVertical,
	pullLeft,
	pullRight,
	alignCenter,
	alignLeft,
	alignRight,
} from '@wordpress/icons';

const justifyIcons = {
	left: justifyLeft,
	center: justifyCenter,
	right: justifyRight,
	bottom: justifyBottom,
};

const textAlignIcons = {
	left: alignLeft,
	center: alignCenter,
	right: alignRight,
};

const verticalAlignIcons = {
	top: justifyTop,
	center: justifyCenterVertical,
};

const mediaAlignIcons = {
	right: pullLeft,
	left: pullRight,
	top: (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			aria-hidden="true"
			focusable="false"
		>
			<Path d="M 4,5 V 6.4464286 H 16 V 5 Z M 4,9.4464283 H 16 V 7.9999998 H 4 Z M 3.957627,19.016949 H 20.042373 V 13 H 3.9576268 Z" />
		</SVG>
	),
};

const ratioIcons = {
	'16-9': (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="4" y="8" width="16" height="9" rx="1" ry="1" />
		</SVG>
	),
	'3-2': (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="4" y="7" width="16" height="10.67" rx="1" ry="1" />
		</SVG>
	),
	'4-3': (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="4" y="6" width="16" height="12" rx="1" ry="1" />
		</SVG>
	),
	square: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="4" y="4" width="16" height="16" rx="1" ry="1" />
		</SVG>
	),
	'3-4': (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="6" y="4" width="12" height="16" rx="1" ry="1" />
		</SVG>
	),
	'2-3': (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="7" y="4" width="10.67" height="16" rx="1" ry="1" />
		</SVG>
	),
	'9-16': (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="8" y="4" width="9" height="16" rx="1" ry="1" />
		</SVG>
	),
	full: (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
			<Path d="M18 20v-2h2v-1.5H7.75a.25.25 0 0 1-.25-.25V4H6v2H4v1.5h2v8.75c0 .966.784 1.75 1.75 1.75h8.75v2H18ZM9.273 7.5h6.977a.25.25 0 0 1 .25.25v6.977H18V7.75A1.75 1.75 0 0 0 16.25 6H9.273v1.5Z"></Path>
			<Path d="M9 9 L10 9 L15 14 L14 15 Z" />
			<Path d="M14 9 L15 9 L10 14 L9 15 Z" />
		</SVG>
	),
};

const radiusIcons = {
	none: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V6 H20 V4 H4 Z" />
		</SVG>
	),
	xsmall: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V7.5 C6 6.6 6.6 6 7.5 6 H20 V4 H7.5 C5.1 4 4 5.1 4 7.5 Z" />
		</SVG>
	),
	small: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V10 C6 7.8 7.8 6 10 6 H20 V4 H10 C6.7 4 4 6.7 4 10 Z" />
		</SVG>
	),
	medium: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V12 C6 8.7 8.7 6 12 6 H20 V4 H12 C7.6 4 4 7.6 4 12 Z" />
		</SVG>
	),
	large: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V14 C6 9.6 9.6 6 14 6 H20 V4 H14 C8.5 4 4 8.5 4 14 Z" />
		</SVG>
	),
	xlarge: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V16 C6 10.5 10.5 6 16 6 H20 V4 H16 C9.4 4 4 9.4 4 16 Z" />
		</SVG>
	),
};

export function JustifyToolbar( {
	props,
	label = 'Change text alignment',
	attribute,
	options = [ 'left', 'center' ],
} ) {
	const { attributes, setAttributes } = props;
	const value = attributes[ attribute ];

	return (
		<ToolbarDropdownMenu
			icon={ justifyIcons[ value ] }
			label={ label }
			controls={ [
				...( options.includes( 'left' )
					? [
							{
								title: 'Left',
								icon: justifyIcons.left,
								isActive: value === 'left',
								onClick: () => {
									setAttributes( { [ attribute ]: 'left' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'center' )
					? [
							{
								title: 'Center',
								icon: justifyIcons.center,
								isActive: value === 'center',
								onClick: () => {
									setAttributes( {
										[ attribute ]: 'center',
									} );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'right' )
					? [
							{
								title: 'Right',
								icon: justifyIcons.right,
								isActive: value === 'right',
								onClick: () => {
									setAttributes( { [ attribute ]: 'right' } );
								},
							},
					  ]
					: [] ),
			] }
		/>
	);
}

export function VerticalAlignToolbar( { props, attribute, label = 'Change vertical alignment' } ) {
	const { attributes, setAttributes } = props;
	const value = attributes[ attribute ];

	return (
		<ToolbarDropdownMenu
			icon={ verticalAlignIcons[ value ] }
			label={ label }
			controls={ [
				{
					title: 'Top',
					icon: verticalAlignIcons.top,
					isActive: value === 'top',
					onClick: () => {
						setAttributes( { [ attribute ]: 'top' } );
					},
				},
				{
					title: 'Center',
					icon: verticalAlignIcons.center,
					isActive: value === 'center',
					onClick: () => {
						setAttributes( { [ attribute ]: 'center' } );
					},
				},
			] }
		/>
	);
}

export function IntroAlignToolbar( {
	props,
	attribute,
	options = [ 'right', 'left', 'top' ],
	label = 'Change intro position',
} ) {
	const { attributes, setAttributes } = props;
	const value = attributes[ attribute ];

	return (
		<ToolbarDropdownMenu
			icon={ mediaAlignIcons[ value ] }
			label={ label }
			controls={ [
				...( options.includes( 'right' )
					? [
							{
								title: 'Show intro on right',
								icon: pullLeft,
								isActive: value === 'right',
								onClick: () => {
									setAttributes( { [ attribute ]: 'right' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'left' )
					? [
							{
								title: 'Show intro on left',
								icon: pullRight,
								isActive: value === 'left',
								onClick: () => {
									setAttributes( { [ attribute ]: 'left' } );
								},
							},
					  ]
					: [] ),
				,
				...( options.includes( 'top' )
					? [
							{
								title: 'Show intro on top',
								icon: mediaAlignIcons.top,
								isActive: value === 'top',
								onClick: () => {
									setAttributes( { [ attribute ]: 'top' } );
								},
							},
					  ]
					: [] ),
			] }
		/>
	);
}

export function AspectRatioToolbar( {
	props,
	attribute,
	options,
	label = 'Change media aspect ratio',
} ) {
	const { attributes, setAttributes } = props;
	const value = attributes[ attribute ];

	return (
		<ToolbarDropdownMenu
			icon={ ratioIcons[ value ] }
			label={ label }
			controls={ [
				...( options.includes( '16-9' )
					? [
							{
								title: '16/9',
								icon: ratioIcons[ '16-9' ],
								isActive: value === '16-9',
								onClick: () => {
									setAttributes( { [ attribute ]: '16-9' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( '3-2' )
					? [
							{
								title: '3/2',
								icon: ratioIcons[ '3-2' ],
								isActive: value === '3-2',
								onClick: () => {
									setAttributes( { [ attribute ]: '3-2' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( '4-3' )
					? [
							{
								title: '4/3',
								icon: ratioIcons[ '4-3' ],
								isActive: value === '4-3',
								onClick: () => {
									setAttributes( { [ attribute ]: '4-3' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'square' )
					? [
							{
								title: 'Square',
								icon: ratioIcons.square,
								isActive: value === 'square',
								onClick: () => {
									setAttributes( { [ attribute ]: 'square' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( '3-4' )
					? [
							{
								title: '3/4',
								icon: ratioIcons[ '3-4' ],
								isActive: value === '3-4',
								onClick: () => {
									setAttributes( { [ attribute ]: '3-4' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( '2-3' )
					? [
							{
								title: '2/3',
								icon: ratioIcons[ '2-3' ],
								isActive: value === '2-3',
								onClick: () => {
									setAttributes( { [ attribute ]: '2-3' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( '9-16' )
					? [
							{
								title: '9/16',
								icon: ratioIcons[ '9-16' ],
								isActive: value === '9-16',
								onClick: () => {
									setAttributes( { [ attribute ]: '9-16' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'full' )
					? [
							{
								title: 'Full Image',
								icon: ratioIcons.full,
								isActive: value === 'full',
								onClick: () => {
									setAttributes( { [ attribute ]: 'full' } );
								},
							},
					  ]
					: [] ),
			] }
		/>
	);
}

export function RadiusToolbar( {
	props,
	attribute,
	options = [ 'none', 'xsmall', 'small', 'medium', 'large', 'xlarge' ],
} ) {
	const { attributes, setAttributes } = props;
	const value = attributes[ attribute ];

	return (
		<ToolbarDropdownMenu
			icon={ radiusIcons[ value ] }
			label="Change border radius"
			controls={ [
				...( options.includes( 'none' )
					? [
							{
								title: 'None',
								icon: radiusIcons.none,
								isActive: value === 'none',
								onClick: () => {
									setAttributes( { [ attribute ]: 'none' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'xsmall' )
					? [
							{
								title: 'X-Small',
								icon: radiusIcons.xsmall,
								isActive: value === 'xsmall',
								onClick: () => {
									setAttributes( { [ attribute ]: 'xsmall' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'small' )
					? [
							{
								title: 'Small',
								icon: radiusIcons.small,
								isActive: value === 'small',
								onClick: () => {
									setAttributes( { [ attribute ]: 'small' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'medium' )
					? [
							{
								title: 'Medium',
								icon: radiusIcons.medium,
								isActive: value === 'medium',
								onClick: () => {
									setAttributes( {
										[ attribute ]: 'medium',
									} );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'large' )
					? [
							{
								title: 'Large',
								icon: radiusIcons.large,
								isActive: value === 'large',
								onClick: () => {
									setAttributes( { [ attribute ]: 'large' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'xlarge' )
					? [
							{
								title: 'X-Large',
								icon: radiusIcons.xlarge,
								isActive: value === 'xlarge',
								onClick: () => {
									setAttributes( { [ attribute ]: 'xlarge' } );
								},
							},
					  ]
					: [] ),
			] }
		/>
	);
}

export function TextAlignToolbar( { props, attribute, options = [ 'left', 'center' ] } ) {
	const { attributes, setAttributes } = props;
	const value = attributes[ attribute ];

	return (
		<ToolbarDropdownMenu
			icon={ textAlignIcons[ value ] }
			label="Change text alignment"
			controls={ [
				...( options.includes( 'left' )
					? [
							{
								title: 'Left',
								icon: textAlignIcons.left,
								isActive: value === 'left',
								onClick: () => {
									setAttributes( { [ attribute ]: 'left' } );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'center' )
					? [
							{
								title: 'Center',
								icon: textAlignIcons.center,
								isActive: value === 'center',
								onClick: () => {
									setAttributes( {
										[ attribute ]: 'center',
									} );
								},
							},
					  ]
					: [] ),
				...( options.includes( 'right' )
					? [
							{
								title: 'Right',
								icon: textAlignIcons.right,
								isActive: value === 'right',
								onClick: () => {
									setAttributes( { [ attribute ]: 'right' } );
								},
							},
					  ]
					: [] ),
			] }
		/>
	);
}
