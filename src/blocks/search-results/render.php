<?php

use function Capitola\Helpers\Block_Attributes\layout_conditionals;

global $wp_query;

$capitola_not_singular = $wp_query->found_posts > 1 ? 'results' : 'result';
$capitola_search_string = esc_attr( get_query_var( 's', '' ) );

?>
<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'class' => 'capitola-listings --paginated alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="capitola-listings__width alignwide">
		<div class="capitola-listings__search-head">
			<?php if ( $attributes['headline'] ) : ?>
				<<?= tag_escape( $attributes['headlineTag'] ); ?> class="capitola-listings__search-headline --hl-l">
					<?= esc_html( $attributes['headline'] ); ?>
				</<?= tag_escape( $attributes['headlineTag'] ); ?>>
			<?php endif; ?>
			<form class="capitola-listings__search-form" action="/" autocomplete="off">
				<input type="search" name="s" value="<?= esc_attr( $capitola_search_string ? $capitola_search_string : '' ); ?>" aria-label="search" placeholder="What are you looking for?"/>
				<button type="submit" class="search-icon" aria-label="submit search"></button>
			</form>
			<div class="capitola-listings__search-count">
				We found <?= esc_html( $wp_query->found_posts . ' ' . $capitola_not_singular ); ?> in your search.
			</div>
		</div>
		<div class="capitola-listings__list js-list --<?= esc_attr( $attributes['listLayout'] ); ?>" style="--capitola-excerpt-lines: <?= esc_attr( $attributes['excerptLines'] ); ?>;">
			<?php
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					get_template_part(
						'template-parts/list-tiles/post',
						get_post_type(),
						array(
							'attributes' => $attributes,
							'conditionals' => layout_conditionals( $attributes ),
						)
					);
				endwhile;
			endif;
			?>
		</div>
		<?php get_template_part( 'template-parts/pagination-search' ); ?>
	</div>
</section>
