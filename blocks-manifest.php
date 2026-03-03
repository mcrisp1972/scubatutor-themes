<?php
// This file is generated. Do not modify it manually.
return array(
	'footer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/footer',
		'title' => 'Site Footer',
		'description' => 'All fields test block',
		'category' => 'nav-blocks',
		'keywords' => array(
			'site',
			'footer',
			'navigation'
		),
		'supports' => array(
			'multiple' => false
		),
		'attributes' => array(
			'showBusinessName' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showSocials' => array(
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
	'page-nav' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'capitola/page-nav',
		'title' => 'Page Navigation',
		'description' => '',
		'category' => 'nav',
		'keywords' => array(
			
		),
		'supports' => array(
			'spacing' => array(
				'padding' => array(
					'top',
					'bottom'
				),
				'margin' => array(
					'top',
					'bottom'
				)
			)
		),
		'attributes' => array(
			'colorTheme' => array(
				'type' => 'string',
				'default' => false
			),
			'prevPage' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'nextPage' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		),
		'style' => 'capitola-page-nav',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	)
);
