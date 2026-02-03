<?php

namespace Capitola\Admin_Forms;

require_once 'class-fields.php';

/**
 * Registers custom fields for nav menu items.
 */
class Menu_Form extends Fields {
	/**
	 * Sets up the menu form.
	 *
	 * @param array $args Form configuration.
	 */
	public function __construct( $args ) {
		$this->fields        = $args['fields'];
		$this->depth         = $args['depth'];
		$locations           = get_nav_menu_locations();
		$this->menu_location = $args['menu_location'];
		$object              = wp_get_nav_menu_object( $locations[ $this->menu_location ] );
		$this->menu_id       = $object->term_id;
		add_action( 'wp_nav_menu_item_custom_fields', array( $this, 'menu_fields' ), 99, 5 );
		add_action( 'wp_update_nav_menu_item', array( $this, 'save_menu_meta' ), 10, 3 );
	}

	/**
	 * Renders custom fields in the menu item editor.
	 *
	 * @param int    $id                Menu item ID.
	 * @param object $menu_item         Menu item object.
	 * @param int    $depth             Menu depth.
	 * @param array  $args              Menu args.
	 * @param int    $current_object_id Current object ID.
	 * @return void
	 */
	public function menu_fields( $id, $menu_item, $depth, $args, $current_object_id ) {
		// this seems to reliably get the correct current menu.
		$menu_id = absint( get_user_option( 'nav_menu_recently_edited' ) );

		if ( (int) $menu_id === (int) $this->menu_id && (int) $depth === (int) $this->depth ) {
			wp_nonce_field( 'capitola_menu_form', 'capitola_menu_nonce' );

			foreach ( $this->fields as $field ) :
				$value          = get_post_meta( $id, $field['name'], true );
				$field          = self::set_field_id( $field );
				$field['id']   .= '-' . $id;
				$field['name'] .= '[' . $id . ']';
				if ( 'wysiwyg' === $field['type'] ) {
					$field['mce_id'] = $field['id'] . '-' . $id;
				}
				?>
				<div style="margin-top: 8px;" id="field-row-<?php echo esc_attr( $field['id'] ); ?>">
					<div>
						<label for="<?php echo esc_attr( $field['id'] ); ?>"><?php echo esc_html( $field['label'] ); ?></label>
					</div>
					<?php self::echo_field( $field, $value ); ?>
				</div>
				<?php
			endforeach;
		}
	}

	/**
	 * Saves menu item meta for custom fields.
	 *
	 * @param int   $menu_id         Menu ID.
	 * @param int   $menu_item_db_id Menu item ID.
	 * @param array $args            Menu args.
	 * @return void
	 */
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
					$value     = is_array( $raw_value ) ? array_map( 'sanitize_text_field', $raw_value ) : sanitize_text_field( $raw_value );
					if ( $value ) {
						update_post_meta( $menu_item_db_id, $field_name, $value );
					} else {
						delete_post_meta( $menu_item_db_id, $field_name );
					}
				} elseif ( $field_name && 'checkbox' === $field['type'] ) {
					delete_post_meta( $menu_item_db_id, $field_name );
				}
			}
		}
	}
}
