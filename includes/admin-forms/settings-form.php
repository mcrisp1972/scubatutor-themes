<?php

namespace cwps\adminForms;

require_once 'fields.php';

class Capitola_Settings_Form extends Capitola_Fields {
    protected $parent_slug;
    protected $page_title;
    protected $menu_title;
    protected $menu_slug;
    protected $icon_url;
    protected $menu_position;
    protected $fields;
    protected $tabs;

	public function __construct( $settings ) {
		$this->parent_slug = $settings['parent_slug'] ?? false;
		$this->page_title = $settings['page_title'];
		$this->menu_title = $settings['menu_title'];
		$this->menu_slug = $settings['menu_slug'];
		$this->icon_url = $settings['icon_url'] ?? 'none';
		$this->menu_position = $settings['position'] ?? 50;
		$this->fields = $settings['fields'] ?? array();
		$this->tabs = $settings['tabs'] ?? false;

		add_action( 'admin_menu', array( $this, 'add_admin_menu_item' ) );
	}

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

	public function page_callback() {
        // phpcs:ignoreFile WordPress.Security.NonceVerification.Recommended
        // phpcs:ignoreFile WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

		$current_tab = ! empty( $_GET['tab'] ) ? wp_unslash( $_GET['tab'] ) : ( $this->tabs ? array_key_first( $this->tabs ) : '' );
		?>
		<div class="wrap">
            <!-- <div id="test-app"></div> -->
			<h1><?php echo get_admin_page_title(); ?></h1>
			<h2 class="nav-tab-wrapper">
				<?php
				if ( $this->tabs ) :
					foreach ( $this->tabs as $slug => $tab ) :
						?>
						<a class="nav-tab <?= $current_tab === $slug ? 'nav-tab-active' : '' ?>" href="?page=<?php echo $_GET['page']; ?>&tab=<?= wp_unslash( $slug ) ?>"><?= $tab['tab_label'] ?></a>
						<?php
					endforeach;
				endif;
				?>
			</h2>
			<form method="post" action="options.php">
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

	protected function render_fields( $tab = false ) {

		$fields = $tab ? $this->tabs[ $tab ]['fields'] : $this->fields;

		foreach ( $fields as $field ) {

			if ( $field['type'] === 'title' ) {

				if ( ! empty( $field['title'] ) ) :
					?>
					<h2><?= $field['title'] ?></h2>
					<?php
				endif;
				if ( ! empty( $field['desc'] ) ) :
					?>
					<p><?= $field['desc'] ?></p>
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
				<tr id="field-row-<?= $field['id'] ?>">
					<th scope="row">
						<label for="<?= $field['id'] ?>"><?= $field['label'] ?></label>
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
