<?php

namespace cwps\attachments\fields;

add_action( 'init', __NAMESPACE__ . '\add_media_fields', 99 );

function add_media_fields() {

	register_post_meta(
		'attachment',
		'example_image',
		array(
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true,
		)
	);

	new \cwps\adminForms\Capitola_Attachment_Form(
		array(
			'fields' => array(
				array(
					'name' => 'example_image',
					'label' => 'Use for examples',
					'type' => 'checkbox',
				),
			),
		)
	);
}
