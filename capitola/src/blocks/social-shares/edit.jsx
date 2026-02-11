import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function Edit() {
	const [ socials, setSocials ] = useState( null );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( result ) => {
			setSocials( result.capitola_social_shares );
		} );
	}, [] );

	return (
		<div { ...useBlockProps( { className: 'alignwide' } ) }>
			{ !! socials && (
				<div className="wp-block-capitola-social-shares__social-links">
					{ Object.keys( socials ).map( ( key ) => {
						if ( socials[ key ] === 1 ) {
							return (
								<div
									key={ key }
									className={
										'wp-block-capitola-social-shares__social-link --' + key
									}
								></div>
							);
						}
						return null;
					} ) }
				</div>
			) }
		</div>
	);
}
