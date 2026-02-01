<?php

namespace Capitola\Admin_Forms;

require_once 'fields.php';

class Menu_Form extends Fields {
	public function __construct( $args ) {
		$this->fields = $args['fields'];
		$this->depth = $args['depth'];
		$locations = get_nav_menu_locations();
		$this->menu_location = $args['menu_location'];
		$object = wp_get_nav_menu_object( $locations[ $this->menu_location ] );
		$this->menu_id = $object->term_id;
		add_action( 'wp_nav_menu_item_custom_fields', array( $this, 'menu_fields' ), 99, 5 );
		add_action( 'wp_update_nav_menu_item', array( $this, 'save_menu_meta' ), 10, 3 );
	}

	public function menu_fields( $id, $menu_item, $depth, $args, $current_object_id ) {
		// this seems to reliably get the correct current menu
		$menu_id = absint( get_user_option( 'nav_menu_recently_edited' ) );

		if ( (int) $menu_id === (int) $this->menu_id && (int) $depth === (int) $this->depth ) {
			wp_nonce_field( 'capitola_menu_form', 'capitola_menu_nonce' );

			foreach ( $this->fields as $field ) :
				$value = get_post_meta( $id, $field['name'], true );
				$field = self::set_field_id( $field );
				$field['id'] .= '-' . $id;
				$field['name'] .= '[' . $id . ']';
				if ( $field['type'] === 'wysiwyg' ) {
					$field['mce_id'] = $field['id'] . '-' . $id;
				}
				?>
				<div style="margin-top: 8px;" id="field-row-<?= esc_attr( $field['id'] ) ?>">
					<div>
						<label for="<?= esc_attr( $field['id'] ) ?>"><?= esc_html( $field['label'] ) ?></label>
					</div>
					<?php self::echo_field( $field, $value ); ?>
				</div>
				<?php
			endforeach;
		}
	}

	public function save_menu_meta( $menu_id, $menu_item_db_id, $args ) {
		$nonce = isset( $_POST['capitola_menu_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['capitola_menu_nonce'] ) ) : '';
		if ( empty( $nonce ) || ! wp_verify_nonce( $nonce, 'capitola_menu_form' ) ) {
			return;
		}
		if ( (int) $menu_id === (int) $this->menu_id ) {
			$post_data = filter_input_array( INPUT_POST, FILTER_UNSAFE_RAW );

			foreach ( $this->fields as $field ) {
				$field_name = isset( $field['name'] ) ? sanitize_key( $field['name'] ) : '';
				if ( $field_name && is_array( $post_data ) && isset( $post_data[ $field_name ] ) && is_array( $post_data[ $field_name ] ) && array_key_exists( $menu_item_db_id, $post_data[ $field_name ] ) ) {
					$raw_value = wp_unslash( $post_data[ $field_name ][ $menu_item_db_id ] );
					$value = is_array( $raw_value ) ? array_map( 'sanitize_text_field', $raw_value ) : sanitize_text_field( $raw_value );
					if ( $value ) {
						update_post_meta( $menu_item_db_id, $field_name, $value );
					} else {
						delete_post_meta( $menu_item_db_id, $field_name );
					}
				} elseif ( $field_name && $field['type'] === 'checkbox' ) {
					delete_post_meta( $menu_item_db_id, $field_name );
				}
			}
		}
	}
}
