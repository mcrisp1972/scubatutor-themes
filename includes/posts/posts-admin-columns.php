<?php

add_filter( 'manage_edit-category_columns', '\cwps\AdminTermsListings\tax_thumb_col_head' );

add_filter( 'manage_category_custom_column', '\cwps\AdminTermsListings\tax_thumb_col', 10, 3 );
