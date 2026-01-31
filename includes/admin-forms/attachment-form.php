<?php

namespace cwps\adminForms;

require_once 'fields.php';

class Capitola_Attachment_Form extends Capitola_Fields {
    protected $fields;

	public function __construct( $args ) {
		$this->fields = $args['fields'];
		add_filter( 'attachment_fields_to_edit', array( $this, 'form_fields' ), null, 2 );
		add_action( 'edit_attachment', array( $this, 'save_fields' ), 10, 1 );
	}

	public function form_fields( $form_fields, $post ) {

		foreach ( $this->fields as $field ) {

			$value = self::FIELD_VALUE( $field, $post );
			$id = isset( $field['id'] ) ? $field['id'] : $field['name'];
			$field['id'] = 'attachments-' . $post->ID . '-' . $id;
			ob_start();
			self::echo_field( $field, $value );
			$html = ob_get_clean();
			$form_fields[ $id ] = array(
				'label' => $field['label'],
				'helps' => false,
				'input' => 'html',
				'html'  => $html,
			);
		}

		return $form_fields;
	}

	public function save_fields( $post_id ) {
        // phpcs:ignoreFile WordPress.Security.NonceVerification.Missing
		foreach ( $this->fields as $field ) {

			if ( isset( $_POST[ $field['name'] ] ) ) {
				if ( $_POST[ $field['name'] ] ) {
					update_post_meta( $post_id, $field['name'], $_POST[ $field['name'] ] );
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

	protected function SET_CONDITIONALS( $field, $post ) {
		if ( $field['type'] === 'checkbox' ) {
			if ( isset( $field['hide-if-checked'] ) ) {
				foreach ( $field['hide-if-checked'] as $k => $v ) {
					$field['hide-if-checked'][ $k ] = '.compat-field-' . $v;
				}
				$field['hide-if-checked'] = implode( ', ', $field['hide-if-checked'] );
			}
			if ( isset( $field['hide-if-unchecked'] ) ) {
				foreach ( $field['hide-if-unchecked'] as $k => $v ) {
					$field['hide-if-unchecked'][ $k ] = '.compat-field-' . $v;
				}
				$field['hide-if-unchecked'] = implode( ', ', $field['hide-if-unchecked'] );
			}
		}
		return $field;
	}
}
