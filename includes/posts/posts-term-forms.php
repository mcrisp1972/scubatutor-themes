<?php

namespace cwps\posts\termFields;

use cwps\adminForms\Capitola_Term_Form;

add_action( 'init', __NAMESPACE__ . '\add_term_fields', 99 );

function add_term_fields() {
	new Capitola_Term_Form(
		array(
			'taxonomy' => 'category',
			'fields' => array(
				Capitola_Term_Form::$term_thumb,
				Capitola_Term_Form::$term_page,
			),
		)
	);
}
