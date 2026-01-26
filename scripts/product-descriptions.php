<?php

// dirname(__FILE__);
// $open = fopen(dirname(__FILE__) . "/import.csv", "r");

// while (($data = fgetcsv($open, 10000, ",")) !== FALSE) {  

//     if( isset($data[2])) {    
//         $product = wc_get_product( $data[0] );
//         if( $data[2] && $product ) {
//             $product->set_short_description( $data[1] );
//             $product->set_description( $data[2] );
//             $product->save();
//         }
//     }

// }
  
//     fclose($open);





// die();


// $args = [
//     'post_type' => 'product',
//     'posts_per_page' => -1,
// ];
// $query = new WP_Query($args);

// while ( $query->have_posts() ) {
//     $query->the_post();
//     $product = wc_get_product( get_the_id() );

//     $description = $product->get_description();
//     $short_description = $product->get_short_description();

//     if( $description == $short_description ) {
//         $product->set_short_description( '' );
//         $product->save();
//     }

//     elseif( !$description && $short_description ) {
//         $product->set_description( $short_description );
//         $product->save();
//     }
// }