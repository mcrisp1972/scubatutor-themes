export function templatePostType( template ) {
	const n = template.lastIndexOf( '//' );
	const clean = template.substring( n + 2 );

	switch ( clean ) {
		case 'single-class':
			return 'course';
		case 'single-course':
			return 'course';
		case 'single-staff':
			return 'staff';
		case 'single-trip':
			return 'trip';
		case 'single-tribe_events':
			return 'tribe_events';
		case 'single-product':
			return 'product';
		default:
			return 'post';
	}
}
