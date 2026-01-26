<?php
/**
 * Product UPC to GTIN Migration Script
 *
 * phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
 */

$query = new WC_Product_Query(
	array(
		'limit' => -1,
		'return' => 'ids',
	)
);
$products = $query->get_products();

$updated_count = 0;
$variation_count = 0;

echo "\n========================================\n";
echo "Product UPC to GTIN Migration\n";
echo "========================================\n\n";

foreach ( $products as $pid ) {
	$product = wc_get_product( $pid );

	if ( ! $product ) {
		echo "ERROR: Could not load product $pid\n";
		continue;
	}

	// Log product type
	echo "Product $pid is type: " . $product->get_type() . "\n";

	$upc = get_post_meta( $pid, 'product_upc', true );

	if ( $upc ) {
		echo "Setting GTIN for product $pid: $upc\n";

		try {
			// Use WooCommerce setter method
			$product->set_global_unique_id( $upc );
			$product->save();

			++$updated_count;

			// Clean up old meta field after successful migration
			delete_post_meta( $pid, 'product_upc' );

			echo "✓ GTIN set successfully for product $pid (old meta cleaned up)\n";
		} catch ( WC_Data_Exception $e ) {
			echo "✗ ERROR setting GTIN for product $pid: " . $e->getMessage() . "\n";
		}
	}

	// Check for variations regardless of whether parent has UPC
	if ( $product->is_type( 'variable' ) ) {
		$variations = $product->get_children();

		echo "  Product $pid is VARIABLE. Found " . count( $variations ) . " variations\n";

		if ( empty( $variations ) ) {
			echo "  WARNING: Variable product $pid has no variations!\n";
		}

		foreach ( $variations as $variation_id ) {
			$variation = wc_get_product( $variation_id );

			if ( ! $variation ) {
				echo "  ✗ ERROR: Could not load variation $variation_id\n";
				continue;
			}

			echo "  Processing variation $variation_id (type: " . $variation->get_type() . ")\n";

			// ONLY use variation-specific UPC, NOT parent UPC (GTINs must be unique)
			$variation_upc = get_post_meta( $variation_id, 'product_upc', true );

			if ( $variation_upc ) {
				echo "  Updating variation $variation_id with its own GTIN: $variation_upc\n";

				try {
					// Use WooCommerce setter method for variation
					$variation->set_global_unique_id( $variation_upc );
					$variation->save();

					++$variation_count;

					// Clean up old meta field after successful migration
					delete_post_meta( $variation_id, 'product_upc' );

					// Verify it was set
					$check = $variation->get_global_unique_id();
					echo "  ✓ SUCCESS: GTIN set for variation $variation_id - Verified: $check (old meta cleaned up)\n";
				} catch ( WC_Data_Exception $e ) {
					echo "  ✗ ERROR setting GTIN for variation $variation_id: " . $e->getMessage() . "\n";
				}
			} else {
				echo "  ⊘ SKIPPED: Variation $variation_id has no unique UPC (GTINs must be unique)\n";
			}
		}
	}

	echo "\n"; // Blank line between products
}

echo "\n========================================\n";
echo "Migration Complete\n";
echo "========================================\n";
echo "Products updated: $updated_count\n";
echo "Variations updated: $variation_count\n";
echo 'Total processed: ' . count( $products ) . "\n";
echo "========================================\n\n";
