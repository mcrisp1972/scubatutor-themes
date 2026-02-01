<?php

$animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes );

$args = array(
	'parent' => 0,
	'taxonomy' => $attributes['taxonomy'],
	'hide_empty' => true,
	'orderby' => $attributes['orderBy'] === 'id' ? 'term_id' : $attributes['orderBy'],
	'order' => $attributes['orderBy'] === 'count' ? 'DESC' : 'ASC',
	'number' => $attributes['limit'],
);

$has_slider = ( $attributes['listLayout'] === 'sidescroll' );

$results = new WP_Term_Query( $args );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'cwps-listings alignfull is-layout-constrained has-global-padding' . ( $has_slider ? 'js-sidescroll-list' : '' ) . ' --theme-' . $attributes['colorTheme'],
	)
);

if ( $results->get_terms() ) : ?>
	<section <?= wp_kses_data( $wrapper_attributes ) ?>>
		<div class="cwps-listings__width alignwide<?= esc_attr( $animations['block-class'] ) ?>" <?= wp_kses_data( $animations['block-data'] ) ?>>
			<?= wp_kses_post( $content ) ?>
			<div class="cwps-listings__sidescroll swiper">
				<div class="cwps-listings__list swiper-wrapper --<?= esc_attr( $attributes['listLayout'] ) ?>" style="--capitola-excerpt-lines: <?= esc_attr( $attributes['excerptLines'] ) ?>;">
					<?php
					foreach ( $results->get_terms() as $term_obj ) :
						get_template_part(
							'template-parts/list-tiles/taxonomy',
							'',
							array(
								'attributes' => $attributes,
								'term' => $term_obj,
								'conditionals' => \Capitola\Helpers\Block_Attributes\layout_conditionals( $attributes ),
							)
						);
						endforeach;
					?>
				</div>
				<?php if ( $has_slider ) : ?>
					<div class="cwps-listings__scroll-buttons">
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
