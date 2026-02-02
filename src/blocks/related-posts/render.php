<?php

use function Capitola\Helpers\Block_Attributes\animation_attributes;
use function Capitola\Blocks\Related_Posts\query_related_posts;

$capitola_animations = animation_attributes( $attributes );
$capitola_has_slider = ( 'sidescroll' === $attributes['listLayout'] );
$capitola_results = query_related_posts( $attributes );

if ( $capitola_results && $capitola_results->have_posts() ) : ?>
	<section
	<?=
	wp_kses_data(
		get_block_wrapper_attributes(
			array(
				'id' => $attributes['anchor'],
				'class' => 'capitola-listings alignfull is-layout-constrained has-global-padding ' . ( $capitola_has_slider ? 'js-sidescroll-list' : '' ) . ' --theme-' . $attributes['colorTheme'],
			)
		)
	);
	?>
				>
		<div class="capitola-listings__width alignwide <?= esc_attr( $capitola_animations['block-class'] ); ?>" <?= wp_kses_data( $capitola_animations['block-data'] ); ?>>
			<?= wp_kses_post( $content ); ?>
			<div class="capitola-listings__sidescroll swiper">
				<div class="capitola-listings__list swiper-wrapper --<?= esc_attr( $attributes['listLayout'] ); ?>" style="--capitola-excerpt-lines: <?= esc_attr( $attributes['excerptLines'] ); ?>;">
					<?php
					while ( $capitola_results->have_posts() ) :
						$capitola_results->the_post();
						get_template_part(
							'template-parts/list-tiles/post',
							get_post_type(),
							array(
								'attributes' => $attributes,
								'conditionals' => \Capitola\Helpers\Block_Attributes\layout_conditionals( $attributes ),
							)
						);
					endwhile;
					?>
				</div>
				<?php if ( $capitola_has_slider ) : ?>
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

<?php endif;
wp_reset_postdata();
?>
