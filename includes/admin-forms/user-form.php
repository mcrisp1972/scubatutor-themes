<?php

namespace cwps\adminForms;

require_once 'fields.php';

class CWPS_User_Form extends CWPS_Fields {
	protected $fields;

	public function __construct( $args ) {
		$this->fields = $args['fields'];
		$priority = isset( $args['priority'] ) ? $args['priority'] : 5;

		add_action( 'show_user_profile', array( $this, 'edit_user_form' ), $priority );
		add_action( 'edit_user_profile', array( $this, 'edit_user_form' ), $priority );

		add_action( 'personal_options_update', array( $this, 'save_user_fields' ) );
		add_action( 'edit_user_profile_update', array( $this, 'save_user_fields' ) );
	}

	function edit_user_form( $user ) {
		foreach ( $this->fields as $field ) :
			?>
			<?php if ( $field['type'] === 'title' ) : ?>
				<h2><?= $field['title'] ?></h2>
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
				<tr class="form-field" id="field-row-<?= $field['id'] ?>">
					<th scope="row" valign="top">
						<?= $field['label'] ?>
					</th>
					<td>
						<?php self::echo_field( $field, $value ); ?>
					</td>
				</tr>
			<?php endif; ?>
			<?php
		endforeach;
	}

	function save_user_fields( $user_id ) {

		foreach ( $this->fields as $field ) {
			if ( isset( $_POST[ $field['name'] ] ) ) {
				if ( $_POST[ $field['name'] ] ) {
					update_user_meta( $user_id, $field['name'], $_POST[ $field['name'] ] );
				} else {
					delete_user_meta( $user_id, $field['name'] );
				}
			} elseif ( $field['type'] === 'checkbox' ) {
				delete_user_meta( $user_id, $field['name'] );
			}
		}
	}
}
