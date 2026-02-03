<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$capitola_colors        = wp_json_file_decode(
	CAPITOLA_CHILD_THEME_DIR . '/color-themes.json',
	array( 'associative' => true )
);
$capitola_colors        = is_array( $capitola_colors ) ? $capitola_colors : array();
$capitola_color_options = array();
foreach ( $capitola_colors as $capitola_color ) {
	echo wp_kses_post(
		render_block(
			array(
				'blockName'    => 'capitola/post-feed',
				'attrs'        => array(
					'colorTheme'    => $capitola_color['slug'],
					'limit'         => 4,
					'titleLocation' => 'body',
					'showByline'    => false,
				),
				'innerBlocks'  => array(
					array(
						'blockName'    => 'capitola/body-text',
						'attrs'        => array(
							'headline'   => $capitola_color['name'],
							'cta'        => array(
								'title' => 'CTA',
								'url'   => '/',
							),
							'cta2'       => array(
								'title' => 'CTA',
								'url'   => '/',
							),
							'introAlign' => 'top',
						),
						'innerBlocks'  => array(
							array(
								'blockName'    => 'core/paragraph',
								'attrs'        => array(),
								'innerBlocks'  => array(),
								'innerHTML'    => '<p>Praesent ac sem eget est egestas volutpat. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Nulla facilisi. <a href="/">Suspendisse pulvinar</a>, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum volutpat pretium libero.</p>',
								'innerContent' => array( '<p>Praesent ac sem eget est egestas volutpat. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Nulla facilisi. <a href="/">Suspendisse pulvinar</a>, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum volutpat pretium libero.</p>' ),
							),
						),
						'innerHTML'    => '',
						'innerContent' => array( null ),
					),
				),
				'innerHTML'    => '',
				'innerContent' => array( null ),
			)
		)
	);
}
