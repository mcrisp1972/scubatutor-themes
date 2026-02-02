<?php

use function Capitola\Helpers\Block_Attributes\animation_attributes;

$capitola_animations = animation_attributes( $attributes );

$capitola_has_filters = $attributes['showSearchFields'] || $attributes['showTaxFilters'] || $attributes['showSorts'];

wp_localize_script( 'capitola-paginated-listings-view-script', 'listingAttributes', $attributes );

?>

<section
<?=
wp_kses_data(
	get_block_wrapper_attributes(
		array(
			'id' => $attributes['anchor'],
			'class' => 'capitola-listings --paginated alignfull is-layout-constrained has-global-padding js-paginatedListings --theme-' . $attributes['colorTheme'],
		)
	)
);
?>
>
	<div class="capitola-listings__width alignwide <?= esc_attr( $capitola_animations['block-class'] ); ?>" <?= wp_kses_data( $capitola_animations['block-data'] ); ?>>
		<?= wp_kses_post( $content ); ?>
		<div class="capitola-listings__results-header">
			<div class="capitola-listings__filters-count js-resultsCount"></div>
			<?php if ( $capitola_has_filters ) : ?>
				<button type="button" class="capitola-listings__filters-mbl-open js-toggleFilters" aria-label="Open Filters">Filter Results</button>
			<?php endif; ?>
			<div class="capitola-listings__filters-wrap js-filters">
				<div class="capitola-listings__filters-wrap-scroll">
					<?php
					if ( $capitola_has_filters ) :
						?>
						<button type="button" class="capitola-listings__filters-mbl-close js-toggleFilters" aria-label="Close Filters"></button>
					<?php endif; ?>
					<form id="js-filterForm" class="capitola-listings__filters">
						<input type="hidden" class="js-filter" name="filtered_listings" value="1"/>
						<div class="capitola-listings__filters-headline --hl-s">
							Filter Results
						</div>
						<?php
						foreach ( $attributes['setHiddens'] as $capitola_hidden_name ) :
							$capitola_hidden = $attributes['postTypes'][ $attributes['postType'] ]['hiddenParams'][ $capitola_hidden_name ];
							?>
							<input type="hidden" class="js-filter" name="<?= esc_attr( $capitola_hidden_name ); ?>" value="<?= esc_attr( $capitola_hidden['default'] ); ?>"/>
						<?php endforeach; ?>

						<?php
						foreach ( $attributes['showSearchFields'] as $capitola_search_field ) :
							$capitola_options = $attributes['postTypes'][ $attributes['postType'] ]['searchParams'][ $capitola_search_field ];
							?>
							<div class="capitola-listings__filters-filter">
								<label for="paginated-listing-<?= esc_attr( $capitola_search_field ); ?>"><?= esc_html( $capitola_options['label'] ); ?></label>
								<div class="capitola-listings__filters-input-wrap --<?= esc_attr( $capitola_options['type'] ); ?>">
									<input id="paginated-listing-<?= esc_attr( $capitola_search_field ); ?>" type="<?= esc_attr( $capitola_options['type'] ); ?>" name="<?= esc_attr( $capitola_search_field ); ?>" class="js-autoFilter"/>
								</div>
							</div>
						<?php endforeach; ?>

						<?php
						foreach ( $attributes['showTaxFilters'] as $capitola_tax_filter ) :
							$capitola_labels = get_taxonomy_labels( get_taxonomy( $capitola_tax_filter ) );
							?>
							<div class="capitola-listings__filters-filter">
								<label for="paginated-listing-<?= esc_attr( $capitola_tax_filter ); ?>"><?= esc_html( $capitola_labels->singular_name ); ?></label>
								<div class="capitola-listings__filters-input-wrap --select">
									<?php
									wp_dropdown_categories(
										array(
											'hierarchical' => true,
											'name' => $attributes['taxParams'][ $capitola_tax_filter ],
											'id' => 'paginated-listing-' . $capitola_tax_filter,
											'class' => 'js-autoFilter js-filter',
											'orderby' => 'name',
											'taxonomy' => $capitola_tax_filter,
											'include' => $attributes['baseTerm'] ? array_merge( array( $attributes['baseTerm'] ), get_term_children( $attributes['baseTerm'], $capitola_tax_filter ) ) : array(),
											'show_option_all' => $attributes['baseTerm'] ? false : 'Show All',
										)
									)
									?>
								</div>
							</div>
						<?php endforeach; ?>
						<?php if ( $attributes['showSorts'] ) : ?>
							<div class="capitola-listings__filters-filter">
								<label for="listings-sort">Order</label>
								<div class="capitola-listings__filters-input-wrap --select">
									<select id="listings-sort" name="orderby" class="js-filter js-autoFilter">
										<?php foreach ( $attributes['postTypes'][ $attributes['postType'] ]['sorts'] as $capitola_sort ) : ?>
											<option value="<?= esc_attr( $capitola_sort ); ?>" <?= selected( $capitola_sort, $attributes['orderBy'] ); ?>><?= esc_html( $attributes['orderbyOptions'][ $capitola_sort ]['label'] ); ?></option>
										<?php endforeach; ?>
									</select>
								</div>
							</div>
						<?php else : ?>
							<input type="hidden" name="orderby" value="<?= esc_attr( $attributes['orderBy'] ); ?>" class="js-filter"/>
						<?php endif; ?>
					</form>
				</div>
			</div>
		</div>
		<div class="capitola-listings__list js-list --<?= esc_attr( $attributes['listLayout'] ); ?>" style="--capitola-excerpt-lines: <?= esc_attr( $attributes['excerptLines'] ); ?>;">
		</div>
		<?php get_template_part( 'template-parts/pagination' ); ?>
	</div>
</section>
