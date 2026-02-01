<?php

namespace Capitola\Admin_Forms;

require_once 'fields.php';

class Term_Form extends Fields {

	public static $term_thumb = array(
		'id' => 'term_thumb_id',
		'name' => 'term_thumb_id',
		'label' => 'Thumbnail Image',
		'type' => 'image',
		'default' => 0,
	);

	public static $term_page = array(
		'id' => 'term_page_id',
		'name' => 'term_page_id',
		'label' => 'Term Landing Page',
		'type' => 'page_select',
		'default' => 0,
		'help' => 'If a page is selected, links to this term will point to the selected page. Otherise, links will point the the post type\'s archive page.',
	);

	protected $taxonomy;
	protected $fields;

	public function __construct( $args ) {
		$this->taxonomy = $args['taxonomy'];
		$this->fields = $args['fields'];

		add_action( $this->taxonomy . '_add_form_fields', array( $this, 'new_term_form' ), 20, 2 );
		add_action( $this->taxonomy . '_edit_form_fields', array( $this, 'edit_term_form' ), 10, 2 );
		add_action( 'create_' . $this->taxonomy, array( $this, 'save_fields' ), 10, 2 );
		add_action( 'edited_' . $this->taxonomy, array( $this, 'save_fields' ), 10, 2 );
	}

	public function new_term_form() {
		wp_nonce_field( 'capitola_term_form', 'capitola_term_nonce' );

		foreach ( $this->fields as $field ) :
			$field = self::set_field_id( $field );
			$field['class'] = $field['class'] ?? '';
			$field['class'] .= ' capitola-add-clear';
			?>
			<div id="field-row-<?= esc_attr( $field['id'] ) ?>" class="form-field">
				<label for="<?= esc_attr( $field['id'] ) ?>"><?= esc_html( $field['label'] ) ?></label>
				<?php self::ECHO_FIELD( $field, $field['default'] ?? '' ); ?>
			</div>
			<?php
		endforeach;
	}

	public function edit_term_form( $term ) {
		wp_nonce_field( 'capitola_term_form', 'capitola_term_nonce' );
		foreach ( $this->fields as $field ) :
			$field = self::set_field_id( $field );
			$value = self::FIELD_VALUE( $field, $term, 0 );
			?>
			<tr class="form-field" id="field-row-<?= esc_attr( $field['id'] ) ?>">
				<th scope="row" valign="top">
					<?= esc_html( $field['label'] ) ?>
				</th>
				<td>
					<?php self::echo_field( $field, $value ); ?>
				</td>
			</tr>
			<?php
		endforeach;
	}

	public function save_fields( $term_id ) {
		$nonce = isset( $_POST['capitola_term_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['capitola_term_nonce'] ) ) : '';
		if ( empty( $nonce ) || ! wp_verify_nonce( $nonce, 'capitola_term_form' ) ) {
			return;
		}
		$post_data = filter_input_array( INPUT_POST, FILTER_UNSAFE_RAW );
		foreach ( $this->fields as $field ) {
			$field_name = isset( $field['name'] ) ? sanitize_key( $field['name'] ) : '';
			if ( $field_name && is_array( $post_data ) && array_key_exists( $field_name, $post_data ) ) {
				$raw_value = wp_unslash( $post_data[ $field_name ] );
				$value = is_array( $raw_value ) ? array_map( 'sanitize_text_field', $raw_value ) : sanitize_text_field( $raw_value );
				if ( $value ) {
					update_term_meta( $term_id, $field_name, $value );
				} else {
					delete_term_meta( $term_id, $field_name );
				}
			} elseif ( $field_name && $field['type'] === 'checkbox' ) {
				delete_term_meta( $term_id, $field_name );
			}
		}
	}

	protected static function FIELD_VALUE( $field, $term, $fallback = '' ) {
		return $term ? get_term_meta( $term->term_id, $field['name'], true ) : $fallback;
	}
}
