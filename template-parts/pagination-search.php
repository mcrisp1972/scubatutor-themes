<?php

$search_string = rawurlencode( get_query_var( 's', 1 ) );

global $wp_query;
$total_pages = $wp_query->max_num_pages;
$found_posts = $wp_query->found_posts;
$current_page = ( get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1 );
$pagination_values = array();

if ( ! $total_pages ) {
	$pagination_values[] = 1;
}


if ( $total_pages <= 6 ) {
	for ( $i = 1; $i <= $total_pages; $i++ ) {
		$pagination_values[] = $i;
	}
} elseif ( ( $current_page + 5 ) < $total_pages ) {
	$pagination_values[] = $current_page;
	$pagination_values[] = ( $current_page + 1 );
	$pagination_values[] = ( $current_page + 2 );
	$pagination_values[] = '...';
	$pagination_values[] = ( $total_pages - 2 );
	$pagination_values[] = ( $total_pages - 1 );
	$pagination_values[] = ( $total_pages );
} else {
	for ( $i = $total_pages; $i >= ( $total_pages - 5 ); $i-- ) {
		array_unshift( $pagination_values, $i );
	}
	array_unshift( $pagination_values, '...' );
}

?>

<nav class="capitola-page-nav js-pageNav">
	<?php if ( $current_page === 1 ) : ?>
		<span class="capitola-page-nav__button --prev" disabled>Prev</span>
	<?php else : ?>
		<a href="<?= esc_url( '/page/' . ( $current_page - 1 ) . '/?s=' . $search_string ) ?>" class="capitola-page-nav__button --prev">Prev</a>
	<?php endif; ?>
	<ul class="capitola-page-nav__page-numbers js-navPageNumbers">
		<?php
		foreach ( $pagination_values as $p ) :
			if ( $p == '...' ) :
				?>
				<li>
					<button class="capitola-page-nav__button --number --dots" type="button" disabled>....</button>
				</li>
			<?php else : ?>
				<li>
					<a href="<?= esc_url( '/page/' . $p . '/?s=' . $search_string ) ?>" class="capitola-page-nav__button --number <?= ( $p === $current_page ? '--current' : '' ) ?>" data-page="<?= esc_attr( $p ) ?>"><?= esc_html( $p ) ?></a>
				</li>
				<?php
			endif;
		endforeach;
		?>
	</ul>
	<?php if ( $current_page === $total_pages ) : ?>
		<span class="capitola-page-nav__button --next" disabled>Next</span>
	<?php else : ?>
		<a href="<?= esc_url( '/page/' . ( $current_page + 1 ) . '/?s=' . $search_string ) ?>" class="capitola-page-nav__button --next">Next</a>
	<?php endif; ?>
</nav>
