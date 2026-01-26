<?php

namespace cwps\posts\termFields;

use cwps\adminForms\CWPS_Term_Form;

add_action( 'init', __NAMESPACE__ . '\add_term_fields', 99 );

function add_term_fields() {
	new CWPS_Term_Form(
		array(
			'taxonomy' => 'category',
			'fields' => array(
				CWPS_Term_Form::$term_thumb,
				CWPS_Term_Form::$term_page,
			),
		)
	);
}
