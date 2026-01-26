<?php

// phpcs:ignoreFile WordPress.Security.NonceVerification.Recommended

global $wp_query;
$not_singular = $wp_query->found_posts > 1 ? 'results' : 'result';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'cwps-listings --paginated alignfull is-layout-constrained has-global-padding --theme-' . $attributes['colorTheme'],
	)
);

$search_string = esc_attr( get_query_var( 's', '' ) );

?>
<section <?= wp_kses_data( $wrapper_attributes )  ?>>
	<div class="cwps-listings__width alignwide">
		<div class="cwps-listings__search-head">
			<?php if ( $attributes['headline'] ) : ?>
				<<?= tag_escape( $attributes['headlineTag'] ) ?> class="cwps-listings__search-headline --hl-l">
					<?= esc_html( $attributes['headline'] ) ?>
				</<?= tag_escape( $attributes['headlineTag'] ) ?>>
			<?php endif; ?>
			<form class="cwps-listings__search-form" action="/" autocomplete="off">
                <input type="search" name="s" value="<?= ( $search_string ? $search_string : '' ) ?>" aria-label="search" placeholder="What are you looking for?"/>
				<button type="submit" class="search-icon" aria-label="submit search"></button>
			</form>
			<div class="cwps-listings__search-count">
				We found <?= $wp_query->found_posts ?> <?= $not_singular ?> in your search.
			</div>
		</div>
		<div class="cwps-listings__list js-list --<?= esc_attr( $attributes['listLayout'] ) ?>" style="--cwps-excerpt-lines: <?= esc_attr( $attributes['excerptLines'] ) ?>;">
			<?php
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					get_template_part(
						'template-parts/list-tiles/post',
						get_post_type(),
						array(
							'attributes' => $attributes,
							'conditionals' => \cwps\helpers\blockAttributes\layout_conditionals( $attributes ),
						)
					);
				endwhile;
			endif;
			?>
		</div>
		<?php get_template_part( 'template-parts/pagination-search' ); ?>
	</div>
</section>
