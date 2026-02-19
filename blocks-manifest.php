<?php
// This file is generated. Do not modify it manually.
return array(
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
				'margin' => array(
					'top'
				)
			)
		),
		'attributes' => array(
			'prevPage' => array(
				'type' => 'object',
				'default' => false
			),
			'nextPage' => array(
				'type' => 'object',
				'default' => false
			)
		),
		'example' => array(
			
		),
		'style' => 'capitola-page-nav',
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	)
);
