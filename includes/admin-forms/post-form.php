<?php

namespace Capitola\Admin_Forms;

require_once 'fields.php';

class Post_Form extends Fields {
	protected $fields;
	protected $post_type;
	protected $box_title;
	protected $box_id;

	public function __construct( $args ) {
		$this->fields = $args['fields'];
		$this->post_type = $args['post_type'];
		$this->box_title = $args['box_title'];
		$this->box_id = $args['box_id'];

		add_action( 'add_meta_boxes', array( $this, 'register_meta_box' ), 99, 2 );
		add_action( 'save_post_' . $this->post_type, array( $this, 'save_meta' ), 99, 2 );
	}

	public function register_meta_box( $post_type, $post ) {
		add_meta_box( $this->box_id, $this->box_title, array( $this, 'meta_box' ), $this->post_type );
	}

	public function meta_box( $post ) {
		?>
		<?php wp_nonce_field( 'capitola_post_form', 'capitola_post_nonce' ); ?>
		<table class="form-table" role="presentation">
			<tbody>
				<?php
				foreach ( $this->fields as $field ) :
					$value = self::FIELD_VALUE( $field, $post );
					$field = self::set_field_id( $field );
					?>
					<tr id="field-row-<?= esc_attr( $field['id'] ); ?>">
						<th scope="row">
							<label for="<?= esc_attr( $field['id'] ); ?>">
								<?= esc_html( $field['label'] ); ?>
							</label>
						</th>
						<td>
							<?php self::echo_field( $field, $value ); ?>
						</td>
					</tr>
					<?php
				endforeach;
				?>
			</tbody>
		</table>
		<?php
	}

	public function save_meta( $post_id, $post ) {
		$nonce = isset( $_POST['capitola_post_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['capitola_post_nonce'] ) ) : '';
		if ( empty( $nonce ) || ! wp_verify_nonce( $nonce, 'capitola_post_form' ) ) {
			return;
		}
		$post_data = filter_input_array( INPUT_POST, FILTER_UNSAFE_RAW );

		foreach ( $this->fields as $field ) {
			$field_name = isset( $field['name'] ) ? sanitize_key( $field['name'] ) : '';

			if ( $field_name && is_array( $post_data ) && array_key_exists( $field_name, $post_data ) ) {
				$raw_value = wp_unslash( $post_data[ $field_name ] );
				$value = is_array( $raw_value ) ? array_map( 'sanitize_text_field', $raw_value ) : sanitize_text_field( $raw_value );
				if ( $value ) {
					update_post_meta( $post_id, $field_name, $value );
				} else {
					delete_post_meta( $post_id, $field_name );
				}
			} elseif ( $field_name && 'checkbox' === $field['type'] ) {
				delete_post_meta( $post_id, $field_name );
			}
		}
	}

	protected static function FIELD_VALUE( $field, $post ) {
		return get_post_meta( $post->ID, $field['name'], true );
	}
}
