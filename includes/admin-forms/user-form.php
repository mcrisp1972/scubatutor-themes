<?php

namespace Capitola\Admin_Forms;

require_once 'fields.php';

class User_Form extends Fields {
	protected $fields;

	public function __construct( $args ) {
		$this->fields = $args['fields'];
		$priority = isset( $args['priority'] ) ? $args['priority'] : 5;

		add_action( 'show_user_profile', array( $this, 'edit_user_form' ), $priority );
		add_action( 'edit_user_profile', array( $this, 'edit_user_form' ), $priority );

		add_action( 'personal_options_update', array( $this, 'save_user_fields' ) );
		add_action( 'edit_user_profile_update', array( $this, 'save_user_fields' ) );
	}

	public function edit_user_form( $user ) {
		wp_nonce_field( 'capitola_user_form', 'capitola_user_nonce' );
		foreach ( $this->fields as $field ) :
			?>
			<?php if ( $field['type'] === 'title' ) : ?>
				<h2><?= esc_html( $field['title'] ) ?></h2>
				<table class="form-table">
					<tbody>

			<?php elseif ( $field['type'] === 'sectionend' ) : ?>
					</tbody>
				</table>
				<?php
			else :
				$value = get_user_meta( $user->ID, $field['name'], true );
				$field = self::set_field_id( $field );
				?>
				<tr class="form-field" id="field-row-<?= esc_attr( $field['id'] ) ?>">
					<th scope="row" valign="top">
						<?= esc_html( $field['label'] ) ?>
					</th>
					<td>
						<?php self::echo_field( $field, $value ); ?>
					</td>
				</tr>
			<?php endif; ?>
			<?php
		endforeach;
	}

	public function save_user_fields( $user_id ) {
		$nonce = isset( $_POST['capitola_user_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['capitola_user_nonce'] ) ) : '';
		if ( empty( $nonce ) || ! wp_verify_nonce( $nonce, 'capitola_user_form' ) ) {
			return;
		}
		$post_data = filter_input_array( INPUT_POST, FILTER_UNSAFE_RAW );

		foreach ( $this->fields as $field ) {
			$field_name = isset( $field['name'] ) ? (string) $field['name'] : '';
			if ( $field_name && is_array( $post_data ) && array_key_exists( $field_name, $post_data ) ) {
				$raw_value = wp_unslash( $post_data[ $field_name ] );
				$value = is_array( $raw_value ) ? array_map( 'sanitize_text_field', $raw_value ) : sanitize_text_field( $raw_value );
				if ( $value ) {
					update_user_meta( $user_id, $field_name, $value );
				} else {
					delete_user_meta( $user_id, $field_name );
				}
			} elseif ( $field_name && $field['type'] === 'checkbox' ) {
				delete_user_meta( $user_id, $field_name );
			}
		}
	}
}
