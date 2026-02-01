<?php

add_filter( 'manage_edit-category_columns', '\Capitola\Admin_Terms_Listings\tax_thumb_col_head' );

add_filter( 'manage_category_custom_column', '\Capitola\Admin_Terms_Listings\tax_thumb_col', 10, 3 );
