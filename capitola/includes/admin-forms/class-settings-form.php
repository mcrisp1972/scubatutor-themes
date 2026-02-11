<?php

namespace Capitola\Admin_Forms;

require_once 'class-fields.php';

/**
 * Registers an admin settings form page.
 */
class Settings_Form extends Fields {
	/**
	 * Parent menu slug for submenu pages.
	 *
	 * @var string|false
	 */
	protected $parent_slug;

	/**
	 * Admin page title.
	 *
	 * @var string
	 */
	protected $page_title;

	/**
	 * Admin menu title.
	 *
	 * @var string
	 */
	protected $menu_title;

	/**
	 * Admin menu slug.
	 *
	 * @var string
	 */
	protected $menu_slug;

	/**
	 * Admin menu icon URL or dashicon.
	 *
	 * @var string
	 */
	protected $icon_url;

	/**
	 * Admin menu position.
	 *
	 * @var int
	 */
	protected $menu_position;

	/**
	 * Settings fields configuration.
	 *
	 * @var array
	 */
	protected $fields;

	/**
	 * Settings tabs configuration.
	 *
	 * @var array|false
	 */
	protected $tabs;

	/**
	 * Sets up the settings form.
	 *
	 * @param array $settings Settings configuration.
	 */
	public function __construct( $settings ) {
		$this->parent_slug   = $settings['parent_slug'] ?? false;
		$this->page_title    = $settings['page_title'];
		$this->menu_title    = $settings['menu_title'];
		$this->menu_slug     = $settings['menu_slug'];
		$this->icon_url      = $settings['icon_url'] ?? 'none';
		$this->menu_position = $settings['position'] ?? 50;
		$this->fields        = $settings['fields'] ?? array();
		$this->tabs          = $settings['tabs'] ?? false;

		add_action( 'admin_menu', array( $this, 'add_admin_menu_item' ) );
	}

	/**
	 * Adds the admin menu item for the settings page.
	 *
	 * @return void
	 */
	public function add_admin_menu_item() {

		if ( $this->parent_slug ) {
			add_submenu_page(
				$this->parent_slug,
				$this->page_title,
				$this->menu_title,
				'manage_options',
				$this->menu_slug,
				array( $this, 'page_callback' ),
				$this->menu_position
			);
		} else {
			add_menu_page(
				$this->page_title,
				$this->menu_title,
				'manage_options',
				$this->menu_slug,
				array( $this, 'page_callback' ),
				$this->icon_url,
				$this->menu_position
			);
		}
	}

	/**
	 * Renders the settings page.
	 *
	 * @return void
	 */
	public function page_callback() {
		if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'POST' === $_SERVER['REQUEST_METHOD'] ) {
			$nonce = isset( $_POST['capitola_settings_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['capitola_settings_nonce'] ) ) : '';
			if ( empty( $nonce ) || ! wp_verify_nonce( $nonce, 'capitola_settings_form' ) ) {
				wp_die( esc_html__( 'Security check failed. Please refresh the page and try again.', 'capitola' ) );
			}
		}

		$current_tab  = ! empty( $_GET['tab'] ) ? sanitize_text_field( wp_unslash( $_GET['tab'] ) ) : ( $this->tabs ? array_key_first( $this->tabs ) : '' );
		$current_page = ! empty( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : $this->menu_slug;
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<h2 class="nav-tab-wrapper">
				<?php
				if ( $this->tabs ) :
					foreach ( $this->tabs as $slug => $tab ) :
						?>
						<?php
						$tab_slug = sanitize_text_field( $slug );
						$tab_url  = add_query_arg(
							array(
								'page' => $current_page,
								'tab'  => $tab_slug,
							),
							admin_url( 'admin.php' )
						);
						?>
						<a class="nav-tab <?php echo $current_tab === $slug ? 'nav-tab-active' : ''; ?>" href="<?php echo esc_url( $tab_url ); ?>"><?php echo esc_html( $tab['tab_label'] ); ?></a>
						<?php
					endforeach;
				endif;
				?>
			</h2>
			<form method="post" action="options.php">
				<?php wp_nonce_field( 'capitola_settings_form', 'capitola_settings_nonce' ); ?>
				<?php
				if ( $this->tabs ) {
					settings_fields( $this->tabs[ $current_tab ]['fields_slug'] );
					$this->render_fields( $current_tab );
					submit_button();
				} else {
					settings_fields( $this->menu_slug );
					$this->render_fields();
					submit_button();
				}
				?>
			</form>
		</div>
		<?php
	}

	/**
	 * Renders the settings fields.
	 *
	 * @param string|false $tab Optional tab key.
	 * @return void
	 */
	protected function render_fields( $tab = false ) {

		$fields = $tab ? $this->tabs[ $tab ]['fields'] : $this->fields;

		foreach ( $fields as $field ) {

			if ( 'title' === $field['type'] ) {

				if ( ! empty( $field['title'] ) ) :
					?>
					<h2><?php echo esc_html( $field['title'] ); ?></h2>
					<?php
				endif;
				if ( ! empty( $field['desc'] ) ) :
					?>
					<p><?php echo esc_html( $field['desc'] ); ?></p>
				<?php endif; ?>
					<table class="form-table" role="presentation"><tbody>
				<?php
			} elseif ( 'sectionend' === $field['type'] ) {
				?>
				</tbody></table>
				<?php
			} else {
				$value = self::FIELD_VALUE( $field );
				$field = self::set_field_id( $field );

				?>
				<tr id="field-row-<?php echo esc_attr( $field['id'] ); ?>">
					<th scope="row">
						<label for="<?php echo esc_attr( $field['id'] ); ?>"><?php echo esc_html( $field['label'] ); ?></label>
					</th>
					<td>
					<?php self::echo_field( $field, $value ); ?>
					</td>
				</tr>
				<?php
			}
		}
	}

	/**
	 * Retrieves a settings field value.
	 *
	 * @param array $args Field definition.
	 * @return mixed
	 */
	protected static function FIELD_VALUE( $args ) {
		$option_name = is_array( $args['option'] ) ? $args['option'][0] : $args['option'];
		$option      = get_option( $option_name );
		return is_array( $args['option'] ) && is_array( $option ) ? $option[ $args['option'][1] ] : $option;
	}
}
