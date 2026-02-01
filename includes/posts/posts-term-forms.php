<?php

namespace Capitola\Post_Types\Posts\Term_Fields;

use Capitola\Admin_Forms\Term_Form;

add_action( 'init', __NAMESPACE__ . '\add_term_fields', 99 );

function add_term_fields() {
	new Term_Form(
		array(
			'taxonomy' => 'category',
			'fields' => array(
				Term_Form::$term_thumb,
				Term_Form::$term_page,
			),
		)
	);
}
