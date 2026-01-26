<?php

$animations = \cwps\helpers\blockAttributes\animation_attributes( $attributes );
$has_slider = ( $attributes['listLayout'] === 'sidescroll' );

$results = \cwps\relatedPosts\query_related_posts( $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'cwps-listings alignfull is-layout-constrained has-global-padding ' . ( $has_slider ? 'js-sidescroll-list' : '' ) . ' --theme-' . $attributes['colorTheme'],
	)
);

if ( $results && $results->have_posts() ) : ?>
	<section <?= wp_kses_data( $wrapper_attributes ) ?>>
		<div class="cwps-listings__width alignwide <?= esc_attr( $animations['block-class'] ) ?>" <?= wp_kses_data( $animations['block-data'] ) ?>>
			<?= wp_kses_post( $content ) ?>
			<div class="cwps-listings__sidescroll swiper">
				<div class="cwps-listings__list swiper-wrapper --<?= esc_attr( $attributes['listLayout'] ) ?>" style="--cwps-excerpt-lines: <?= esc_attr( $attributes['excerptLines'] ) ?>;">
					<?php
					while ( $results->have_posts() ) :
						$results->the_post();
						get_template_part(
							'template-parts/list-tiles/post',
							get_post_type(),
							array(
								'attributes' => $attributes,
								'conditionals' => \cwps\helpers\blockAttributes\layout_conditionals( $attributes ),
							)
						);
					endwhile;
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

<?php endif;
wp_reset_postdata();
?>
