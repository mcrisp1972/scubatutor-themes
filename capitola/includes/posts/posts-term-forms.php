<?php

namespace Capitola\Post_Types\Posts\Term_Fields;

use Capitola\Admin_Forms\Term_Form;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers term fields for post categories.
 *
 * @return void
 */
function add_term_fields() {
	new Term_Form(
		array(
			'taxonomy' => 'category',
			'fields'   => array(
				Term_Form::$term_thumb,
				Term_Form::$term_page,
			),
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\add_term_fields' );
