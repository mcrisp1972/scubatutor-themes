<?php

namespace Capitola\Admin_Forms;

/**
 * Renders admin form fields.
 */
class Fields {
	/**
	 * Outputs a field based on its type.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function echo_field( $field, $value ) {

		switch ( $field['type'] ) {

			case 'text':
				self::text( $field, $value );
				break;

			case 'textarea':
				self::textarea( $field, $value );
				break;

			case 'checkbox':
				self::checkbox( $field, $value );
				break;

			case 'wysiwyg':
				self::tinymce( $field, $value );
				break;

			case 'select':
				self::select( $field, $value );
				break;

			case 'radio':
				self::radio( $field, $value );
				break;

			case 'image':
				self::image( $field, $value );
				break;

			case 'date':
				self::date( $field, $value );
				break;

			case 'page_select':
				self::page_select( $field, $value );
				break;

			case 'term_select':
				self::term_select( $field, $value );
				break;
		}
	}

	/**
	 * Returns the help text markup for a field.
	 *
	 * @param array $field Field definition.
	 * @return string|null
	 */
	protected static function help( $field ) {
		if ( ! empty( $field['help'] ) ) {
			return '<p class="description">' . $field['help'] . '</p>';
		}
	}

	/**
	 * Renders a text field.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function text( $field, $value ) {
		$size_class = array(
			'tiny'   => 'tiny-text',
			'small'  => 'small-text',
			'medium' => 'all-options',
			'large'  => 'regular-text',
			'full'   => 'large-text',
		);

		$class = $size_class[ $field['size'] ?? 'medium' ] . ' ' . ( $field['class'] ?? '' );

		?>
			<input type="text" id="<?php echo esc_attr( $field['id'] ); ?>" class="<?php echo esc_attr( $class ); ?>" name="<?php echo esc_attr( $field['name'] ); ?>" value="<?php echo esc_attr( $value ); ?>" />
			<?php if ( self::help( $field ) ) : ?>
				<?php echo wp_kses_post( self::help( $field ) ); ?>
			<?php endif; ?>
		<?php
	}

	/**
	 * Renders a date field.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function date( $field, $value ) {
		$size_class = array(
			'tiny'   => 'tiny-text',
			'small'  => 'small-text',
			'medium' => 'all-options',
			'large'  => 'regular-text',
			'full'   => 'large-text',
		);

		$class = $size_class[ $field['size'] ?? 'medium' ] . ' ' . ( $field['class'] ?? '' );

		?>
			<input type="date" id="<?php echo esc_attr( $field['id'] ); ?>" class="<?php echo esc_attr( $class ); ?>" name="<?php echo esc_attr( $field['name'] ); ?>" value="<?php echo esc_attr( $value ); ?>" />
			<?php if ( self::help( $field ) ) : ?>
				<?php echo wp_kses_post( self::help( $field ) ); ?>
			<?php endif; ?>
		<?php
	}

	/**
	 * Renders a select field.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function select( $field, $value ) {
		?>
			<select id="<?php echo esc_attr( $field['id'] ); ?>" class="<?php echo esc_attr( $field['class'] ?? '' ); ?>" name="<?php echo esc_attr( $field['name'] ); ?>">
				<option value="" <?php echo selected( '' ); ?>>Select One</option>
				<?php
				foreach ( $field['options'] as $v => $l ) :
					$option_value = is_array( $l ) ? $l['value'] : $v;
					$option_text  = is_array( $l ) ? $l['label'] : $l;
					?>
					<option value="<?php echo esc_attr( $option_value ); ?>" <?php echo selected( $option_value, $value ); ?>><?php echo esc_html( $option_text ); ?></option>
				<?php endforeach; ?>
			</select>
			<?php if ( self::help( $field ) ) : ?>
				<?php echo wp_kses_post( self::help( $field ) ); ?>
			<?php endif; ?>
		<?php
	}

	/**
	 * Renders a textarea field.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function textarea( $field, $value ) {
		$size_class = array(
			'medium' => 'all-options',
			'large'  => 'regular-text',
			'full'   => 'large-text',
		);
		?>
			<textarea id="<?php echo esc_attr( $field['id'] ); ?>" class="<?php echo esc_attr( $size_class[ $field['size'] ?? 'large' ] ); ?> <?php echo esc_attr( $field['class'] ?? '' ); ?>" name="<?php echo esc_attr( $field['name'] ); ?>" rows="<?php echo esc_attr( $field['rows'] ?? 3 ); ?>"><?php echo esc_html( $value ); ?></textarea>
			<?php if ( self::help( $field ) ) : ?>
				<?php echo wp_kses_post( self::help( $field ) ); ?>
			<?php endif; ?>
		<?php
	}

	/**
	 * Renders a checkbox field.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function checkbox( $field, $value ) {
		if ( ! empty( $field['help'] ) ) :
			?>
			<label>
		<?php endif; ?>
			<input type="checkbox" id="<?php echo esc_attr( $field['id'] ); ?>" name="<?php echo esc_attr( $field['name'] ); ?>" value="1" <?php echo checked( $value ); ?>/>
			<?php echo ! empty( $field['help'] ) ? wp_kses_post( $field['help'] ) : ''; ?>
		<?php if ( ! empty( $field['help'] ) ) : ?>
			</label>
		<?php endif; ?>
		<?php
	}

	/**
	 * Renders a set of radio buttons.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	public static function radio( $field, $value ) {
		?>
		<fieldset <?php echo isset( $field['class'] ) ? 'class="' . esc_attr( $field['class'] ) . '"' : ''; ?>>
			<?php foreach ( $field['options'] as $k => $label ) : ?>
				<label style="display: block;"><input type="radio" name="<?php echo esc_attr( $field['name'] ); ?>" value="<?php echo esc_attr( $k ); ?>" <?php echo checked( $value, $k, false ); ?>>
					<?php echo esc_html( $label ); ?>
				</label>
			<?php endforeach; ?>
		</fieldset>
		<?php if ( self::help( $field ) ) : ?>
			<?php echo wp_kses_post( self::help( $field ) ); ?>
		<?php endif; ?>
		<?php
	}

	/**
	 * Renders a TinyMCE editor field.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function tinymce( $field, $value ) {
		$settings = array(
			'teeny'         => true,
			'media_buttons' => false,
			'textarea_rows' => $field['rows'] ?? 4,
			'textarea_name' => $field['name'],
			'tinymce'       => array(
				'toolbar1' => 'bold,italic,link',
			),
		);

		wp_editor( $value, $field['id'] . '-mce', $settings );
	}

	/**
	 * Renders a page select dropdown.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function page_select( $field, $value ) {
		wp_dropdown_pages(
			array(
				'selected'          => esc_attr( $value ),
				'name'              => esc_attr( $field['name'] ),
				'id'                => esc_attr( $field['id'] ?? '' ),
				'class'             => esc_attr( $field['class'] ?? '' ),
				'show_option_none'  => 'Select',
				'option_none_value' => 0,
			)
		);
		if ( self::help( $field ) ) :
			echo wp_kses_post( self::help( $field ) );
		endif;
	}

	/**
	 * Renders a term select dropdown.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	protected static function term_select( $field, $value ) {
		wp_dropdown_categories(
			array(
				'taxonomy'          => $field['taxonomy'],
				'selected'          => $value,
				'hierarchical'      => 1,
				'orderby'           => 'name',
				'name'              => $field['name'],
				'id'                => $field['id'] ?? '',
				'class'             => $field['class'] ?? '',
				'show_option_none'  => 'Select',
				'option_none_value' => 0,
			)
		);
		if ( self::help( $field ) ) :
			echo wp_kses_post( self::help( $field ) );
		endif;
	}

	/**
	 * Renders an image field.
	 *
	 * @param array $field Field definition.
	 * @param mixed $value Field value.
	 * @return void
	 */
	public static function image( $field, $value ) {
		wp_enqueue_media();
		wp_enqueue_script( 'capitola-admin-js' );

		if ( $value ) {

			$attachment  = $value ? get_post( $value ) : false;
			$meta        = wp_get_attachment_metadata( $value );
			$video_title = $attachment->post_title;
			if ( isset( $meta['filesize'] ) ) {
				$filesize = size_format( $meta['filesize'] );
			}
			$link = '<a href="' . wp_get_attachment_url( $attachment->ID ) . '" target="_blank">' . wp_basename( get_attached_file( $attachment->ID ) ) . '</a>';

			if ( str_starts_with( $attachment->post_mime_type, 'image' ) ) {
				$src         = $value ? wp_get_attachment_image_src( $value, 'medium' )[0] : '';
				$image_class = '';
			} else {
				$src         = wp_mime_type_icon( $attachment->ID );
				$image_class = ' --contain';
			}
		}

		if ( isset( $field['type'] ) && is_array( $field['type'] ) ) {
			$field['type'] = esc_attr( wp_json_encode( $field['type'] ) );
		}

		?>
		<div class="image-select-field js-imageSelect <?php echo esc_attr( $field['class'] ?? '' ); ?> <?php echo ( $value ? ' --has-value' : '' ); ?>" data-media-type="<?php echo ! empty( $field['type'] ) ? esc_attr( $field['type'] ) : 'image'; ?>">
			<div class="image-select-field__img-wrap <?php echo esc_attr( $image_class ) ?? ''; ?>">
				<img src="<?php echo esc_attr( $src ) ?? ''; ?>">
			</div>
			<div class="image-select-field__right-col">
				<div class="image-select-field__meta-row image-select-field__title-row js-imageSelectTitleRow" >
					<?php echo esc_html( $video_title ?? '' ); ?>
				</div>
				<div class="image-select-field__meta-row js-imageSelectLinkRow">
					<span class="image-select-field__meta-label">File Name:</span> <span class="js-imageSelectLinkValue"><?php echo wp_kses_post( $link ?? '' ); ?></span>
				</div>
				<div class="image-select-field__meta-row js-imageSelectSizeRow">
					<span class="image-select-field__meta-label">File Size:</span> <span class="js-imageSelectSizeValue"><?php echo esc_html( $filesize ?? '' ); ?></span>
				</div>
				<div class="image-select-field__button-wrap">
					<input class="js-selectImage button" type="button" value="Select/Upload" />
					<input class="image-select-field__remove js-remove button" type="button" value="Remove" />
				</div>
			</div>
			<input type="hidden" name="<?php echo esc_attr( $field['name'] ); ?>" class="js-value" value="<?php echo esc_attr( $value ); ?>">
		</div>
		<?php if ( self::help( $field ) ) : ?>
			<?php echo wp_kses_post( self::help( $field ) ); ?>
		<?php endif; ?>
		<?php
	}

	/**
	 * Ensures a field has an ID.
	 *
	 * @param array $field Field definition.
	 * @return array
	 */
	protected static function set_field_id( $field ) {
		if ( ! isset( $field['id'] ) ) {
			if ( isset( $field['option'] ) ) {
				$field['id'] = is_array( $field['option'] ) ? implode( '-', $field['option'] ) : $field['option'];
			} else {
				$field['id'] = $field['name'];
			}
		}
		return $field;
	}
}
