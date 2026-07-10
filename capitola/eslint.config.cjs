/* eslint-disable import/no-extraneous-dependencies */
const globals = require( 'globals' );
const pluginWordPress = require( '@wordpress/eslint-plugin' );

module.exports = [
	{
		ignores: [ '**/vendor/*.js', 'build/**', 'node_modules/**' ],
	},
	...pluginWordPress.configs.recommended,
	{
		files: [ '**/*.{js,jsx,mjs,cjs}' ],
		settings: {
			'import/core-modules': [
				'@capitola/editor-controls',
				'@capitola/scripts/modules/cookies',
				'@capitola/scripts/modules/filtered-listings',
				'@capitola/scripts/modules/listing-layouts',
				'@capitola/blocks/post-feed/post-tile',
				'@capitola/blocks/post-feed/post-feed-template',
				'@capitola/blocks/post-feed/layout-conditionals',
				'@capitola/blocks/post-feed/listing-layouts',
				'@capitola/scripts/modules/template-post-type',
				'@capitola/scripts/modules/term-tree',
				'@capitola/blocks/stats-grid/preview',
				'@capitola/scripts',
				'@capitola/editor-icons',
				'@wordpress/api-fetch',
				'@wordpress/autop',
				'@wordpress/block-editor',
				'@wordpress/blocks',
				'@wordpress/components',
				'@wordpress/compose',
				'@wordpress/core-data',
				'@wordpress/data',
				'@wordpress/date',
				'@wordpress/editor',
				'@wordpress/element',
				'@wordpress/hooks',
				'@wordpress/html-entities',
				'@wordpress/i18n',
				'@wordpress/icons',
				'@wordpress/interactivity',
				'@wordpress/keycodes',
				'@wordpress/plugins',
				'@wordpress/server-side-render',
				'@wordpress/url',
			],
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.jest,
				lodash: 'readonly',
				listingArgs: 'readonly',
				wpApiSettings: 'readonly',
			},
		},
		rules: {
			'space-in-parens': [ 'error', 'always' ],
			'arrow-body-style': [ 'error', 'always' ],
		},
	},
];
