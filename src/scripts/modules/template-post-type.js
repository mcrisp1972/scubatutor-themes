import { applyFilters } from '@wordpress/hooks';

export function templatePostType( template ) {
	const n = template.lastIndexOf( '//' );
	const clean = template.substring( n + 2 ).replace( 'single-', '' );

	return applyFilters( 'capitola.templatePostType', 'post', clean, template );
}
