# WooCommerce Product Image Cleanup Script

This WP-CLI command helps you clean up product images for specific brands and/or categories in your WooCommerce store.

## Features

- ✅ Search for products by brand and/or category (accepts IDs or slugs)
- ✅ Finds all associated images:
  - Main product images
  - Gallery images
  - Product variation images
  - **Images in product descriptions (post content)**
  - **Images in product short descriptions**
  - **Custom product tab highlight slide images (productTabSlides)**
- ✅ Supports multiple content formats:
  - Gutenberg blocks (core/image, core/gallery, core/cover, core/media-text)
  - Classic editor img tags
  - WordPress shortcodes ([gallery], [image])
  - Images with wp-image-ID classes
  - Custom meta field image IDs
- ✅ Lists all image files including all thumbnail sizes
- ✅ Optional database deletion (safe dry-run mode by default)
- ✅ **Automatic physical file deletion when database record is deleted**
- ✅ Generates a comprehensive text file with all files found
- ✅ Progress bars and detailed statistics

## Prerequisites

- WP-CLI installed and working
- WooCommerce plugin active
- SSH/terminal access to your WordPress site

## Installation

The CLI command is automatically registered when the theme is active. The class is located at:
```
wp-content/themes/santacruzdivers/includes/cli/classes/Product_Image_Cleanup.php
```

## Usage

### Basic Syntax

```bash
wp cwps-cleanup-product-images [FLAGS]
```

### Available Flags

| Flag | Required | Description | Example |
|------|----------|-------------|---------|
| `--brands` | * | Comma-separated list of brand IDs or slugs | `--brands="scubapro,mares"` or `--brands="123,456"` |
| `--categories` | * | Comma-separated list of category IDs or slugs | `--categories="regulators,bcds"` or `--categories="78,79"` |
| `--product-id` | * | Single product ID for testing (if set, brands/categories not required) | `--product-id=1234` |
| `--delete` | No | Set to `true` to delete from database AND physical files (default: `false`) | `--delete=true` |
| `--output` | No | Output filename (default: `images-to-delete.txt`) | `--output="brand-cleanup.txt"` |

\* At least one of `--brands`, `--categories`, or `--product-id` is required

## Examples

### Example 0: Test on Single Product (RECOMMENDED FOR TESTING)
Test the script on a single product to see what would be found:

```bash
wp cwps-cleanup-product-images --product-id=1234
```

### Example 1: Dry Run - Brand Only (Safe Mode)
Find all images for products with brand "scubapro" without deleting anything:

```bash
wp cwps-cleanup-product-images --brands="scubapro"
```

This creates `images-to-delete.txt` in your `wp-content/uploads/` directory.

### Example 2: Multiple Brands with Custom Output
Find images for multiple brands:

```bash
wp cwps-cleanup-product-images --brands="scubapro,mares,aqualung" --output="brand-cleanup.txt"
```

### Example 3: Brand + Category Filter
Find images for a specific brand AND category:

```bash
wp cwps-cleanup-product-images --brands="scubapro" --categories="regulators"
```

### Example 4: Using IDs Instead of Slugs
Use term IDs if you know them:

```bash
wp cwps-cleanup-product-images --brands="123,456" --categories="78"
```

### Example 5: Delete from Database (and Physical Files)
**⚠️ WARNING: This will delete BOTH database records AND physical files!**

```bash
wp cwps-cleanup-product-images --brands="scubapro" --delete=true
```

### Example 6: Complete Cleanup with All Options
```bash
wp cwps-cleanup-product-images \
  --brands="scubapro,mares" \
  --categories="regulators,bcds" \
  --delete=true \
  --output="complete-cleanup.txt"
```

### Example 7: Test Complete Cleanup on Single Product
```bash
wp cwps-cleanup-product-images \
  --product-id=1234 \
  --delete=true
```

## How to Find Brand/Category Slugs or IDs

### Method 1: WP-CLI
```bash
# List all brands
wp term list product_brand --fields=term_id,name,slug

# List all product categories
wp term list product_cat --fields=term_id,name,slug
```

### Method 2: WordPress Admin
1. Go to Products → Brands (or Categories)
2. Hover over a brand/category name
3. Look at the URL in your browser's status bar
4. The slug appears in the URL, e.g., `tag_ID=123` (ID) or you can see the slug in the edit screen

## Workflow

### Recommended Testing Workflow:

**STEP 1: Test on a single product first!**

```bash
# Find a product ID (look in WordPress admin or run this query)
wp post list --post_type=product --posts_per_page=1 --format=ids

# Test on that product
wp cwps-cleanup-product-images --product-id=1234
```

Review the output file to verify it's finding the right images.

**STEP 2: Once verified, proceed with brand cleanup**

### Recommended Safe Workflow:

1. **First Run (Dry Run)**
   ```bash
   wp cwps-cleanup-product-images --brands="brand-name"
   ```
   - This creates `images-to-delete.txt` in `wp-content/uploads/` without deleting anything
   - Review the file to make sure these are the right images

2. **Review Output File**
   ```bash
   # The file is saved in wp-content/uploads/
   cat wp-content/uploads/images-to-delete.txt
   ```
   - Check that you're comfortable deleting these images
   - Verify the product IDs and image types

3. **Delete Everything (One Command)**
   ```bash
   wp cwps-cleanup-product-images --brands="brand-name" --delete=true
   ```
   - This removes both database records AND physical files in one step
   - WordPress automatically deletes physical files when removing attachments

## Output File Format

The script generates a text file in `wp-content/uploads/` with the following information:

```
==============================================
WooCommerce Product Images to Delete
Generated: 2026-01-02 12:30:45
==============================================

Image ID: 1234 (Product ID: 5678, Type: main)
File: /path/to/wp-content/uploads/2024/01/image.jpg

Image ID: 1235 (Product ID: 5678, Type: content)
File: /path/to/wp-content/uploads/2024/01/description-image.jpg

...

==============================================
Summary
==============================================
Total attachment records: 45
Total files (including thumbnails): 225
Attachments deleted (including physical files): 45 (or NOT deleted if dry run)
```

**Note:** Only the original image file path is shown. WordPress automatically handles deletion of all thumbnail sizes when the attachment is deleted.

**Image Types in Output:**
- `main` - Featured product image
- `gallery` - Product gallery images
- `variation` - Variation-specific images
- `content` - Images found in product description
- `short-description` - Images found in product short description
- `tab-slide` - Images from product tab highlight slides

## Troubleshooting

### "No products found matching the criteria"
- Check that your brand/category slugs or IDs are correct
- Verify that products actually exist with those taxonomies
- Use WP-CLI to list available terms (see "How to Find Slugs" above)

### "Term slug not found in taxonomy"
- The slug might be incorrect or the term doesn't exist
- Try using the numeric ID instead
- Check for typos in the slug

### Permission Errors
- Make sure you have write permissions in the `wp-content/uploads/` directory
- Run the command as the appropriate user (usually www-data or your hosting user)

### Command Not Found
- Verify WP-CLI is installed: `wp --version`
- Check that WooCommerce is active: `wp plugin list`
- Make sure the theme is active: `wp theme list`
- Verify you're in the WordPress root directory or use `--path=/path/to/wordpress`

## Help Documentation

You can view the built-in help documentation at any time:

```bash
wp help cwps-cleanup-product-images
```

## Safety Features

- **Dry run by default**: Unless you specify `--delete=true`, nothing is deleted
- **Single flag deletion**: One flag (`--delete=true`) removes both database records and physical files
- **WordPress handles file deletion**: Uses WordPress's built-in `wp_delete_attachment()` function
- **Safety warnings**: Clear warnings when destructive operations are enabled
- **File listing**: All files are listed in the output file before deletion
- **Progress tracking**: See exactly what's being processed
- **Error handling**: Warnings and errors are clearly displayed
- **Detailed logs**: Output file tracks what was deleted and any failures
- **Statistics**: Get a full summary of what was found and processed

## Notes

- The output file is saved to `wp-content/uploads/` directory
- The script finds images for products with **ANY** status (published, draft, trash, etc.)
- **Images embedded in product descriptions are automatically detected and included**
- **Custom product tab highlight slide images are automatically scanned**
- **WordPress automatically deletes physical files when `--delete=true` is used**
- Supports both Gutenberg blocks and classic editor content
- All thumbnail sizes are included in the file list
- You can run the script multiple times safely (dry run mode by default)
- Always test with a small subset first (one brand) or single product before processing multiple brands
- The output file tracks what was deleted for your records

### Custom Meta Fields Scanned:
- `productTabSlides` - Highlight slide images only (size charts, videos, features, and HTML content are NOT included)

## File Location

- Main class: `wp-content/themes/santacruzdivers/includes/cli/classes/Product_Image_Cleanup.php`
- CLI registration: `wp-content/themes/santacruzdivers/includes/cli/cli.php`

## Support

For issues or questions:
1. Check the output file for specific error messages
2. Review the statistics at the end of the script run
3. Run in dry-run mode first to see what would be affected
4. Use `wp help cwps-cleanup-product-images` for command documentation

## License

This script is provided as-is for WooCommerce site maintenance.

