<?php

namespace cwps\cli;

/**
 * CLI command to rename block attributes. Supports any block and attribute.
 */
class Block_Attribute_Rename {

	/**
	 * Rename block attributes.
	 *
	 * ## OPTIONS
	 *
	 * --block=<block_name>
	 * : The name of the block to migrate (e.g., 'cwps/bg-image-text')
	 *
	 * --current-attribute=<current_attribute_name>
	 * : The current name of the attribute to rename (e.g., 'backgroundImage')
	 *
	 * --new-attribute=<new_attribute_name>
	 * : The new name for the attribute (e.g., 'backgroundImageNew')
	 *
	 * ## EXAMPLES
	 *
	 *     # Rename bg-image-text blocks backgroundImage attribute to backgroundImageNew
	 *     wp cwps-rename-block-attribute --block=cwps/bg-image-text --current-attribute=backgroundImage --new-attribute=backgroundImageNew
	 *
	 *     # Rename cover blocks backgroundImage attribute to bgImage
	 *     wp cwps-rename-block-attribute --block=cwps/cover-block --current-attribute=backgroundImage --new-attribute=bgImage
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 * @when after_wp_load
	 */
	public function __invoke( $args, $assoc_args ) {
		$this->rename( $args, $assoc_args );
	}

	/**
	 * Rename block attributes.
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 */
	public function rename( $args, $assoc_args ) {
		// Validate required flags
		if ( empty( $assoc_args['block'] ) ) {
			\WP_CLI::error( '--block is required. Example: --block=cwps/bg-image-text' );
		}

		if ( empty( $assoc_args['current-attribute'] ) ) {
			\WP_CLI::error( '--current-attribute is required. Example: --current-attribute=backgroundImage' );
		}

		if ( empty( $assoc_args['new-attribute'] ) ) {
			\WP_CLI::error( '--new-attribute is required. Example: --new-attribute=backgroundImageNew' );
		}

		$block_name = $assoc_args['block'];
		$current_attribute_name = $assoc_args['current-attribute'];
		$new_attribute_name = $assoc_args['new-attribute'];

		// Prevent renaming to the same name
		if ( $current_attribute_name === $new_attribute_name ) {
			\WP_CLI::error( 'Current and new attribute names cannot be the same.' );
		}

		\WP_CLI::log( "Starting attribute rename for block '{$block_name}': '{$current_attribute_name}' -> '{$new_attribute_name}'..." );

		// Query posts that contain the specified block
		$posts = $this->get_posts_with_block( $block_name );

		if ( empty( $posts ) ) {
			\WP_CLI::success( "No posts found containing {$block_name} blocks." );
			return;
		}

		\WP_CLI::log( sprintf( 'Found %d posts with %s blocks.', count( $posts ), $block_name ) );

		$updated_count = 0;
		$error_count = 0;

		foreach ( $posts as $post ) {
			$result = $this->rename_post_blocks( $post, $block_name, $current_attribute_name, $new_attribute_name );

			if ( $result['success'] ) {
				$updated_count += $result['updated_blocks'];
				\WP_CLI::log( sprintf( 'Updated post ID %d: %d block attributes renamed', $post->ID, $result['updated_blocks'] ) );
			} else {
				++$error_count;
				\WP_CLI::warning( sprintf( 'Failed to update post ID %d: %s', $post->ID, $result['error'] ) );
			}
		}

		\WP_CLI::success(
			sprintf(
				'Attribute rename completed! Updated %d blocks across %d posts. %d errors encountered.',
				$updated_count,
				count( $posts ),
				$error_count
			)
		);
	}

	/**
	 * Get posts that contain the specified block.
	 *
	 * @param string $block_name The name of the block to search for.
	 * @return array Array of WP_Post objects.
	 */
	private function get_posts_with_block( $block_name ) {
		// Store block name for the filter
		$this->current_block_name = $block_name;

		// Add custom WHERE clause to search post content
		add_filter( 'posts_where', array( $this, 'filter_posts_where_for_block' ) );

		$query_args = array(
			'post_type'      => 'any',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'fields'         => 'all',
		);

		$query = new \WP_Query( $query_args );
		$posts = $query->posts;

		// Remove the filter
		remove_filter( 'posts_where', array( $this, 'filter_posts_where_for_block' ) );

		wp_reset_postdata();
		return $posts;
	}

	/**
	 * Filter posts WHERE clause to search for specified blocks in content.
	 *
	 * @param string $where The WHERE clause.
	 * @return string Modified WHERE clause.
	 */
	public function filter_posts_where_for_block( $where ) {
		global $wpdb;

		$block_name = $this->current_block_name;

		$where .= $wpdb->prepare(
			" AND (
				{$wpdb->posts}.post_content LIKE %s
				OR {$wpdb->posts}.post_content LIKE %s
			)",
			'%<!-- wp:' . $block_name . '%',
			'%"name":"' . $block_name . '"%'
		);

		return $where;
	}

	/**
	 * Rename attributes in blocks within a single post.
	 *
	 * @param WP_Post $post                The post to process.
	 * @param string  $block_name          The name of the block to process.
	 * @param string  $current_attribute_name The current name of the attribute.
	 * @param string  $new_attribute_name  The new name for the attribute.
	 * @return array Result array with success status and details.
	 */
	private function rename_post_blocks( $post, $block_name, $current_attribute_name, $new_attribute_name ) {
		$content = $post->post_content;
		$original_content = $content;
		$updated_blocks = 0;

		// Parse blocks from post content
		$blocks = parse_blocks( $content );

		if ( empty( $blocks ) ) {
			return array(
				'success' => false,
				'error' => 'No blocks found in post content',
				'updated_blocks' => 0,
			);
		}

		// Process blocks recursively
		$updated_blocks = $this->process_blocks_recursively( $blocks, $block_name, $current_attribute_name, $new_attribute_name );

		// If blocks were updated, regenerate the content
		if ( $updated_blocks > 0 ) {
			$new_content = serialize_blocks( $blocks );

			// Update the post
			$result = wp_update_post(
				array(
					'ID' => $post->ID,
					'post_content' => $new_content,
				),
				true
			);

			if ( is_wp_error( $result ) ) {
				return array(
					'success' => false,
					'error' => $result->get_error_message(),
					'updated_blocks' => $updated_blocks,
				);
			}
		}

		return array(
			'success' => true,
			'updated_blocks' => $updated_blocks,
		);
	}

	/**
	 * Process blocks recursively to find and rename specified attributes.
	 *
	 * @param array  $blocks Array of block data.
	 * @param string $block_name The name of the block to update.
	 * @param string $current_attribute_name The current name of the attribute.
	 * @param string $new_attribute_name The new name for the attribute.
	 * @return int Number of blocks updated.
	 */
	private function process_blocks_recursively( &$blocks, $block_name, $current_attribute_name, $new_attribute_name ) {
		$updated_count = 0;

		foreach ( $blocks as &$block ) {
			// Check if this is the target block
			if ( isset( $block['blockName'] ) && $block['blockName'] === $block_name ) {
				if ( $this->rename_block_attribute( $block, $current_attribute_name, $new_attribute_name ) ) {
					++$updated_count;
				}
			}

			// Process inner blocks recursively
			if ( ! empty( $block['innerBlocks'] ) ) {
				$updated_count += $this->process_blocks_recursively( $block['innerBlocks'], $block_name, $current_attribute_name, $new_attribute_name );
			}
		}

		return $updated_count;
	}

	/**
	 * Rename a single block's attribute.
	 *
	 * @param array  $block Block data by reference.
	 * @param string $current_attribute_name The current name of the attribute.
	 * @param string $new_attribute_name The new name for the attribute.
	 * @return bool True if block was updated, false otherwise.
	 */
	private function rename_block_attribute( &$block, $current_attribute_name, $new_attribute_name ) {
		if ( ! isset( $block['attrs'][ $current_attribute_name ] ) ) {
			return false;
		}

		// Check if the new attribute name already exists
		if ( isset( $block['attrs'][ $new_attribute_name ] ) ) {
			\WP_CLI::warning( sprintf( 'Attribute "%s" already exists in block, skipping rename', $new_attribute_name ) );
			return false;
		}

		// Get the current attribute value
		$attribute_value = $block['attrs'][ $current_attribute_name ];

		// Remove the old attribute and add the new one
		unset( $block['attrs'][ $current_attribute_name ] );
		$block['attrs'][ $new_attribute_name ] = $attribute_value;

		return true;
	}
}
