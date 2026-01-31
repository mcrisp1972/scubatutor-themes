<?php

namespace cwps\adminForms;

class Capitola_Fields {

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

	protected static function help( $field ) {
		if ( ! empty( $field['help'] ) ) {
			return '<p class="description">' . $field['help'] . '</p>';
		}
	}

	protected static function text( $field, $value ) {
		$size_class = array(
			'tiny' => 'tiny-text',
			'small' => 'small-text',
			'medium' => 'all-options',
			'large' => 'regular-text',
			'full' => 'large-text',
		);

		$class = $size_class[ $field['size'] ?? 'medium' ] . ' ' . ( $field['class'] ?? '' );

		?>
			<input type="text" id="<?= $field['id'] ?>" class="<?= $class ?>" name="<?= $field['name'] ?>" value="<?= $value ?>" />
			<?= self::help( $field ) ?>
		<?php
	}

	protected static function date( $field, $value ) {
		$size_class = array(
			'tiny' => 'tiny-text',
			'small' => 'small-text',
			'medium' => 'all-options',
			'large' => 'regular-text',
			'full' => 'large-text',
		);

		$class = $size_class[ $field['size'] ?? 'medium' ] . ' ' . ( $field['class'] ?? '' );

		?>
			<input type="date" id="<?= $field['id'] ?>" class="<?= $class ?>" name="<?= $field['name'] ?>" value="<?= $value ?>" />
			<?= self::help( $field ) ?>
		<?php
	}

	protected static function select( $field, $value ) {
		?>
			<select id="<?= $field['id'] ?>" class="<?= $field['class'] ?? '' ?>" name="<?= $field['name'] ?>">
				<option value="" <?= selected( '' ) ?>>Select One</option>
				<?php
				foreach ( $field['options'] as $v => $l ) :
					$option_value = is_array( $l ) ? $l['value'] : $v;
					$option_text = is_array( $l ) ? $l['label'] : $l;
					?>
					<option value="<?= $option_value ?>" <?= selected( $option_value, $value ) ?>><?= $option_text ?></option>
				<?php endforeach; ?>
			</select>
			<?= self::help( $field ) ?>
		<?php
	}

	protected static function textarea( $field, $value ) {
		$size_class = array(
			'medium' => 'all-options',
			'large' => 'regular-text',
			'full' => 'large-text',
		);
		?>
			<textarea id="<?= $field['id'] ?>" class="<?= $size_class[ $field['size'] ?? 'large' ] ?> <?= $field['class'] ?? '' ?>" name="<?= $field['name'] ?>" rows="<?= $field['rows'] ?? 3 ?>"><?= $value ?></textarea>
			<?= self::help( $field ) ?>
		<?php
	}

	protected static function checkbox( $field, $value ) {
		if ( ! empty( $field['help'] ) ) :
			?>
			<label>
		<?php endif; ?>
			<input type="checkbox" id="<?= $field['id'] ?>" name="<?= $field['name'] ?>" value="1" <?= checked( $value ) ?>/>
			<?= ! empty( $field['help'] ) ? $field['help'] : '' ?>
		<?php if ( ! empty( $field['help'] ) ) : ?>
			</label>
		<?php endif; ?>
		<?php
	}

	public static function radio( $field, $value ) {
		?>
		<fieldset <?= isset( $field['class'] ) ? 'class="' . $field['class'] . '"' : '' ?>>
			<?php foreach ( $field['options'] as $k => $label ) : ?>
				<label style="display: block;"><input type="radio" name="<?= $field['name'] ?>" value="<?= $k ?>" <?= checked( $value, $k, false ) ?>> <?= $label ?></label>
			<?php endforeach; ?>
		</fieldset>
		<?= self::help( $field ) ?>
		<?php
	}

	protected static function tinymce( $field, $value ) {
		$settings = array(
			'teeny' => true,
			'media_buttons' => false,
			'textarea_rows' => $field['rows'] ?? 4,
			'textarea_name' => $field['name'],
			'tinymce'       => array(
				'toolbar1'      => 'bold,italic,link',
			),
		);

		wp_editor( $value, $field['id'] . '-mce', $settings );
	}

	protected static function page_select( $field, $value ) {
		wp_dropdown_pages(
			array(
				'selected' => $value,
				'name' => $field['name'],
				'id'  => $field['id'] ?? '',
				'class' => $field['class'] ?? '',
				'show_option_none' => 'Select',
				'option_none_value' => 0,
			)
		);
		echo self::help( $field );
	}

	protected static function term_select( $field, $value ) {
		wp_dropdown_categories(
			array(
				'taxonomy' => $field['taxonomy'],
				'selected' => $value,
				'hierarchical' => 1,
				'orderby' => 'name',
				'name' => $field['name'],
				'id'  => $field['id'] ?? '',
				'class' => $field['class'] ?? '',
				'show_option_none' => 'Select',
				'option_none_value' => 0,
			)
		);
		echo self::help( $field );
	}

	public static function image( $field, $value ) {
		wp_enqueue_media();
		wp_enqueue_script( 'cwps-admin-js' );

		if ( $value ) {

			$attachment = $value ? get_post( $value ) : false;
			$meta = wp_get_attachment_metadata( $value );
			$video_title = $attachment->post_title;
			if ( isset( $meta['filesize'] ) ) {
				$filesize = size_format( $meta['filesize'] );
			}
			$link = '<a href="' . wp_get_attachment_url( $attachment->ID ) . '" target="_blank">' . wp_basename( get_attached_file( $attachment->ID ) ) . '</a>';

			if ( str_starts_with( $attachment->post_mime_type, 'image' ) ) {
				$src = $value ? wp_get_attachment_image_src( $value, 'medium' )[0] : '';
				$image_class = '';
			} else {
				$src = wp_mime_type_icon( $attachment->ID );
				$image_class = ' --contain';
			}
		}

		if ( isset( $field['type'] ) && is_array( $field['type'] ) ) {
			$field['type'] = esc_attr( wp_json_encode( $field['type'] ) );
		}

		?>
		<div class="image-select-field js-imageSelect <?= $field['class'] ?? '' ?> <?= ( $value ? ' --has-value' : '' ) ?>" data-media-type="<?= ! empty( $field['type'] ) ? $field['type'] : 'image' ?>">
			<div class="image-select-field__img-wrap <?= $image_class ?? '' ?>">
				<img src="<?= $src ?? '' ?>">
			</div>
			<div class="image-select-field__right-col">
				<div class="image-select-field__meta-row image-select-field__title-row js-imageSelectTitleRow" >
					<?= $video_title ?? '' ?>
				</div>
				<div class="image-select-field__meta-row js-imageSelectLinkRow">
					<span class="image-select-field__meta-label">File Name:</span> <span class="js-imageSelectLinkValue"><?= $link ?? '' ?></span>
				</div>
				<div class="image-select-field__meta-row js-imageSelectSizeRow">
					<span class="image-select-field__meta-label">File Size:</span> <span class="js-imageSelectSizeValue"><?= $filesize ?? '' ?></span>
				</div>
				<div class="image-select-field__button-wrap">
					<input class="js-selectImage button" type="button" value="Select/Upload" />
					<input class="image-select-field__remove js-remove button" type="button" value="Remove" />
				</div>
			</div>
			<input type="hidden" name="<?= $field['name'] ?>" class="js-value" value="<?= $value ?>">
		</div>
		<?= self::help( $field ) ?>
		<?php
	}

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
