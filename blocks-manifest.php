<?php
// This file is generated. Do not modify it manually.
return array(
	'accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/accordion',
		'title' => 'Accordion',
		'textdomain' => 'capitola',
		'description' => 'Display collapsible content panels with optional multi-open behavior.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'accordion',
			'toggle',
			'faq',
			'collapse'
		),
		'supports' => array(
			'anchor' => true,
			'interactivity' => true,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'keepOpen' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'allowedBlocks' => array(
			'capitola/accordion-item'
		),
		'usesContext' => array(
			'parentAutoCollapse'
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'capitola/accordion-item',
					'attributes' => array(
						'headline' => 'Nulla pariatur cupidatat'
					)
				),
				array(
					'name' => 'capitola/accordion-item',
					'attributes' => array(
						'headline' => 'Esse ea amet ea aliquip'
					)
				),
				array(
					'name' => 'capitola/accordion-item',
					'attributes' => array(
						'headline' => 'Sint nulla anim laborum'
					)
				)
			)
		),
		'style' => 'capitola-accordion',
		'editorStyle' => 'capitola-accordion-editor',
		'viewScriptModule' => 'file:./view.js',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'accordion-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/accordion-item',
		'title' => 'Accordion Item',
		'textdomain' => 'capitola',
		'description' => 'Add a single collapsible panel inside an Accordion block.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'accordion',
			'item',
			'toggle',
			'faq'
		),
		'parent' => array(
			'capitola/accordion'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'headline' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'accordion-with-intro' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/accordion-with-intro',
		'title' => 'Accordion With Intro',
		'textdomain' => 'capitola',
		'description' => 'Pair intro content with an accordion to organize expandable details.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'accordion',
			'intro',
			'faq',
			'toggle'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableVerticalAlign' => true,
					'disableBackgroundImage' => true
				)
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				),
				array(
					'name' => 'capitola/accordion',
					'innerBlocks' => array(
						array(
							'name' => 'capitola/accordion-item',
							'attributes' => array(
								'headline' => 'Proident commodo fugiat'
							)
						),
						array(
							'name' => 'capitola/accordion-item',
							'attributes' => array(
								'headline' => 'Qui nulla reprehenderit'
							)
						),
						array(
							'name' => 'capitola/accordion-item',
							'attributes' => array(
								'headline' => 'Exercitation nostrud ad'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'style' => 'capitola-accordion-with-intro',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'anchor-nav' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/anchor-nav',
		'title' => 'Anchor Nav',
		'textdomain' => 'capitola',
		'description' => 'Display a linked in-page navigation menu for section anchors.',
		'category' => 'nav-blocks',
		'keywords' => array(
			'anchor',
			'navigation',
			'menu',
			'table of contents'
		),
		'supports' => array(
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			)
		),
		'allowedBlocks' => array(
			'capitola/anchor-nav-item'
		),
		'example' => array(
			'attributes' => array(
				
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/accordion-item',
					'attributes' => array(
						'headline' => 'Nulla pariatur cupidatat'
					)
				),
				array(
					'name' => 'capitola/accordion-item',
					'attributes' => array(
						'headline' => 'Esse ea amet ea aliquip'
					)
				),
				array(
					'name' => 'capitola/accordion-item',
					'attributes' => array(
						'headline' => 'Sint nulla anim laborum'
					)
				)
			),
			'viewportWidth' => 1440
		),
		'style' => 'capitola-anchor-nav',
		'editorStyle' => 'capitola-anchor-nav-editor',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'viewScript' => 'file:./view.js'
	),
	'anchor-nav-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/anchor-nav-item',
		'title' => 'Anchor Nav Item',
		'textdomain' => 'capitola',
		'description' => 'Create a single linked item for use inside an Anchor Nav block.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'anchor',
			'nav item',
			'link',
			'menu'
		),
		'parent' => array(
			'capitola/anchor-nav'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => ''
			),
			'anchor' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'bg-image-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/bg-image-text',
		'title' => 'Background Image with Content Box',
		'textdomain' => 'capitola',
		'description' => '',
		'category' => 'custom-blocks',
		'keywords' => array(
			'background image',
			'content box',
			'hero',
			'overlay'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'backgroundImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'imageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'imageParallax' => array(
				'type' => 'boolean',
				'default' => false
			),
			'introRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'body'
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true,
					'disableVerticalAlign' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'backgroundImage' => array(
					'source_url' => 'https://pd.w.org/2023/04/682642d37292ba259.48288474-2048x1536.jpg'
				)
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-background-image'
	),
	'block-icon-svgs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/block-icon-svgs',
		'title' => 'Block Icon SVG Library',
		'textdomain' => 'capitola',
		'description' => 'Just for design needs, lists available SVGs for use as block icons',
		'category' => 'custom-blocks',
		'keywords' => array(
			
		),
		'supports' => array(
			'anchor' => true,
			'html' => false
		),
		'editorScript' => 'file:./index.js'
	),
	'body-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/body-text',
		'title' => 'Block Body Text',
		'textdomain' => 'capitola',
		'description' => 'Add styled heading, copy, and optional calls to action in one content block.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'text',
			'content',
			'copy',
			'cta'
		),
		'supports' => array(
			'lock' => false,
			'inserter' => false,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'backgroundImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'imageOpacity' => array(
				'type' => 'number',
				'default' => 0.5
			),
			'imageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'verticalAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'textAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'eyebrow' => array(
				'type' => 'string',
				'default' => ''
			),
			'headline' => array(
				'type' => 'string',
				'default' => ''
			),
			'eyebrowTag' => array(
				'type' => 'string',
				'default' => 'div'
			),
			'headlineTag' => array(
				'type' => 'string',
				'default' => 'h2'
			),
			'cta' => array(
				'type' => 'object',
				'default' => false
			),
			'cta2' => array(
				'type' => 'object',
				'default' => false
			),
			'isHeroVariation' => array(
				'type' => 'boolean',
				'default' => false
			),
			'imageParallax' => array(
				'type' => 'boolean',
				'default' => false
			),
			'allowedBlocks' => array(
				'type' => 'array',
				'default' => array(
					'core/paragraph',
					'core/list'
				)
			)
		),
		'variations' => array(
			array(
				'name' => 'hero-body-text',
				'title' => 'Hero Body Text',
				'attributes' => array(
					'isHeroVariation' => true,
					'headlineTag' => 'h1'
				),
				'isActive' => array(
					'isHeroVariation'
				)
			)
		),
		'usesContext' => array(
			'bodyTextOptions',
			'introAlign',
			'revealAnimation'
		),
		'viewScript' => 'capitola-animations',
		'style' => 'capitola-block-body-text',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'color-contrast-test' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/color-contrast-test',
		'title' => 'Color Contrast Test',
		'textdomain' => 'capitola',
		'description' => 'Just for design needs, renders a post feed block using each color theme',
		'category' => 'custom-blocks',
		'keywords' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'core-nav-meganav' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/core-nav-meganav',
		'title' => 'Core Nav Mega Menu',
		'category' => 'design',
		'textdomain' => 'capitola',
		'description' => 'Add a multi-column mega navigation panel with links and optional featured content for core navigation blocks.',
		'keywords' => array(
			'mega menu',
			'header',
			'navigation',
			'dropdown',
			'core'
		),
		'supports' => array(
			'html' => false,
			'interactivity' => true,
			'customCSS' => false
		),
		'parent' => array(
			'core/navigation'
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'allowedBlocks' => array(
			'capitola/core-nav-meganav-column'
		),
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js',
		'viewScriptModule' => 'file:./view.js'
	),
	'core-nav-meganav-column' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/core-nav-meganav-column',
		'title' => 'Core Nav Mega Menu Column',
		'category' => 'design',
		'icon' => 'columns',
		'description' => 'Column container for Core Nav Mega Menu.',
		'parent' => array(
			'capitola/core-nav-meganav'
		),
		'allowedBlocks' => array(
			'core/image',
			'core/navigation-link'
		),
		'supports' => array(
			'html' => false,
			'reusable' => false,
			'customCSS' => false
		),
		'attributes' => array(
			
		),
		'textdomain' => 'capitola',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'cover-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/cover-block',
		'title' => 'Cover Block',
		'textdomain' => 'capitola',
		'description' => 'Show headline, copy, and calls to action over a full-width background image.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'cover',
			'hero',
			'banner',
			'background image'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'backgroundImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'imageOpacity' => array(
				'type' => 'number',
				'default' => 0.5
			),
			'imageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'imageParallax' => array(
				'type' => 'boolean',
				'default' => false
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'eyebrow' => array(
				'type' => 'string',
				'default' => ''
			),
			'eyebrowTag' => array(
				'type' => 'string',
				'default' => 'div'
			),
			'headline' => array(
				'type' => 'string',
				'default' => ''
			),
			'headlineTag' => array(
				'type' => 'string',
				'default' => 'h2'
			),
			'cta' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'cta2' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'isHeroVariation' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'variations' => array(
			array(
				'name' => 'background-image-hero',
				'title' => 'Background Image Hero',
				'category' => 'hero-blocks',
				'attributes' => array(
					'isHeroVariation' => true,
					'headlineTag' => 'h1'
				),
				'isActive' => array(
					'isHeroVariation'
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'backgroundImage' => array(
					'source_url' => 'https://pd.w.org/2022/11/471636e75a59f2df1.27699711-2048x1536.jpg'
				),
				'eyebrow' => 'Aute culpa',
				'headline' => 'Et exercitation officia',
				'cta' => array(
					'title' => 'Pariatur',
					'link' => array(
						'url' => '/'
					)
				),
				'cta2' => array(
					'title' => 'Dolor dolor',
					'link' => array(
						'url' => '/'
					)
				)
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Anim occaecat consectetur consectetur laborum consequat voluptate aute fugiat et minim non commodo est. Id irure veniam ad cillum tempor. Id amet cupidatat culpa elit cillum laborum tempor eiusmod pariatur quis dolore magna. Non ad nisi dolor duis deserunt.'
					)
				)
			),
			'viewportWidth' => 1440
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-cover-block'
	),
	'detailed-links' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/detailed-links',
		'title' => 'Detailed Links',
		'textdomain' => 'capitola',
		'description' => 'Display a list of rich link cards with optional images and excerpts.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'links',
			'cards',
			'featured links',
			'list'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'excerptLines' => array(
				'type' => 'integer',
				'default' => 3
			),
			'showImage' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				),
				array(
					'name' => 'capitola/detailed-links-list',
					'innerBlocks' => array(
						array(
							'name' => 'capitola/detailed-links-item',
							'attributes' => array(
								'linkImage' => array(
									'source_url' => 'https://pd.w.org/2025/07/3686b56bb5654b3.99596342-768x543.jpg'
								),
								'linkTitle' => 'Culpa qui dolor excepteur',
								'linkExcerpt' => 'Consectetur occaecat amet culpa laborum deserunt ex cillum sit dolore sint deserunt tempor velit.'
							)
						),
						array(
							'name' => 'capitola/detailed-links-item',
							'attributes' => array(
								'linkImage' => array(
									'source_url' => 'https://pd.w.org/2025/07/89686b5514040159.33508500-768x432.jpg'
								),
								'linkTitle' => 'Tempor sunt minim',
								'linkExcerpt' => 'Commodo tempor irure id labore dolore velit excepteur occaecat duis minim ea quis deserunt.'
							)
						),
						array(
							'name' => 'capitola/detailed-links-item',
							'attributes' => array(
								'linkImage' => array(
									'source_url' => 'https://pd.w.org/2025/06/30685e94efbcbdb2.81046047-768x576.jpeg'
								),
								'linkTitle' => 'Ea irure quis cillum',
								'linkExcerpt' => 'Ad ipsum nostrud dolore deserunt adipisicing ullamco exercitation laborum nisi eiusmod.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'revealAnimation' => 'revealAnimation',
			'showExcerpt' => 'showExcerpt',
			'showImage' => 'showImage',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'style' => 'capitola-side-detailed-link-list',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'detailed-links-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/detailed-links-item',
		'title' => 'Detailed Link List Item',
		'textdomain' => 'capitola',
		'description' => 'Create one detailed link card item with image, title, and excerpt.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'link item',
			'card',
			'featured link',
			'excerpt'
		),
		'parent' => array(
			'capitola/detailed-links-list'
		),
		'supports' => array(
			'anchor' => false,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'postType' => array(
				'type' => 'string',
				'default' => 'post'
			),
			'postId' => array(
				'type' => 'integer',
				'default' => 0
			),
			'linkImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'linkTitle' => array(
				'type' => 'string',
				'default' => ''
			),
			'linkExcerpt' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'usesContext' => array(
			'showExcerpt',
			'showImage'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'detailed-links-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/detailed-links-list',
		'title' => 'Detailed Links List',
		'textdomain' => 'capitola',
		'description' => 'Hold a collection of detailed link card items inside the Detailed Links block.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'links list',
			'cards',
			'featured links',
			'list'
		),
		'supports' => array(
			'inserter' => false,
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/detailed-links'
		),
		'usesContext' => array(
			'introAlign',
			'revealAnimation'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'dummy-form' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/dummy-form',
		'title' => 'Dummy Form',
		'textdomain' => 'capitola',
		'description' => 'Used only for block previews',
		'supports' => array(
			'inserter' => false,
			'html' => false
		),
		'editorScript' => 'file:./index.js'
	),
	'eyebrow' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/eyebrow',
		'title' => 'Eyebrow',
		'textdomain' => 'capitola',
		'category' => 'text',
		'description' => 'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.',
		'keywords' => array(
			'title',
			'subtitle'
		),
		'attributes' => array(
			'textAlign' => array(
				'type' => 'string'
			),
			'content' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'div,h1,h2,h3,h4,h5,h6',
				'default' => '',
				'__experimentalRole' => 'content'
			),
			'tag' => array(
				'type' => 'number',
				'default' => 0
			),
			'placeholder' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'left',
				'center'
			),
			'anchor' => true,
			'className' => true,
			'html' => false,
			'__unstablePasteTextInline' => true,
			'__experimentalSlashInserter' => true,
			'customCSS' => false
		),
		'editorScript' => 'file:./index.js'
	),
	'featured-posts' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/featured-posts',
		'title' => 'Featured Posts',
		'textdomain' => 'capitola',
		'description' => 'Highlight selected posts in a styled listing or slider layout.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'featured posts',
			'posts',
			'listing',
			'slider'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'listLayout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'showSlideCount' => array(
				'type' => 'boolean',
				'default' => true
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'Read More'
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'titleLocation' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'showByline' => array(
				'type' => 'boolean',
				'default' => true
			),
			'postType' => array(
				'type' => 'string',
				'default' => 'post'
			),
			'posts' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => false,
					'disableVerticalAlign' => true
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'isExample' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'isExample' => true,
				'limit' => '6',
				'listLayout' => 'column-3'
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign',
			'isExample' => 'isExample'
		),
		'style' => 'capitola-post-listing',
		'viewScript' => array(
			'capitola-listing-sidescroll',
			'capitola-animations'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'fixed-background' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/fixed-background',
		'title' => 'Fixed Background',
		'textdomain' => 'capitola',
		'description' => 'Layer content over a fixed background image.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'fixed background',
			'parallax',
			'background image',
			'section'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'mobileImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'tabletImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'desktopImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'colorThemeBody' => array(
				'type' => 'boolean',
				'default' => false
			),
			'imageOpacity' => array(
				'type' => 'number',
				'default' => 0.5
			),
			'introRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'body'
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true,
					'disableVerticalAlign' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'desktopImage' => array(
					'source_url' => 'https://pd.w.org/2022/11/471636e75a59f2df1.27699711-2048x1536.jpg'
				)
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-fixed-background',
		'editorStyle' => 'capitola-fixed-background-editor',
		'viewScript' => array(
			'capitola-animations',
			'file:./view.js'
		)
	),
	'footer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/footer',
		'title' => 'Site Footer',
		'textdomain' => 'capitola',
		'description' => 'Display the site footer with business details, social links, and optional cookie banner.',
		'category' => 'nav-blocks',
		'keywords' => array(
			'footer',
			'site footer',
			'contact info',
			'social links'
		),
		'supports' => array(
			'multiple' => false,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'showBusinessName' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showAddress' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showMapLink' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showPhoneNumber' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showEmail' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showSocials' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showHours' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showCookieBanner' => array(
				'type' => 'boolean',
				'default' => true
			),
			'cookieBannerText' => array(
				'type' => 'string',
				'default' => ''
			),
			'cookieBannerCloseText' => array(
				'type' => 'string',
				'default' => 'Understand'
			),
			'cookieBannerTheme' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'example' => array(
			'viewportWidth' => 1440
		),
		'style' => 'capitola-footer',
		'editorStyle' => 'capitola-footer-editor',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'footer-link-column' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/footer-link-column',
		'title' => 'Footer Link Column',
		'textdomain' => 'capitola',
		'description' => 'Add a column of footer links with a heading inside the Site Footer block.',
		'category' => 'nav-blocks',
		'keywords' => array(
			'footer',
			'footer links',
			'link column',
			'navigation'
		),
		'parent' => array(
			'capitola/footer'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'headline' => array(
				'type' => 'string',
				'default' => ''
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'form-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/form-block',
		'title' => 'Form Block',
		'textdomain' => 'capitola',
		'description' => 'Pair introductory content with an embedded form in a two-column layout.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'form',
			'contact form',
			'lead form',
			'two column'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				),
				array(
					'name' => 'capitola/inner-block-wrap',
					'attributes' => array(
						'className' => 'wp-block-capitola-form-block__form-col capitola-form'
					),
					'innerBlocks' => array(
						array(
							'name' => 'capitola/dummy-form'
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'style' => array(
			'capitola-form-block',
			'capitola-wp-forms',
			'capitola-GForm'
		),
		'editorScript' => 'file:./index.js'
	),
	'full-width-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/full-width-slider',
		'title' => 'Full Width Slider',
		'textdomain' => 'capitola',
		'description' => 'Display a full-width image slider with captions, links, and optional intro content.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'slider',
			'carousel',
			'gallery',
			'full width'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'transition' => array(
				'type' => 'string',
				'default' => 'slide'
			),
			'navigation' => array(
				'type' => 'string',
				'default' => 'arrows'
			),
			'aspectRatio' => array(
				'type' => 'string',
				'default' => '16-9'
			),
			'sliderRadius' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'stickySlider' => array(
				'type' => 'boolean',
				'default' => false
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'slides' => array(
				'type' => 'array',
				'default' => array(
					array(
						'image' => array(
							'id' => 0,
							'source_url' => ''
						),
						'caption' => '',
						'link' => array(
							
						)
					)
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'slides' => array(
					array(
						'image' => array(
							'source_url' => 'https://pd.w.org/2023/12/46665733547928280.70690426-1536x1152.jpg'
						),
						'caption' => 'Voluptate aliquip tempor ad sunt ullamco cillum aute Lorem pariatur incididunt ut tempor eiusmod aliquip.',
						'link' => false,
						'ctaLabel' => 'Do tempor'
					)
				)
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'render' => 'file:./render.php',
		'style' => array(
			'swiper',
			'capitola-full-width-slider'
		),
		'viewScript' => array(
			'file:./view.js',
			'capitola-animations'
		),
		'editorScript' => 'file:./index.js'
	),
	'icon-grid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/icon-grid',
		'title' => 'Icon Grid',
		'textdomain' => 'capitola',
		'description' => 'Arrange icon items in a grid layout within the Icons block.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'icons',
			'grid',
			'features',
			'icon list'
		),
		'supports' => array(
			'lock' => false,
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/icons'
		),
		'attributes' => array(
			
		),
		'usesContext' => array(
			'revealAnimation',
			'introAlign'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'icon-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/icon-item',
		'title' => 'Icon Item',
		'textdomain' => 'capitola',
		'description' => 'Add a single icon with title and caption inside an Icon Grid.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'icon',
			'feature',
			'icon item',
			'caption'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/icon-grid'
		),
		'attributes' => array(
			'icon' => array(
				'type' => 'string',
				'default' => ''
			),
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'caption' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'icons' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/icons',
		'title' => 'Icons',
		'textdomain' => 'capitola',
		'description' => 'Show a customizable grid of icon items with titles and captions.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'icons',
			'icon grid',
			'features',
			'highlights'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'textAlignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'iconBackground' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				),
				array(
					'name' => 'capitola/icon-grid',
					'innerBlocks' => array(
						array(
							'name' => 'capitola/icon-item',
							'attributes' => array(
								'icon' => 'fa-award',
								'title' => 'Porttitor consectetur',
								'caption' => 'Vivamus elit leo porttitor leo vendor'
							)
						),
						array(
							'name' => 'capitola/icon-item',
							'attributes' => array(
								'icon' => 'fa-sun-solid',
								'title' => 'Leo sed leo vivamus',
								'caption' => 'Aenean eiusmod porttitor aenean vendor'
							)
						),
						array(
							'name' => 'capitola/icon-item',
							'attributes' => array(
								'icon' => 'fa-plane',
								'title' => 'Elit leo elit ipsum elit',
								'caption' => 'Aenean eiusmod porttitor aenean vendor'
							)
						),
						array(
							'name' => 'capitola/icon-item',
							'attributes' => array(
								'icon' => 'fa-burger',
								'title' => 'Elementum vivamus',
								'caption' => 'Elit elementum leo consectetur sit'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'style' => array(
			'capitola-icons'
		),
		'editorScript' => 'file:./index.js'
	),
	'iframe-wrapper' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/iframe-wrapper',
		'title' => 'iFrame Wrapper',
		'textdomain' => 'capitola',
		'description' => 'Embed iframe content with controlled aspect ratio and responsive sizing.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'iframe',
			'embed',
			'video',
			'map'
		),
		'supports' => array(
			'anchor' => true,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => ''
			),
			'aspectRatio' => array(
				'type' => 'string',
				'default' => '16-9'
			),
			'iframeHtml' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'example' => array(
			
		),
		'render' => 'file:./render.php',
		'style' => 'capitola-iframe-wrapper',
		'editorStyle' => 'capitola-iframe-wrapper-editor',
		'editorScript' => 'file:./index.js'
	),
	'image-link-grid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/image-link-grid',
		'title' => 'Image Link Grid',
		'textdomain' => 'capitola',
		'description' => 'Display a grid layout of linked image cards within the Image Link Grid Block.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'image links',
			'grid',
			'cards',
			'gallery'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/image-link-grid-block'
		),
		'attributes' => array(
			
		),
		'usesContext' => array(
			'gridLayout',
			'gridGap',
			'excerptLines'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'image-link-grid-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/image-link-grid-block',
		'title' => 'Image Link Grid Block',
		'textdomain' => 'capitola',
		'description' => 'Combine intro content with a configurable grid of image link cards.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'image links',
			'grid',
			'cards',
			'featured links'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'gridLayout' => array(
				'type' => 'string',
				'default' => '3-col'
			),
			'gridGap' => array(
				'type' => 'boolean',
				'default' => true
			),
			'excerptLines' => array(
				'type' => 'integer',
				'default' => 4
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableVerticalAlign' => true,
					'disableBackgroundImage' => true
				)
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				),
				array(
					'name' => 'capitola/image-link-grid',
					'innerBlocks' => array(
						array(
							'name' => 'capitola/image-link-grid-item',
							'attributes' => array(
								'eyebrowOverride' => 'Eu do Lorem',
								'titleOverride' => 'Deserunt sint non',
								'imageOverride' => array(
									'source_url' => 'https://pd.w.org/2024/11/545674ab2c37ed523.13344924-768x576.jpg'
								)
							)
						),
						array(
							'name' => 'capitola/image-link-grid-item',
							'attributes' => array(
								'eyebrowOverride' => 'Esse proident deserunt',
								'titleOverride' => 'Quis deserunt aliqua',
								'imageOverride' => array(
									'source_url' => 'https://pd.w.org/2024/11/19567436fae362b39.71211119-768x1366.jpg'
								)
							)
						),
						array(
							'name' => 'capitola/image-link-grid-item',
							'attributes' => array(
								'eyebrowOverride' => 'Officia commodo sit',
								'titleOverride' => 'Exercitation anim ad',
								'imageOverride' => array(
									'source_url' => 'https://pd.w.org/2024/11/298674aa6951329d5.88446929-768x576.jpeg'
								)
							)
						),
						array(
							'name' => 'capitola/image-link-grid-item',
							'attributes' => array(
								'eyebrowOverride' => 'Lorem sint mollit',
								'titleOverride' => 'Anim quis commodo ex',
								'imageOverride' => array(
									'source_url' => 'https://pd.w.org/2024/11/8226747c91210db52.96035363-768x512.jpg'
								)
							)
						),
						array(
							'name' => 'capitola/image-link-grid-item',
							'attributes' => array(
								'eyebrowOverride' => 'Proident aliquip',
								'titleOverride' => 'Est enim fugiat',
								'imageOverride' => array(
									'source_url' => 'https://pd.w.org/2024/11/1686743ce9d93bd35.81469742-768x432.jpeg'
								)
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign',
			'gridLayout' => 'gridLayout',
			'gridGap' => 'gridGap',
			'excerptLines' => 'excerptLines'
		),
		'viewScript' => 'capitola-animations',
		'style' => 'capitola-image-link-grid-block',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'image-link-grid-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/image-link-grid-item',
		'title' => 'Image Link Grid Item',
		'textdomain' => 'capitola',
		'description' => 'Add one linked image card item inside an Image Link Grid.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'image link',
			'grid item',
			'card',
			'featured link'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/image-link-grid'
		),
		'attributes' => array(
			'postType' => array(
				'type' => 'string',
				'default' => 'page'
			),
			'postId' => array(
				'type' => 'integer',
				'default' => 0
			),
			'imageOverride' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'eyebrowOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'titleOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'excerptOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'ctaOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageOpacity' => array(
				'type' => 'number',
				'default' => 0.5
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'inner-block-wrap' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/inner-block-wrap',
		'title' => 'Inner Blocks Wrapper',
		'textdomain' => 'capitola',
		'description' => 'Wrap and constrain nested inner blocks with optional template settings.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'wrapper',
			'inner blocks',
			'container',
			'layout'
		),
		'supports' => array(
			'inserter' => false,
			'lock' => false,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'allowedBlocks' => array(
				'type' => 'array',
				'default' => true
			),
			'templateLock' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'lightbox-gallery' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'version' => '0.1.0',
		'name' => 'capitola/lightbox-gallery',
		'title' => 'Lightbox Gallery',
		'textdomain' => 'capitola',
		'description' => 'Display an image gallery with lightbox viewing and optional sticky behavior.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'gallery',
			'lightbox',
			'images',
			'photo'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'useFeaturedImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'aspectRatio' => array(
				'type' => 'string',
				'default' => '16-9'
			),
			'isSticky' => array(
				'type' => 'boolean',
				'default' => false
			),
			'allowSticky' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'useFeaturedImage' => false,
				'images' => array(
					array(
						'source_url' => 'https://pd.w.org/2024/04/601662e949be4e407.44409102-1536x1024.jpg'
					),
					array(
						'source_url' => 'https://pd.w.org/2024/04/98466304b6ab59595.08465300-1536x864.jpeg'
					),
					array(
						'source_url' => 'https://pd.w.org/2024/04/262662f618541fff6.47385273-1536x1024.jpg'
					),
					array(
						'source_url' => 'https://pd.w.org/2024/04/805662884eb1cc955.79073565-768x576.jpg'
					),
					array(
						'source_url' => 'https://pd.w.org/2024/04/739662baaba6ff1e6.82080383-768x512.jpg'
					),
					array(
						'source_url' => 'https://pd.w.org/2024/04/695662884a0371036.90674641-768x576.jpg'
					)
				)
			),
			'viewportWidth' => 1440
		),
		'style' => 'capitola-lightbox-gallery',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'link-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/link-list',
		'title' => 'Link List',
		'textdomain' => 'capitola',
		'description' => 'Display a simple list of links with optional custom titles.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'links',
			'list',
			'navigation',
			'menu'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'links' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'isExample' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'links' => array(
					array(
						'title' => 'Excepteur ullamco duis',
						'link' => array(
							'url' => '/'
						)
					),
					array(
						'title' => 'Ut enim dolore consequat',
						'link' => array(
							'url' => '/'
						)
					),
					array(
						'title' => 'Laboris dolore occaecat',
						'link' => array(
							'url' => '/'
						)
					),
					array(
						'title' => 'Aute Lorem excepteur',
						'link' => array(
							'url' => '/'
						)
					)
				),
				'isExample' => true
			),
			'viewportWidth' => 1440
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-link-list'
	),
	'nav' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/nav',
		'title' => 'Site Nav Header',
		'textdomain' => 'capitola',
		'description' => 'Display the site header navigation with logo, utility links, and optional icons.',
		'category' => 'nav-blocks',
		'keywords' => array(
			'nav',
			'header',
			'navigation',
			'menu'
		),
		'supports' => array(
			'multiple' => false,
			'interactivity' => true,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'logo' => array(
				'type' => 'integer',
				'default' => 0
			),
			'useLogoColor' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showAccountIcon' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showCartIcon' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showPhoneLink' => array(
				'type' => 'boolean',
				'default' => true
			),
			'utilityLinks' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'stickyStyle' => array(
				'type' => 'string',
				'default' => '--reveal-down'
			),
			'dropdownSpeed' => array(
				'type' => 'number',
				'default' => '0.2'
			),
			'isExample' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'isExample' => true
			),
			'viewportWidth' => 1440
		),
		'render' => 'file:./render.php',
		'style' => 'capitola-nav',
		'editorStyle' => 'capitola-nav-editor',
		'viewScriptModule' => 'file:./view.js',
		'editorScript' => 'file:./index.js'
	),
	'nav-dropdown' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/nav-dropdown',
		'title' => 'Nav Dropdown',
		'textdomain' => 'capitola',
		'description' => 'Add a dropdown navigation group with manual or auto-populated links.',
		'category' => 'nav-blocks',
		'keywords' => array(
			'dropdown',
			'header',
			'navigation',
			'menu'
		),
		'parent' => array(
			'capitola/nav'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'alignment' => array(
				'type' => 'string',
				'default' => '--right-align'
			),
			'populationMethod' => array(
				'type' => 'string',
				'default' => 'manual'
			),
			'autoPopulatePostType' => array(
				'type' => 'string',
				'default' => 'page'
			),
			'columns' => array(
				'type' => 'integer',
				'default' => 1
			)
		),
		'style' => 'capitola-nav-dropdown',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'nav-link' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/nav-link',
		'title' => 'Nav Link',
		'textdomain' => 'capitola',
		'description' => 'Add a single top-level navigation link to the Site Nav Header.',
		'category' => 'nav-blocks',
		'keywords' => array(
			'nav link',
			'header',
			'navigation',
			'menu'
		),
		'parent' => array(
			'capitola/nav'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'nav-mega-nav' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/nav-mega-nav',
		'title' => 'Mega Nav',
		'textdomain' => 'capitola',
		'description' => 'Add a multi-column mega navigation panel with links and optional featured content.',
		'category' => 'nav-blocks',
		'keywords' => array(
			'mega menu',
			'header',
			'navigation',
			'dropdown'
		),
		'parent' => array(
			'capitola/nav'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'imageId' => array(
				'type' => 'integer',
				'default' => 0
			),
			'headline' => array(
				'type' => 'string',
				'default' => ''
			),
			'intro' => array(
				'type' => 'string',
				'default' => ''
			),
			'linksPerColumn' => array(
				'type' => 'integer',
				'default' => 5
			),
			'populationMethod' => array(
				'type' => 'string',
				'default' => 'manual'
			),
			'autoPopulatePostType' => array(
				'type' => 'string',
				'default' => 'page'
			)
		),
		'render' => 'file:./render.php',
		'style' => 'capitola-nav-mega-nav',
		'editorScript' => 'file:./index.js'
	),
	'nav-sublink' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/nav-sublink',
		'title' => 'Nav Submenu Link',
		'textdomain' => 'capitola',
		'description' => 'Add a single submenu link inside dropdown, mega nav, or footer link columns.',
		'category' => 'nav-blocks',
		'keywords' => array(
			'submenu',
			'nav sublink',
			'navigation',
			'menu item'
		),
		'parent' => array(
			'capitola/nav-dropdown',
			'capitola/nav-mega-nav',
			'capitola/footer-link-column'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'open-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/open-content',
		'title' => 'Open Content Layout',
		'textdomain' => 'capitola',
		'description' => 'Display flexible open-width content with customizable alignment and spacing.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'content',
			'layout',
			'open content',
			'text block'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'contentJustify' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'textAlign' => array(
				'type' => 'string',
				'default' => 'left'
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/heading',
					'attributes' => array(
						'content' => 'Tempor laborum ea nostrud'
					)
				),
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Anim occaecat consectetur consectetur laborum consequat voluptate aute fugiat et minim non commodo est. Id irure veniam ad cillum tempor. Id amet cupidatat culpa elit cillum laborum tempor eiusmod pariatur quis dolore magna. Non ad nisi dolor duis deserunt.'
					)
				),
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Incididunt velit aliquip exercitation quis eu mollit labore. Lorem irure anim non est ad qui ipsum tempor pariatur. Officia aute eu magna amet proident consequat sit deserunt. Fugiat aliquip laborum enim ullamco ea aliquip.'
					)
				)
			),
			'viewportWidth' => 1440
		),
		'render' => 'file:./render.php',
		'style' => array(
			'capitola-open-content'
		),
		'editorScript' => 'file:./index.js'
	),
	'paginated-listings' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/paginated-listings',
		'title' => 'Paginated Listings',
		'textdomain' => 'capitola',
		'description' => 'Display filterable and searchable post listings with pagination controls.',
		'category' => 'listing-blocks',
		'keywords' => array(
			'listings',
			'pagination',
			'filters',
			'search'
		),
		'supports' => array(
			'anchor' => true,
			'multiple' => false,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'body'
				)
			),
			'listLayout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date'
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'orderingOptions' => array(
				'type' => 'object',
				'default' => false
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'Read More'
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'excerptLines' => array(
				'type' => 'integer',
				'default' => 4
			),
			'titleLocation' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'showByline' => array(
				'type' => 'boolean',
				'default' => true
			),
			'postType' => array(
				'type' => 'string',
				'default' => 'post'
			),
			'baseTaxonomy' => array(
				'type' => 'string',
				'default' => 'category'
			),
			'baseTerm' => array(
				'type' => 'string',
				'default' => '0'
			),
			'limit' => array(
				'type' => 'integer',
				'default' => 12
			),
			'showTaxFilters' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'showSorts' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showSearchFields' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'setHiddens' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true,
					'disableVerticalAlign' => true
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'postTypes' => array(
				'type' => 'object',
				'default' => array(
					'post' => array(
						'name' => 'Articles',
						'taxonomies' => array(
							'category'
						),
						'sorts' => array(
							'date',
							'title'
						)
					)
				)
			),
			'orderbyOptions' => array(
				'type' => 'object',
				'default' => array(
					'date' => array(
						'label' => 'Date',
						'order' => 'desc'
					),
					'title' => array(
						'label' => 'A-Z',
						'order' => 'asc'
					),
					'random' => array(
						'label' => 'Random',
						'order' => 'asc'
					),
					'event_date' => array(
						'label' => 'Date',
						'order' => 'asc'
					),
					'menu_order' => array(
						'label' => 'Default',
						'order' => 'asc'
					)
				)
			),
			'taxParams' => array(
				'type' => 'object',
				'default' => array(
					'category' => 'categories'
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'showExcerpt' => false,
				'listLayout' => 'masonry',
				'limit' => 6
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'render' => 'file:./render.php',
		'style' => array(
			'capitola-post-filters',
			'capitola-post-listing',
			'capitola-page-navigation'
		),
		'viewScript' => array(
			'file:./view.js',
			'capitola-animations'
		),
		'editorScript' => 'file:./index.js'
	),
	'post-feed' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/post-feed',
		'title' => 'Post Feed',
		'textdomain' => 'capitola',
		'description' => 'Display recent or selected posts in list, grid, or slider feed layouts.',
		'category' => 'listing-blocks',
		'keywords' => array(
			'post feed',
			'posts',
			'listing',
			'slider'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'listLayout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'showSlideCount' => array(
				'type' => 'boolean',
				'default' => true
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date'
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'orderingOptions' => array(
				'type' => 'array',
				'default' => array(
					array(
						'value' => 'date',
						'label' => 'Date'
					),
					array(
						'value' => 'title',
						'label' => 'Title'
					)
				)
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'Read Article'
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'excerptLines' => array(
				'type' => 'integer',
				'default' => 4
			),
			'titleLocation' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'showByline' => array(
				'type' => 'boolean',
				'default' => true
			),
			'postType' => array(
				'type' => 'string',
				'default' => 'post'
			),
			'postCategory' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'futureOnly' => array(
				'type' => 'boolean',
				'default' => false
			),
			'limit' => array(
				'type' => 'integer',
				'default' => 12
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => false,
					'disableVerticalAlign' => true
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'top'
			)
		),
		'example' => array(
			'attributes' => array(
				'listLayout' => 'column-3',
				'limit' => 6
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'style' => 'capitola-post-listing',
		'viewScript' => array(
			'capitola-listing-sidescroll',
			'capitola-animations'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'post-hero' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/post-hero',
		'title' => 'Post Hero',
		'textdomain' => 'capitola',
		'description' => 'Display a post hero header with title, metadata, and featured image.',
		'category' => 'hero-blocks',
		'keywords' => array(
			'post hero',
			'hero',
			'featured image',
			'article header'
		),
		'supports' => array(
			'multiple' => false,
			'spacing' => array(
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'headline' => array(
				'type' => 'string',
				'default' => ''
			),
			'headlineTag' => array(
				'type' => 'string',
				'default' => 'h1'
			),
			'showSocials' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showDate' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showByline' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showFeaturedImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'imageLocation' => array(
				'type' => 'string',
				'default' => 'bottom'
			),
			'featuredImage' => array(
				'type' => 'integer',
				'default' => 0
			)
		),
		'example' => array(
			'attributes' => array(
				'featuredImage' => array(
					'source_url' => 'https://pd.w.org/2023/08/90464e6cdeeed8d02.58104016-1536x1024.jpg'
				),
				'headline' => 'Page Title'
			),
			'viewportWidth' => 1440
		),
		'style' => 'capitola-post-hero',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'related-posts' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/related-posts',
		'title' => 'Related Posts',
		'textdomain' => 'capitola',
		'description' => 'Display posts related to the current post in list, grid, or slider layouts.',
		'category' => 'listing-blocks',
		'keywords' => array(
			'related posts',
			'posts',
			'listing',
			'slider'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'limit' => array(
				'type' => 'integer',
				'default' => 12
			),
			'listLayout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'showSlideCount' => array(
				'type' => 'boolean',
				'default' => true
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'Read More'
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'excerptLines' => array(
				'type' => 'integer',
				'default' => 4
			),
			'titleLocation' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'showByline' => array(
				'type' => 'boolean',
				'default' => true
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => false,
					'disableVerticalAlign' => true
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'postsTypeQueryArgs' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'isExample' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'isExample' => true,
				'limit' => '6',
				'listLayout' => 'column-3'
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'style' => 'capitola-post-listing',
		'viewScript' => array(
			'capitola-listing-sidescroll',
			'capitola-animations'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'search-results' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/search-listings',
		'title' => 'Search Listings',
		'textdomain' => 'capitola',
		'description' => 'Display paginated search results with customizable listing layout and sorting.',
		'category' => 'listing-blocks',
		'keywords' => array(
			'search',
			'results',
			'listings',
			'pagination'
		),
		'supports' => array(
			'multiple' => false,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'body'
				)
			),
			'listLayout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'id'
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'orderingOptions' => array(
				'type' => 'object',
				'default' => false
			),
			'headline' => array(
				'type' => 'string',
				'default' => ''
			),
			'headlineTag' => array(
				'type' => 'string',
				'default' => 'h2'
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'titleLocation' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => ''
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'excerptLines' => array(
				'type' => 'integer',
				'default' => 4
			),
			'limit' => array(
				'type' => 'integer',
				'default' => 12
			)
		),
		'example' => array(
			'viewportWidth' => 1440
		),
		'render' => 'file:./render.php',
		'style' => array(
			'capitola-post-listing',
			'capitola-page-navigation'
		),
		'editorScript' => 'file:./index.js'
	),
	'side-image' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/side-image',
		'title' => 'Side Image',
		'textdomain' => 'capitola',
		'description' => 'Pair text content with an image in a side-by-side layout.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'side image',
			'media',
			'two column',
			'split layout'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'mediaWidth' => array(
				'type' => 'integer',
				'default' => 50
			),
			'imageLayout' => array(
				'type' => 'string',
				'default' => 'inner'
			),
			'imageParallax' => array(
				'type' => 'boolean',
				'default' => false
			),
			'allowImageLayout' => array(
				'type' => 'boolean',
				'default' => true
			),
			'mediaType' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'stickyImage' => array(
				'type' => 'boolean',
				'default' => false
			),
			'externalImage' => array(
				'type' => 'boolean',
				'default' => false
			),
			'imageUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'videoUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageAlt' => array(
				'type' => 'string',
				'default' => ''
			),
			'sideImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'imageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'iframeCode' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageRatio' => array(
				'type' => 'string',
				'default' => '16-9'
			),
			'imageRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'showCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'imageCaption' => array(
				'type' => 'string',
				'default' => ''
			),
			'verticalAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'videoSource' => array(
				'type' => 'string',
				'default' => 'youtube'
			),
			'videoObject' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'videoID' => array(
				'type' => 'string',
				'default' => ''
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'isVideoVariation' => array(
				'type' => 'boolean',
				'default' => false
			),
			'isHeroVariation' => array(
				'type' => 'boolean',
				'default' => false
			),
			'isIframeVariation' => array(
				'type' => 'boolean',
				'default' => false
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true,
					'disableVerticalAlign' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'sideImage' => array(
					'source_url' => 'https://pd.w.org/2023/05/8616454d45ef02002.62343426-1536x1152.jpeg'
				),
				'imageLayout' => 'full',
				'videoSource' => 'youtube',
				'videoID' => 'K3106WtK-zg'
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'variations' => array(
			array(
				'name' => 'side-video-cta',
				'title' => 'Side Video',
				'description' => 'Pair text content with a video in a side-by-side layout.',
				'attributes' => array(
					'imageLayout' => 'inner',
					'mediaType' => 'video',
					'allowImageLayout' => false,
					'videoSource' => 'youtube',
					'isVideoVariation' => true
				),
				'isActive' => array(
					'isVideoVariation'
				)
			),
			array(
				'name' => 'side-iframe-cta',
				'title' => 'Side iFrame',
				'description' => 'Pair text content with an iframe in a side-by-side layout.',
				'attributes' => array(
					'imageLayout' => 'inner',
					'mediaType' => 'iframe',
					'allowImageLayout' => false,
					'isIframeVariation' => true
				),
				'isActive' => array(
					'isIframeVariation'
				)
			),
			array(
				'name' => 'side-image-hero',
				'title' => 'Side Image Hero',
				'description' => 'Page hero with a side image.',
				'category' => 'hero-blocks',
				'attributes' => array(
					'imageLayout' => 'full',
					'headlineTag' => 'h1',
					'isHeroVariation' => true
				),
				'isActive' => array(
					'isHeroVariation'
				)
			)
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-side-image',
		'editorStyle' => 'capitola-side-image-editor'
	),
	'simple-spacer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/simple-spacer',
		'title' => 'Spacer',
		'textdomain' => 'capitola',
		'description' => 'Add adjustable vertical spacing between content sections.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'spacer',
			'spacing',
			'gap',
			'layout'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'styles' => array(
			array(
				'name' => 'xxlarge',
				'label' => 'XXLarge'
			),
			array(
				'name' => 'xlarge',
				'label' => 'XLarge',
				'isDefault' => true
			),
			array(
				'name' => 'large',
				'label' => 'Large'
			),
			array(
				'name' => 'medium',
				'label' => 'Medium'
			),
			array(
				'name' => 'small',
				'label' => 'Small'
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-simple-spacer'
	),
	'small-image-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/small-image-slider',
		'title' => 'Small Image Slider',
		'textdomain' => 'capitola',
		'description' => 'Display a compact image slider with optional captions and autoplay.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'slider',
			'carousel',
			'images',
			'gallery'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'aspectRatio' => array(
				'type' => 'string',
				'default' => 'square'
			),
			'grayscaleInactive' => array(
				'type' => 'boolean',
				'default' => true
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'slides' => array(
				'type' => 'array',
				'default' => array(
					array(
						'image' => 0,
						'caption' => ''
					)
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true,
					'disableVerticalAlign' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'slides' => array(
					array(
						'image' => array(
							'source_url' => 'https://pd.w.org/2023/12/46665733547928280.70690426-1536x1152.jpg'
						),
						'caption' => 'Voluptate aliquip tempor ad sunt ullamco cillum aute Lorem pariatur incididunt ut tempor eiusmod aliquip.',
						'link' => false,
						'ctaLabel' => 'Do tempor'
					),
					array(
						'image' => array(
							'source_url' => 'https://pd.w.org/2023/12/2846572fc1dea2e71.03572528-1536x1536.jpeg'
						),
						'caption' => '',
						'link' => false,
						'ctaLabel' => ''
					),
					array(
						'image' => array(
							'source_url' => 'https://pd.w.org/2023/12/9336572e920b43606.87736263-1536x1152.jpeg'
						),
						'caption' => '',
						'link' => false,
						'ctaLabel' => ''
					),
					array(
						'image' => array(
							'source_url' => 'https://pd.w.org/2023/12/256572e6018ca870.04948732-1536x1152.jpeg'
						),
						'caption' => '',
						'link' => false,
						'ctaLabel' => ''
					)
				)
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'render' => 'file:./render.php',
		'style' => 'capitola-small-image-slider',
		'viewScript' => array(
			'file:./view.js',
			'capitola-animations'
		),
		'editorScript' => 'file:./index.js'
	),
	'social-shares' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/social-shares',
		'title' => 'Social Shares',
		'textdomain' => 'capitola',
		'description' => 'Display social sharing links for the current post or page.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'social',
			'share',
			'sharing',
			'social media'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'exampleData' => array(
				'type' => 'object',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'exampleData' => array(
					'eventPrice' => '500',
					'allDay' => true,
					'eventDates' => '2024-10-15',
					'eventSpots' => '12'
				)
			),
			'viewportWidth' => 1440
		),
		'style' => 'capitola-social-shares',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'stats' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/stats',
		'title' => 'Stats',
		'textdomain' => 'capitola',
		'description' => 'Display key numbers and metrics in a styled statistics section.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'stats',
			'metrics',
			'numbers',
			'highlights'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'textAlignment' => array(
				'type' => 'string',
				'default' => 'center'
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				),
				array(
					'name' => 'capitola/stats-grid',
					'innerBlocks' => array(
						array(
							'name' => 'capitola/stats-item',
							'attributes' => array(
								'stat' => '90',
								'caption' => 'Vivamus elit leo'
							)
						),
						array(
							'name' => 'capitola/stats-item',
							'attributes' => array(
								'stat' => '100%',
								'caption' => 'Aenean eiusmod porttitor'
							)
						),
						array(
							'name' => 'capitola/stats-item',
							'attributes' => array(
								'stat' => '33k',
								'caption' => 'Dolor consectetur cillum'
							)
						),
						array(
							'name' => 'capitola/stats-item',
							'attributes' => array(
								'stat' => '25%',
								'caption' => 'Proident culpa pariatur'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'style' => 'capitola-stats',
		'editorScript' => 'file:./index.js'
	),
	'stats-grid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/stats-grid',
		'title' => 'Stats Grid',
		'textdomain' => 'capitola',
		'description' => 'Arrange multiple stat items in a responsive grid layout.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'stats',
			'grid',
			'metrics',
			'numbers'
		),
		'supports' => array(
			'lock' => false,
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/stats'
		),
		'attributes' => array(
			
		),
		'usesContext' => array(
			'revealAnimation',
			'introAlign'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'stats-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/stats-item',
		'title' => 'Stats Item',
		'textdomain' => 'capitola',
		'description' => 'Add a single stat value with supporting caption text.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'stat',
			'metric',
			'number',
			'caption'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/stats-grid'
		),
		'attributes' => array(
			'stat' => array(
				'type' => 'string',
				'default' => ''
			),
			'caption' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'sticky-images' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/sticky-images',
		'title' => 'Sticky Images',
		'textdomain' => 'capitola',
		'description' => 'Display stacked content sections with images that stay sticky during scroll.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'image',
			'sticky',
			'scroll',
			'side image'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'mediaWidth' => array(
				'type' => 'integer',
				'default' => 50
			),
			'transitionMode' => array(
				'type' => 'string',
				'default' => 'scroll'
			),
			'imageLayout' => array(
				'type' => 'string',
				'default' => 'inner'
			),
			'showFullImage' => array(
				'type' => 'boolean',
				'default' => false
			),
			'imageFocalPoint' => array(
				'type' => 'string',
				'default' => 'center center'
			),
			'imageRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'verticalAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'right'
			),
			'isExample' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'providesContext' => array(
			'showFullImage' => 'showFullImage'
		),
		'example' => array(
			'attributes' => array(
				'isExample' => true
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/sticky-images-section',
					'attributes' => array(
						'sideImage' => array(
							'source_url' => 'https://pd.w.org/2023/05/8616454d45ef02002.62343426-1536x1152.jpeg'
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'capitola/body-text',
							'attributes' => array(
								'eyebrow' => 'Cupidatat pariatur',
								'headline' => 'Nulla Minim Est Do',
								'cta' => array(
									'title' => 'Consequat',
									'link' => array(
										'url' => '/'
									)
								),
								'cta2' => array(
									'title' => 'Velit amet',
									'link' => array(
										'url' => '/'
									)
								)
							),
							'innerBlocks' => array(
								array(
									'name' => 'core/paragraph',
									'attributes' => array(
										'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
									)
								)
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-sticky-images',
		'viewScript' => 'file:./view.js',
		'editorStyle' => 'capitola-sticky-images-editor'
	),
	'sticky-images-section' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/sticky-images-section',
		'title' => 'Sticky Images Section',
		'textdomain' => 'capitola',
		'description' => 'Add one content section with an associated sticky image inside Sticky Images.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'image',
			'sticky',
			'section',
			'side image'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/sticky-images'
		),
		'attributes' => array(
			'sideImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'showCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'captionOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true,
					'disableTextAlign' => true,
					'disableVerticalAlign' => true
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			)
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'introAlign' => 'introAlign'
		),
		'usesContext' => array(
			'showFullImage'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'tabbed-contents' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/tabbed-contents',
		'title' => 'Tabbed Contents',
		'textdomain' => 'capitola',
		'description' => 'Organize content into interactive tabs with switchable panels.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'tabs',
			'tabbed content',
			'accordion alternative',
			'panels'
		),
		'supports' => array(
			'anchor' => true,
			'interactivity' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => ''
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableVerticalAlign' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'verticalAlign' => 'top',
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				),
				array(
					'name' => 'capitola/tabbed-contents-tabs',
					'innerBlocks' => array(
						array(
							'name' => 'capitola/tabbed-contents-panel',
							'attributes' => array(
								'pillLabel' => 'Culpa'
							),
							'innerBlocks' => array(
								array(
									'name' => 'core/paragraph',
									'attributes' => array(
										'content' => 'Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Ut id nisl quis enim dignissim sagittis. Quisque ut nisi. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Integer tincidunt.'
									)
								),
								array(
									'name' => 'core/paragraph',
									'attributes' => array(
										'content' => 'Exercitation qui Lorem sint id veniam nisi id aute occaecat ad pariatur enim laboris non. Esse proident reprehenderit ex proident esse laborum aliqua. Fugiat fugiat nostrud qui ex amet incididunt aute nulla consectetur qui nostrud in pariatur ullamco. Deserunt aliqua id pariatur nisi tempor anim. Ut ut voluptate eu veniam eu laborum enim occaecat..'
									)
								)
							)
						),
						array(
							'name' => 'capitola/tabbed-contents-panel',
							'attributes' => array(
								'pillLabel' => 'Tempor'
							)
						),
						array(
							'name' => 'capitola/tabbed-contents-panel',
							'attributes' => array(
								'pillLabel' => 'Ea irure'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'viewScriptModule' => 'file:./view.js',
		'style' => 'capitola-tabbed-contents',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'tabbed-contents-panel' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/tabbed-contents-panel',
		'title' => 'Tabbed Contents Panel',
		'textdomain' => 'capitola',
		'description' => 'Add one content panel associated with a tab label.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'tab panel',
			'tabs',
			'panel',
			'tabbed content'
		),
		'supports' => array(
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'pillLabel' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'parent' => array(
			'capitola/tabbed-contents-tabs'
		),
		'usesContext' => array(
			'capitola/activePanel'
		),
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'tabbed-contents-tabs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/tabbed-contents-tabs',
		'title' => 'Tabbed Contents Tabs',
		'textdomain' => 'capitola',
		'description' => 'Wrap and control the set of tabs and panels inside Tabbed Contents.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'tabs',
			'tabbed content',
			'tab group',
			'panels'
		),
		'supports' => array(
			'inserter' => false,
			'lock' => false,
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			
		),
		'providesContext' => array(
			'capitola/activePanel' => 'activePanel'
		),
		'usesContext' => array(
			'revealAnimation',
			'introAlign'
		),
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'term-feed' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/term-feed',
		'title' => 'Term Feed',
		'textdomain' => 'capitola',
		'description' => 'Display taxonomy terms in list, grid, or slider layouts.',
		'category' => 'listing-blocks',
		'keywords' => array(
			'terms',
			'taxonomy',
			'categories',
			'listing'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'listLayout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'showSlideCount' => array(
				'type' => 'boolean',
				'default' => true
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'name'
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'ctaText' => array(
				'type' => 'string',
				'default' => 'Read More'
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'excerptLines' => array(
				'type' => 'integer',
				'default' => 4
			),
			'titleLocation' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'category'
			),
			'limit' => array(
				'type' => 'integer',
				'default' => 12
			),
			'availableTaxonomies' => array(
				'type' => 'array',
				'default' => array(
					array(
						'label' => 'Post Categories',
						'value' => 'category'
					)
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => false,
					'disableVerticalAlign' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'listLayout' => 'column-3',
				'limit' => 6
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-post-listing',
		'viewScript' => array(
			'capitola-listing-sidescroll',
			'capitola-animations'
		)
	),
	'three-image-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/three-image-block',
		'title' => 'Three Image Block',
		'textdomain' => 'capitola',
		'description' => 'Display three overlapping images paired with side content in a layered layout.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'images',
			'collage',
			'layered',
			'three image'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'mediaWidth' => array(
				'type' => 'integer',
				'default' => 50
			),
			'gridAspectRatio' => array(
				'type' => 'string',
				'default' => '1'
			),
			'rearImagePosition' => array(
				'type' => 'string',
				'default' => 'top-left'
			),
			'rearImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'middleImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'frontImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'rearImageHeight' => array(
				'type' => 'integer',
				'default' => 7
			),
			'middleImageTopPos' => array(
				'type' => 'integer',
				'default' => 9
			),
			'middleImageLeftPos' => array(
				'type' => 'integer',
				'default' => 6
			),
			'middleImageHeight' => array(
				'type' => 'integer',
				'default' => 4
			),
			'frontImageHeight' => array(
				'type' => 'integer',
				'default' => 7
			),
			'rearImageWidth' => array(
				'type' => 'integer',
				'default' => 9
			),
			'middleImageWidth' => array(
				'type' => 'integer',
				'default' => 7
			),
			'frontImageWidth' => array(
				'type' => 'integer',
				'default' => 11
			),
			'rearImageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'middleImageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'frontImageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'rearImageRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'middleImageRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'frontImageRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'verticalAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true,
					'disableVerticalAlign' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'frontImage' => array(
					'source_url' => 'https://pd.w.org/2025/07/175687190064e5331.25489020-768x512.jpg'
				),
				'middleImage' => array(
					'source_url' => 'https://pd.w.org/2026/02/9356995a97b6c19b6.99159534-768x576.jpg'
				),
				'rearImage' => array(
					'source_url' => 'https://pd.w.org/2025/07/78368718f0804ea01.26512460-768x512.jpg'
				)
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-three-image-block'
	),
	'three-link-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/three-link-card',
		'title' => 'Three Link Card',
		'textdomain' => 'capitola',
		'description' => 'Add one linked card item with image and title inside a three-card layout.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'card',
			'link',
			'image card',
			'featured link'
		),
		'supports' => array(
			'lock' => false,
			'inserter' => false,
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/three-link-cards-grid'
		),
		'attributes' => array(
			'postType' => array(
				'type' => 'string',
				'default' => 'page'
			),
			'postId' => array(
				'type' => 'integer',
				'default' => 0
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageRadius' => array(
				'type' => 'string',
				'default' => 'small'
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	),
	'three-link-cards' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/three-link-cards',
		'title' => 'Three Link Cards',
		'textdomain' => 'capitola',
		'description' => 'Combine intro content with a three-card layout of linked items.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'cards',
			'links',
			'three cards',
			'featured links'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'introAlign' => array(
				'type' => 'string',
				'default' => 'top'
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				),
				array(
					'name' => 'capitola/three-link-cards-grid',
					'innerBlocks' => array(
						array(
							'name' => 'capitola/three-link-card',
							'attributes' => array(
								'image' => array(
									'source_url' => 'https://pd.w.org/2025/07/803686b569cddf8b4.43003281-768x574.jpg'
								),
								'title' => 'Voluptate mollit consequat irure est'
							)
						),
						array(
							'name' => 'capitola/three-link-card',
							'attributes' => array(
								'imageRadius' => 'large',
								'image' => array(
									'source_url' => 'https://pd.w.org/2025/07/796686b564fb78425.26295683-768x576.jpg'
								),
								'title' => 'Veniam reprehenderit labore'
							)
						),
						array(
							'name' => 'capitola/three-link-card',
							'attributes' => array(
								'image' => array(
									'source_url' => 'https://pd.w.org/2025/06/588683efb00c410a3.55665591-768x432.jpg'
								),
								'title' => 'Dolor reprehenderit qui excepteur ut'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'style' => 'capitola-three-link-cards-with-intro',
		'editorScript' => 'file:./index.js'
	),
	'three-link-cards-grid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/three-link-cards-grid',
		'title' => 'Three Link Cards Grid',
		'textdomain' => 'capitola',
		'description' => 'Arrange three link cards in a grid with optional stagger and parallax effects.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'cards grid',
			'three cards',
			'links',
			'parallax'
		),
		'supports' => array(
			'lock' => false,
			'inserter' => false,
			'html' => false,
			'customCSS' => false
		),
		'parent' => array(
			'capitola/three-link-cards'
		),
		'attributes' => array(
			'staggered' => array(
				'type' => 'boolean',
				'default' => true
			),
			'parallax' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'viewScript' => 'file:./view.js'
	),
	'two-image-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/two-image-block',
		'title' => 'Two Image Block',
		'textdomain' => 'capitola',
		'description' => 'Display two overlapping images paired with side content in a layered layout.',
		'category' => 'custom-blocks',
		'keywords' => array(
			'images',
			'layered',
			'collage',
			'two image'
		),
		'supports' => array(
			'anchor' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'top',
					'bottom'
				)
			),
			'html' => false,
			'customCSS' => false
		),
		'attributes' => array(
			'introAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'mediaWidth' => array(
				'type' => 'integer',
				'default' => 50
			),
			'gridAspectRatio' => array(
				'type' => 'string',
				'default' => '1'
			),
			'rearImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'rearImagePosition' => array(
				'type' => 'string',
				'default' => 'top-left'
			),
			'rearImageHeight' => array(
				'type' => 'integer',
				'default' => 13
			),
			'rearImageWidth' => array(
				'type' => 'integer',
				'default' => 16
			),
			'rearImageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'rearImageRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'rearImageShowCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'rearImageCaption' => array(
				'type' => 'string',
				'default' => ''
			),
			'frontImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'source_url' => ''
				)
			),
			'frontImageHeight' => array(
				'type' => 'integer',
				'default' => 10
			),
			'frontImageWidth' => array(
				'type' => 'integer',
				'default' => 11
			),
			'frontImageFocalPoint' => array(
				'type' => 'string',
				'default' => '50% 50%'
			),
			'frontImageRadius' => array(
				'type' => 'string',
				'default' => 'small'
			),
			'frontImageShowCaption' => array(
				'type' => 'boolean',
				'default' => false
			),
			'frontImageCaption' => array(
				'type' => 'string',
				'default' => ''
			),
			'verticalAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'revealAnimation' => array(
				'type' => 'object',
				'default' => array(
					'animation' => '',
					'section' => 'block'
				)
			),
			'bodyTextOptions' => array(
				'type' => 'object',
				'default' => array(
					'disableBackgroundImage' => true,
					'disableVerticalAlign' => true
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'frontImage' => array(
					'source_url' => 'https://pd.w.org/2025/07/175687190064e5331.25489020-768x512.jpg'
				),
				'rearImage' => array(
					'source_url' => 'https://pd.w.org/2025/07/78368718f0804ea01.26512460-768x512.jpg'
				)
			),
			'innerBlocks' => array(
				array(
					'name' => 'capitola/body-text',
					'attributes' => array(
						'eyebrow' => 'Cupidatat pariatur',
						'headline' => 'Nulla Minim Est Do',
						'cta' => array(
							'title' => 'Consequat',
							'link' => array(
								'url' => '/'
							)
						),
						'cta2' => array(
							'title' => 'Velit amet',
							'link' => array(
								'url' => '/'
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'content' => 'Veniam do ex ex est elit culpa consequat excepteur occaecat quis. Nostrud magna ullamco exercitation nisi aliqua labore magna eiusmod mollit dolor aute non consequat.'
							)
						)
					)
				)
			),
			'viewportWidth' => 1440
		),
		'providesContext' => array(
			'bodyTextOptions' => 'bodyTextOptions',
			'revealAnimation' => 'revealAnimation',
			'introAlign' => 'introAlign'
		),
		'viewScript' => 'capitola-animations',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js',
		'style' => 'capitola-two-image-block'
	)
);
