<?php

global $wp_query;

$capitola_search_string     = sanitize_text_field( get_query_var( 's', 1 ) );
$capitola_total_pages       = $wp_query->max_num_pages;
$capitola_current_page      = ( get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1 );
$capitola_pagination_values = array();

if ( ! $capitola_total_pages ) {
	$capitola_pagination_values[] = 1;
}


if ( $capitola_total_pages <= 6 ) {
	for ( $capitola_i = 1; $capitola_i <= $capitola_total_pages; $capitola_i++ ) {
		$capitola_pagination_values[] = $capitola_i;
	}
} elseif ( ( $capitola_current_page + 5 ) < $capitola_total_pages ) {
	$capitola_pagination_values[] = $capitola_current_page;
	$capitola_pagination_values[] = ( $capitola_current_page + 1 );
	$capitola_pagination_values[] = ( $capitola_current_page + 2 );
	$capitola_pagination_values[] = '...';
	$capitola_pagination_values[] = ( $capitola_total_pages - 2 );
	$capitola_pagination_values[] = ( $capitola_total_pages - 1 );
	$capitola_pagination_values[] = ( $capitola_total_pages );
} else {
	for ( $capitola_i = $capitola_total_pages; $capitola_i >= ( $capitola_total_pages - 5 ); $capitola_i-- ) {
		array_unshift( $capitola_pagination_values, $capitola_i );
	}
	array_unshift( $capitola_pagination_values, '...' );
}

?>

<nav class="capitola-page-nav js-pageNav">
	<?php if ( 1 === $capitola_current_page ) : ?>
		<span class="capitola-page-nav__button --prev" disabled>Prev</span>
	<?php else : ?>
		<a href="<?php echo esc_url( '/page/' . ( $capitola_current_page - 1 ) . '/?s=' . rawurlencode( $capitola_search_string ) ); ?>" class="capitola-page-nav__button --prev">Prev</a>
	<?php endif; ?>
	<ul class="capitola-page-nav__page-numbers js-navPageNumbers">
		<?php
		foreach ( $capitola_pagination_values as $capitola_p ) :
			if ( '...' === $capitola_p ) :
				?>
				<li>
					<button class="capitola-page-nav__button --number --dots" type="button" disabled>....</button>
				</li>
			<?php else : ?>
				<li>
					<a href="<?php echo esc_url( '/page/' . $capitola_p . '/?s=' . rawurlencode( $capitola_search_string ) ); ?>" class="capitola-page-nav__button --number <?php echo ( $capitola_p === $capitola_current_page ? '--current' : '' ); ?>" data-page="<?php echo esc_attr( $capitola_p ); ?>"><?php echo esc_html( $capitola_p ); ?></a>
				</li>
				<?php
			endif;
		endforeach;
		?>
	</ul>
	<?php if ( $capitola_current_page === $capitola_total_pages ) : ?>
		<span class="capitola-page-nav__button --next" disabled>Next</span>
	<?php else : ?>
		<a href="<?php echo esc_url( '/page/' . ( $capitola_current_page + 1 ) . '/?s=' . rawurlencode( $capitola_search_string ) ); ?>" class="capitola-page-nav__button --next">Next</a>
	<?php endif; ?>
</nav>
