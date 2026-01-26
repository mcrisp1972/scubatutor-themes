<?php

namespace cwps\adminForms;

require_once 'fields.php';

class CWPS_Post_Form extends CWPS_Fields {
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
		<table class="form-table" role="presentation">
			<tbody>
				<?php
				foreach ( $this->fields as $field ) :
					$value = self::FIELD_VALUE( $field, $post );
					$field = self::set_field_id( $field );
					?>
					<tr id="field-row-<?= esc_attr( $field['id'] ) ?>">
						<th scope="row">
							<label for="<?= esc_attr( $field['id'] ) ?>">
								<?= esc_html( $field['label'] ) ?>
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
        // phpcs:ignoreFile WordPress.Security.NonceVerification.Missing

		foreach ( $this->fields as $field ) {

			if ( isset( $_POST[ $field['name'] ] ) ) {
				if ( sanitize_text_field( wp_unslash( $_POST[ $field['name'] ] ) ) ) {
					update_post_meta( $post_id, $field['name'], sanitize_text_field( wp_unslash( $_POST[ $field['name'] ] ) ) );
				} else {
					delete_post_meta( $post_id, $field['name'] );
				}
			} elseif ( $field['type'] === 'checkbox' ) {
				delete_post_meta( $post_id, $field['name'] );
			}
		}
	}

	protected static function FIELD_VALUE( $field, $post ) {
		return get_post_meta( $post->ID, $field['name'], true );
	}
}
