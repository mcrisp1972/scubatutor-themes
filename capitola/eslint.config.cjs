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
			// WordPress packages are treated as externals by WP build tooling.
			// Ignore unresolved checks here so we don't have to mirror that list in ESLint.
			'import/no-unresolved': [ 'error', { ignore: [ '^@wordpress/' ] } ],
			// Theme scripts import WordPress packages provided by the editor runtime,
			// so these should not need to exist as direct package.json dependencies.
			'import/no-extraneous-dependencies': 'off',
			'space-in-parens': [ 'error', 'always' ],
			'arrow-body-style': [ 'error', 'always' ],
		},
	},
];
