<?php

namespace Capitola\Admin_Forms;

require_once 'class-fields.php';

/**
 * Registers term form fields for taxonomies.
 */
class Term_Form extends Fields {
	/**
	 * Default term thumbnail field configuration.
	 *
	 * @var array
	 */
	public static $term_thumb = array(
		'id'      => 'term_thumb_id',
		'name'    => 'term_thumb_id',
		'label'   => 'Thumbnail Image',
		'type'    => 'media',
		'default' => 0,
	);

	/**
	 * Default term page field configuration.
	 *
	 * @var array
	 */
	public static $term_page = array(
		'id'      => 'term_page_id',
		'name'    => 'term_page_id',
		'label'   => 'Term Landing Page',
		'type'    => 'page_select',
		'default' => 0,
		'help'    => "If a page is selected, links to this term will point to the selected page. Otherwise, links will point the post type's archive page.",
	);

	/**
	 * Taxonomy slug handled by the form.
	 *
	 * @var string
	 */
	protected $taxonomy;

	/**
	 * Term field definitions.
	 *
	 * @var array
	 */
	protected $fields;

	/**
	 * Sets up the term form.
	 *
	 * @param array $args Form configuration.
	 */
	public function __construct( $args ) {
		$this->taxonomy = $args['taxonomy'];
		$this->fields   = $args['fields'];

		add_action( $this->taxonomy . '_add_form_fields', array( $this, 'new_term_form' ), 20, 2 );
		add_action( $this->taxonomy . '_edit_form_fields', array( $this, 'edit_term_form' ), 10, 2 );
		add_action( 'create_' . $this->taxonomy, array( $this, 'save_fields' ), 10, 2 );
		add_action( 'edited_' . $this->taxonomy, array( $this, 'save_fields' ), 10, 2 );
	}

	/**
	 * Renders fields for the new term form.
	 *
	 * @return void
	 */
	public function new_term_form() {
		wp_nonce_field( 'capitola_term_form', 'capitola_term_nonce' );

		foreach ( $this->fields as $field ) :
			$field           = self::set_field_id( $field );
			$field['class']  = $field['class'] ?? '';
			$field['class'] .= ' capitola-add-clear';
			?>
			<div id="field-row-<?php echo esc_attr( $field['id'] ); ?>" class="form-field">
				<label for="<?php echo esc_attr( $field['id'] ); ?>"><?php echo esc_html( $field['label'] ); ?></label>
				<?php self::ECHO_FIELD( $field, $field['default'] ?? '' ); ?>
			</div>
			<?php
		endforeach;
	}

	/**
	 * Renders fields for the edit term form.
	 *
	 * @param \WP_Term $term Term object.
	 * @return void
	 */
	public function edit_term_form( $term ) {
		wp_nonce_field( 'capitola_term_form', 'capitola_term_nonce' );
		foreach ( $this->fields as $field ) :
			$field = self::set_field_id( $field );
			$value = self::FIELD_VALUE( $field, $term, 0 );
			?>
			<tr class="form-field" id="field-row-<?php echo esc_attr( $field['id'] ); ?>">
				<th scope="row" valign="top">
					<?php echo esc_html( $field['label'] ); ?>
				</th>
				<td>
					<?php self::echo_field( $field, $value ); ?>
				</td>
			</tr>
			<?php
		endforeach;
	}

	/**
	 * Saves term fields.
	 *
	 * @param int $term_id Term ID.
	 * @return void
	 */
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
				$value     = is_array( $raw_value ) ? array_map( 'sanitize_text_field', $raw_value ) : sanitize_text_field( $raw_value );
				if ( $value ) {
					update_term_meta( $term_id, $field_name, $value );
				} else {
					delete_term_meta( $term_id, $field_name );
				}
			} elseif ( $field_name && 'checkbox' === $field['type'] ) {
				delete_term_meta( $term_id, $field_name );
			}
		}
	}

	/**
	 * Retrieves a field value for a term.
	 *
	 * @param array         $field    Field definition.
	 * @param \WP_Term|null $term     Term object.
	 * @param mixed         $fallback Fallback value.
	 * @return mixed
	 */
	protected static function FIELD_VALUE( $field, $term, $fallback = '' ) {
		return $term ? get_term_meta( $term->term_id, $field['name'], true ) : $fallback;
	}
}
