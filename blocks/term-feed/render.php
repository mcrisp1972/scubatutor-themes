<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;
use function Capitola\Helpers\Block_Attributes\layout_conditionals;

$animations = animation_attributes( $attributes );
$has_slider = ( 'sidescroll' === $attributes['listLayout'] );

$results = new WP_Term_Query(
	array(
		'parent'     => 0,
		'taxonomy'   => $attributes['taxonomy'],
		'hide_empty' => true,
		'orderby'    => 'id' === $attributes['orderBy'] ? 'term_id' : $attributes['orderBy'],
		'order'      => 'count' === $attributes['orderBy'] ? 'DESC' : 'ASC',
		'number'     => $attributes['limit'],
	)
);

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id'    => $attributes['anchor'],
		'class' => 'capitola-listings alignfull is-layout-constrained has-global-padding ' . ( $has_slider ? ' js-sidescroll-list' : '' ) . ' --theme-' . $attributes['colorTheme'],
	)
);

if ( $results->get_terms() ) : ?>
	<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
		<div class="capitola-listings__width alignwide<?php echo esc_attr( $animations['block-class'] ); ?>" <?php echo wp_kses_data( $animations['block-data'] ); ?>>
			<?php echo wp_kses_post( $content ); ?>
			<div class="capitola-listings__sidescroll swiper">
				<div class="capitola-listings__list swiper-wrapper --<?php echo esc_attr( $attributes['listLayout'] ); ?>" style="--wp--custom--truncate-lines: <?php echo esc_attr( $attributes['excerptLines'] ); ?>;">
					<?php
					foreach ( $results->get_terms() as $term_obj ) :
						get_template_part(
							'template-parts/list-tiles/taxonomy',
							'',
							array(
								'attributes'   => $attributes,
								'term'         => $term_obj,
								'conditionals' => layout_conditionals( $attributes ),
							)
						);
						endforeach;
					?>
				</div>
				<?php if ( $has_slider ) : ?>
					<div class="capitola-listings__scroll-buttons">
						<button class="swiper-button-prev" aria-label="scroll-left"></button>
						<?php if ( $attributes['showSlideCount'] ) : ?>
							<div class="swiper-pagination"></div>
						<?php endif; ?>
						<button class="swiper-button-next" aria-label="scroll-right"></button>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</section>
<?php endif; ?>
