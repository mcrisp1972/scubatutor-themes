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
	'21-9': (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="4" y="8.5" width="16" height="6.86" rx="1" ry="1" />
		</SVG>
	),
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
	1: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Rect x="4" y="4" width="16" height="16" rx="1" ry="1" />
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
	small: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V10 Q6 6 10 6 H20 V4 H10 Q4 4 4 10 Z" />
		</SVG>
	),
	medium: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V12 Q6 6 12 6 H20 V4 H12 Q4 4 4 12 Z" />
		</SVG>
	),
	large: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<Path d="M4 20 H6 V14 Q6 6 14 6 H20 V4 H14 Q4 4 4 14 Z" />
		</SVG>
	),
	arch: (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -2 24 26">
			<Path d="M4 20 H6 V6 A6 6 0 0 1 18 6 V20 H20 V6 A8 8 0 0 0 4 6 Z" />
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
									setAttributes( { [ attribute ]: 'center' } );
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

export function AspectRatioToolbar( { props, attribute, options, label = 'Change media aspect ratio' } ) {
	const { attributes, setAttributes } = props;
	const value = attributes[ attribute ];

	return (
		<ToolbarDropdownMenu
			icon={ ratioIcons[ value ] }
			label={ label }
			controls={ [
				...( options.includes( '21-9' )
					? [
							{
								title: '21/9',
								icon: ratioIcons[ '21-9' ],
								isActive: value === '21-9',
								onClick: () => {
									setAttributes( { [ attribute ]: '21-9' } );
								},
							},
					  ]
					: [] ),
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
				...( options.includes( '1' )
					? [
							{
								title: 'Square',
								icon: ratioIcons[ '1' ],
								isActive: value === '1',
								onClick: () => {
									setAttributes( { [ attribute ]: '1' } );
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

export function RadiusToolbar( { props, attribute, options = [ 'none', 'small', 'medium', 'large', 'arch' ] } ) {
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
									setAttributes( { [ attribute ]: 'medium' } );
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
				...( options.includes( 'arch' )
					? [
							{
								title: 'Arch',
								icon: radiusIcons.arch,
								isActive: value === 'arch',
								onClick: () => {
									setAttributes( { [ attribute ]: 'arch' } );
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
									setAttributes( { [ attribute ]: 'center' } );
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
