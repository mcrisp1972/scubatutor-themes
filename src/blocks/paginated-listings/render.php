<?php

$animations = \Capitola\Helpers\Block_Attributes\animation_attributes( $attributes );

$has_filters = $attributes['showSearchFields'] || $attributes['showTaxFilters'] || $attributes['showSorts'];

wp_localize_script( 'cwps-paginated-listings-view-script', 'listingAttributes', $attributes );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => $attributes['anchor'],
		'class' => 'cwps-listings --paginated alignfull is-layout-constrained has-global-padding js-paginatedListings --theme-' . $attributes['colorTheme'],
	)
);

?>

<section <?= wp_kses_data( $wrapper_attributes ) ?>>
	<div class="cwps-listings__width alignwide <?= esc_attr( $animations['block-class'] ) ?>" <?= wp_kses_data( $animations['block-data'] ) ?>>
		<?= wp_kses_post( $content ) ?>
		<div class="cwps-listings__results-header">
			<div class="cwps-listings__filters-count js-resultsCount"></div>
			<?php if ( $has_filters ) : ?>
				<button type="button" class="cwps-listings__filters-mbl-open js-toggleFilters" aria-label="Open Filters">Filter Results</button>
			<?php endif; ?>
			<div class="cwps-listings__filters-wrap js-filters">
				<div class="cwps-listings__filters-wrap-scroll">
					<?php
					if ( $has_filters ) :
						?>
						<button type="button" class="cwps-listings__filters-mbl-close js-toggleFilters" aria-label="Close Filters"></button>
					<?php endif; ?>
					<form id="js-filterForm" class="cwps-listings__filters">
						<input type="hidden" class="js-filter" name="filtered_listings" value="1"/>
						<div class="cwps-listings__filters-headline --hl-s">
							Filter Results
						</div>
						<?php
						foreach ( $attributes['setHiddens'] as $name ) :
							$hidden = $attributes['postTypes'][ $attributes['postType'] ]['hiddenParams'][ $name ];
							?>
							<input type="hidden" class="js-filter" name="<?= esc_attr( $name ) ?>" value="<?= esc_attr( $hidden['default'] ) ?>"/>
						<?php endforeach; ?>

						<?php
						foreach ( $attributes['showSearchFields'] as $field ) :
							$options = $attributes['postTypes'][ $attributes['postType'] ]['searchParams'][ $field ];
							?>
							<div class="cwps-listings__filters-filter">
								<label for="paginated-listing-<?= esc_attr( $field ) ?>"><?= esc_html( $options['label'] ) ?></label>
								<div class="cwps-listings__filters-input-wrap --<?= esc_attr( $options['type'] ) ?>">
									<input id="paginated-listing-<?= esc_attr( $field ) ?>" type="<?= esc_attr( $options['type'] ) ?>" name="<?= esc_attr( $field ) ?>" class="js-autoFilter"/>
								</div>
							</div>
						<?php endforeach; ?>

						<?php
						foreach ( $attributes['showTaxFilters'] as $tax_filter ) :
							$labels = get_taxonomy_labels( get_taxonomy( $tax_filter ) );
							?>
							<div class="cwps-listings__filters-filter">
								<label for="paginated-listing-<?= esc_attr( $tax_filter ) ?>"><?= esc_html( $labels->singular_name ) ?></label>
								<div class="cwps-listings__filters-input-wrap --select">
									<?php
									wp_dropdown_categories(
										array(
											'hierarchical' => true,
											'name' => $attributes['taxParams'][ $tax_filter ],
											'id' => 'paginated-listing-' . $tax_filter,
											'class' => 'js-autoFilter js-filter',
											'orderby' => 'name',
											'taxonomy' => $tax_filter,
											'include' => $attributes['baseTerm'] ? array_merge( array( $attributes['baseTerm'] ), get_term_children( $attributes['baseTerm'], $tax_filter ) ) : array(),
											'show_option_all' => $attributes['baseTerm'] ? false : 'Show All',
										)
									)
									?>
								</div>
							</div>
						<?php endforeach; ?>
						<?php if ( $attributes['showSorts'] ) : ?>
							<div class="cwps-listings__filters-filter">
								<label for="listings-sort">Order</label>
								<div class="cwps-listings__filters-input-wrap --select">
									<select id="listings-sort" name="orderby" class="js-filter js-autoFilter">
										<?php foreach ( $attributes['postTypes'][ $attributes['postType'] ]['sorts'] as $sort ) : ?>
											<option value="<?= esc_attr( $sort ) ?>" <?= selected( $sort, $attributes['orderBy'] ) ?>><?= esc_html( $attributes['orderbyOptions'][ $sort ]['label'] ) ?></option>
										<?php endforeach; ?>
									</select>
								</div>
							</div>
						<?php else : ?>
							<input type="hidden" name="orderby" value="<?= esc_attr( $attributes['orderBy'] ) ?>" class="js-filter"/>
						<?php endif; ?>
					</form>
				</div>
			</div>
		</div>
		<div class="cwps-listings__list js-list --<?= esc_attr( $attributes['listLayout'] ) ?>" style="--capitola-excerpt-lines: <?= esc_attr( $attributes['excerptLines'] ) ?>;">
		</div>
		<?php get_template_part( 'template-parts/pagination' ); ?>
	</div>
</section>
