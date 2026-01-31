<?php

namespace cwps\adminForms;

require_once 'fields.php';

class Capitola_Tribe_Settings_Form extends Capitola_Fields {
	protected $tab_id;
	protected $tab_label;
	protected $position;
	protected $fields;

	public function __construct( $settings ) {
		$this->tab_id = $settings['tab_id'];
		$this->tab_label = $settings['tab_label'];
		$this->position = $settings['position'];
		$this->fields = $settings['fields'] ?? array();

		// adds the tab and contents panel
		add_action( 'tribe_settings_do_tabs', array( $this, 'add_custom_tab' ), $this->position );

		// remove the tribe form opening and replaces with tha WP settings form action
		add_filter(
			'tribe_settings_form_element_tab_' . $settings['tab_id'],
			function () {
				return '<form method="post" action="options.php">';
			},
			10
		);

		// renders the form contents
		add_action( 'tribe_settings_content_tab_' . $this->tab_id, array( $this, 'tab_callback' ) );

		// tells tribe not to add the standard hidden fields and submit
		add_filter(
			'tribe_settings_no_save_tabs',
			function ( $tabs, $admin_page ) {
				$tabs[] = $this->tab_id;
				return $tabs;
			},
			10,
			2
		);

		// adds the standard WP options hiddens and submit
		add_action(
			'tribe_settings_after_content_tab_' . $this->tab_id,
			function () {
				settings_fields( $this->tab_id );
				submit_button();
			}
		);
	}

	// public function __construct( $id, $name, $args = [] ) {
	// Setup the defaults.
	// $this->defaults = [
	// 'fields'           => [],
	// 'priority'         => 50,
	// 'show_save'        => true,
	// 'display_callback' => false,
	// 'network_admin'    => false,
	// 'children'         => [],
	// ];

	public function add_custom_tab() {
		add_filter(
			'tribe_settings_tabs',
			function ( $tabs, $admin_page ) {
				$tabs[ $this->tab_id ] = new \Tribe__Settings_Tab(
					$this->tab_id,
					$this->tab_label,
					array(
						// 'fields' => $this->fields,
						'display_callback' => function () {
							echo '<div>guigiugiugui</div>';
						},
					),
				);
				return $tabs;
			},
			$this->position,
			3
		);
	}

	public function tab_callback() {
		?>
		<div class="tribe-settings-form-wrap">
			<?php $this->render_fields(); ?>
		</div>
		<?php
	}

	protected function render_fields( $tab = false ) {

		$fields = $this->fields;

		foreach ( $fields as $field ) {

			if ( $field['type'] === 'title' ) {

				if ( ! empty( $field['title'] ) ) :
					?>
					<h2><?= esc_html( $field['title'] ) ?></h2>
					<?php
				endif;
				if ( ! empty( $field['desc'] ) ) :
					?>
					<p><?= esc_html( $field['desc'] ) ?></p>
				<?php endif; ?>
					<table class="form-table" role="presentation"><tbody>
				<?php
			} elseif ( $field['type'] === 'sectionend' ) {
				?>
				</tbody></table>
				<?php
			} else {
				$value = self::FIELD_VALUE( $field );
				$field = self::set_field_id( $field );

				?>
				<tr id="field-row-<?= esc_attr( $field['id'] ) ?>">
					<th scope="row">
						<label for="<?= esc_attr( $field['id'] ) ?>"><?= esc_html( $field['label'] ) ?></label>
					</th>
					<td>
					<?php self::echo_field( $field, $value ); ?>
					</td>
				</tr>
				<?php
			}
		}
	}

	protected static function FIELD_VALUE( $args ) {
		$option_name = is_array( $args['option'] ) ? $args['option'][0] : $args['option'];
		$option = get_option( $option_name );
		return is_array( $args['option'] ) && is_array( $option ) ? $option[ $args['option'][1] ] : $option;
	}
}
