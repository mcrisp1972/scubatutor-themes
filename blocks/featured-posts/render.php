<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;
use function Capitola\Helpers\Block_Attributes\layout_conditionals;

$animations = animation_attributes( $attributes );
$has_slider = ( 'sidescroll' === $attributes['listLayout'] );

$results = new WP_Query(
	array(
		'post_type' => $attributes['postType'],
		'post__in'  => wp_list_pluck( $attributes['posts'], 'post_id' ),
		'orderby'   => 'post__in',
	)
);

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'alignfull is-layout-constrained has-global-padding ' . ( $has_slider ? 'js-sidescroll-list' : '' ) . ' --theme-' . $attributes['colorTheme'],
	)
);

if ( $results && $results->have_posts() ) : ?>
	<section <?php echo wp_kses_data( $wrapper_attributes ); ?>>
		<div class="capitola-listings__width alignwide <?php echo esc_attr( $animations['block-class'] ); ?>" style="<?php echo wp_kses_data( $animations['block-styles'] ); ?>">
			<?php echo wp_kses_post( $content ); ?>
			<div class="capitola-listings__sidescroll swiper">
				<div class="capitola-listings__list swiper-wrapper --<?php echo esc_attr( $attributes['listLayout'] ); ?>">
					<?php
					while ( $results->have_posts() ) :
						$results->the_post();
						get_template_part(
							'template-parts/list-tiles/post',
							get_post_type(),
							array(
								'attributes'   => $attributes,
								'conditionals' => layout_conditionals( $attributes ),
							)
						);
					endwhile;
					?>
				</div>
				<?php if ( $has_slider ) : ?>
					<div class="capitola-listings__scroll-buttons">
						<button class="swiper-button-prev" aria-label="scroll left"></button>
						<?php if ( $attributes['showSlideCount'] ) : ?>
							<div class="swiper-pagination"></div>
						<?php endif; ?>
						<button class="swiper-button-next" aria-label="scroll right"></button>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</section>

<?php endif;
wp_reset_postdata();
?>
