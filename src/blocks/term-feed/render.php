<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function Capitola\Helpers\Block_Attributes\animation_attributes;
use function Capitola\Helpers\Block_Attributes\layout_conditionals;

$capitola_animations = animation_attributes( $attributes );
$capitola_has_slider = ( 'sidescroll' === $attributes['listLayout'] );

$capitola_results = new WP_Term_Query(
	array(
		'parent'     => 0,
		'taxonomy'   => $attributes['taxonomy'],
		'hide_empty' => true,
		'orderby'    => 'id' === $attributes['orderBy'] ? 'term_id' : $attributes['orderBy'],
		'order'      => 'count' === $attributes['orderBy'] ? 'DESC' : 'ASC',
		'number'     => $attributes['limit'],
	)
);

if ( $capitola_results->get_terms() ) : ?>
	<section
	<?php
	echo wp_kses_data(
		get_block_wrapper_attributes(
			array(
				'id'    => $attributes['anchor'],
				'class' => 'capitola-listings alignfull is-layout-constrained has-global-padding' . ( $capitola_has_slider ? 'js-sidescroll-list' : '' ) . ' --theme-' . $attributes['colorTheme'],
			)
		)
	);
	?>
				>
		<div class="capitola-listings__width alignwide<?php echo esc_attr( $capitola_animations['block-class'] ); ?>" <?php echo wp_kses_data( $capitola_animations['block-data'] ); ?>>
			<?php echo wp_kses_post( $content ); ?>
			<div class="capitola-listings__sidescroll swiper">
				<div class="capitola-listings__list swiper-wrapper --<?php echo esc_attr( $attributes['listLayout'] ); ?>" style="--capitola-excerpt-lines: <?php echo esc_attr( $attributes['excerptLines'] ); ?>;">
					<?php
					foreach ( $capitola_results->get_terms() as $capitola_term_obj ) :
						get_template_part(
							'template-parts/list-tiles/taxonomy',
							'',
							array(
								'attributes'   => $attributes,
								'term'         => $capitola_term_obj,
								'conditionals' => layout_conditionals( $attributes ),
							)
						);
						endforeach;
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
<?php endif; ?>
