<?php

namespace cwps\adminForms;

require_once 'fields.php';

class Capitola_Term_Form extends Capitola_Fields {

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

		foreach ( $this->fields as $field ) :
			$field = self::set_field_id( $field );
			$field['class'] = $field['class'] ?? '';
			$field['class'] .= ' cwps-add-clear';
			?>
			<div id="field-row-<?= $field['id'] ?>" class="form-field">
				<label for="<?= $field['id'] ?>"><?= $field['label'] ?></label>
				<?php self::ECHO_FIELD( $field, $field['default'] ?? '' ); ?>
			</div>
			<?php
		endforeach;
	}

	public function edit_term_form( $term ) {
		foreach ( $this->fields as $field ) :
			$field = self::set_field_id( $field );
			$value = self::FIELD_VALUE( $field, $term, 0 );
			?>
			<tr class="form-field" id="field-row-<?= $field['id'] ?>">
				<th scope="row" valign="top">
					<?= $field['label'] ?>
				</th>
				<td>
					<?php self::echo_field( $field, $value ); ?>
				</td>
			</tr>
			<?php
		endforeach;
	}

	public function save_fields( $term_id ) {
        // phpcs:ignoreFile WordPress.Security.NonceVerification.Missing
		foreach ( $this->fields as $field ) {
			if ( isset( $_POST[ $field['name'] ] ) ) {
				if ( $_POST[ $field['name'] ] ) {
					update_term_meta( $term_id, $field['name'], $_POST[ $field['name'] ] );
				} else {
					delete_term_meta( $term_id, $field['name'] );
				}
			} elseif ( $field['type'] === 'checkbox' ) {
				delete_term_meta( $term_id, $field['name'] );
			}
		}
	}

	protected static function FIELD_VALUE( $field, $term, $default = '' ) {
		return $term ? get_term_meta( $term->term_id, $field['name'], true ) : $default;
	}
}
