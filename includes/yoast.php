<?php

namespace Capitola\Yoast;

add_filter( 'wpseo_primary_term_taxonomies', '__return_empty_array' );


// add_filter( 'wpseo_accessible_post_types', function( $types ){

// return [];
// }, 99, 1);

// add_filter( 'wpseo_enable_editor_features_staff', function(){
// return false;
// }, 99 );
