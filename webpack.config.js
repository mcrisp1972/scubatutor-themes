/*
Welcome to @wordpress/scripts !

Parcel served us well, but as we move into the new era of block themes, we need a build that better handles block development.

Introducing @wordpress/scripts. This is a build that is intended for building block assets, using block.json files as entry points, and building corresponding block scripts. Added bonus, React is included.

But here's the catch. @wordpress/scripts was developed as a block builder, and not for building theme styles and scripts. It's also based on webpack, which is a bundler instead of a runner like Gulp.

This config extends the default config to give us the best of both worlds. It installs all required wordpress gutenberg dependencies, builds self-contained blocks, and also adds our styles as custom entry points without having to import them from js, just like Parcel and Gulp before.

This script may look complex, but most of the code is copied directly from the default config, with minimal modification. Each of these is commented with the source, any original elements that are removed are commented out instead of deleted, and new elements are preceeded with comments. This will aid in future maintenance so we can stay up-to-date.

Specifically, what this overide adds is:

- custom entry points to build global styles and scripts
- changes svg handling in styles. @wordpress/scripts embeds small svg code into the stylesheets instead of outputting the svg path. This can lead to large css files if moderate sized svgs are referenced multiple times (I had a css file built as 5mb!)
- modification of css url paths. Default config uses relative paths, which don't play well with nested roots in our sass. This config overides the path to be absolute, using the "themeURL" variable mentioned below.

GOTCHAS for migration

1: The tilde alias we use for css url paths must be followed with a forward slash. You can point to ~/src, ~/assets, or any other directory in the theme root.

2: The new output directory is "build". The output directory can be changed in package.json flags, but why fight it.  Just update the paths for your script and style enqueues.

3: Make sure your styles directory in src is names "styles", not "css", etc. Otherwise, update the style entry point in this file.

4: The scripts entry points are shallow. A new entry point must be added for every root where targetted scripts are located. This config targets the scripts root plus the "blocks" folder, which are basically standalone scripts loaded by blocks.

5: In this file, update the themeURL constant to point to your theme path.

 */

const { hasBabelConfig } = require('@wordpress/scripts/utils/config');
const { hasArgInCLI } = require('@wordpress/scripts/utils/cli');
const { hasPostCSSConfig, getAsBooleanFromENV } = require('@wordpress/scripts/utils');
const { hasCssnanoConfig } = require('@wordpress/scripts/utils');
const postcssPlugins = require('@wordpress/postcss-plugins-preset');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const hasReactFastRefresh = hasArgInCLI('--hot') && !isProduction;
const hasExperimentalModulesFlag = getAsBooleanFromENV('WP_EXPERIMENTAL_MODULES');

const glob = require('glob');
const path = require('path');

// update this to the theme path, used for css url paths
const themeURL = '/wp-content/themes/crisp-base-theme/build/';

/*
from https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/webpack.config.js
removed elements commented out, new additions commented
comments from original const are removed for clarity
*/
const cssLoaders = [
	{
		loader: MiniCSSExtractPlugin.loader,
		// adding the relative path for css url paths
		options: {
			publicPath: themeURL,
		},
		// end addition
	},
	{
		loader: require.resolve('css-loader'),
		options: {
			sourceMap: !isProduction,
			modules: {
				auto: true,
			},
		},
	},
	{
		loader: require.resolve('postcss-loader'),
		options: {
			...(!hasPostCSSConfig() && {
				postcssOptions: {
					ident: 'postcss',
					sourceMap: !isProduction,
					plugins: isProduction
						? [
								...postcssPlugins,
								require('cssnano')({
									...(!hasCssnanoConfig() && {
										preset: [
											'default',
											{
												discardComments: {
													removeAll: true,
												},
											},
										],
									}),
								}),
						  ]
						: postcssPlugins,
				},
			}),
		},
	},
];

/*
from https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/webpack.config.js
source is config.modules.rules
removed elements commented out, new additions commented
comments from original const are removed for clarity
*/

const overideRules = [
	{
		test: /\.(j|t)sx?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: require.resolve('babel-loader'),
				options: {
					cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,
					...(!hasBabelConfig() && {
						babelrc: false,
						configFile: false,
						presets: [require.resolve('@wordpress/babel-preset-default')],
						plugins: [hasReactFastRefresh && require.resolve('react-refresh/babel')].filter(Boolean),
					}),
				},
			},
		],
	},
	{
		test: /\.css$/,
		use: cssLoaders,
	},
	{
		test: /\.pcss$/,
		use: cssLoaders,
	},
	{
		test: /\.(sc|sa)ss$/,
		use: [
			...cssLoaders,
			{
				loader: require.resolve('sass-loader'),
				options: {
					sourceMap: !isProduction,
					api: 'modern',
				},
			},
		],
	},
	{
		test: /\.svg$/,
		issuer: /\.(j|t)sx?$/,
		use: ['@svgr/webpack', 'url-loader'],
		type: 'javascript/auto',
	},
	{
		test: /\.(svg)$/i,
		// issuer: /\.(pc|sc|sa|c)ss$/,
		// type: 'asset/inline',

		// we want svg url to output as path, not an embedded svg
		type: 'asset/resource',

		// output the optimized svg to our build directory
		generator: {
			filename: 'svgs/[name].[hash:8][ext]',
		},
	},
	{
		test: /\.(bmp|png|jpe?g|gif|webp)$/i,
		type: 'asset/resource',
		issuer: /\.(pc|sc|sa|c)ss$/,
		generator: {
			filename: 'images/[name].[hash:8][ext]',
		},
	},
	{
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'fonts/[name].[hash:8][ext]',
		},
	},
];

// Now we build our entry points

// get our js entry points

// base scripts located in scripts root
const base = glob.sync('./src/scripts/**.{js,jsx}').reduce(function (obj, el) {
	obj[path.parse(el).dir.replace(/^(\.\/src)/, '') + '/' + path.parse(el).name] = el;
	return obj;
}, {});

// block scripts
const acfblocks = glob.sync('./src/scripts/blocks/**.js').reduce(function (obj, el) {
	obj[path.parse(el).dir.replace(/^(\.\/src)/, '') + '/' + path.parse(el).name] = el;
	return obj;
}, {});

const woo = glob.sync('./src/scripts/woo/**.js').reduce(function (obj, el) {
	obj[path.parse(el).dir.replace(/^(\.\/src)/, '') + '/' + path.parse(el).name] = el;
	return obj;
}, {});

// styles
const sass = glob.sync('./src/styles/**/*.scss').reduce(function (obj, el) {
	if (!path.parse(el).name.startsWith('_')) {
		obj[path.parse(el).dir.replace(/^(\.\/src)/, '') + '/' + path.parse(el).name] = el;
		return obj;
	} else return obj;
}, {});

// Helper function to apply our customizations to a config
const customizeConfig = (config) => ({
	...config,
	//cache: false,
	entry: {
		...(typeof config.entry === 'function' ? config.entry() : config.entry),
		// add our new entry points
		...base,
		...acfblocks,
		...woo,
		...sass,
	},
	module: {
		// inject our override rules
		rules: overideRules,
	},
});

// Export configuration based on experimental modules flag
if (hasExperimentalModulesFlag) {
	// When experimental modules are enabled, defaultConfig is an array [scriptConfig, moduleConfig]
	// Apply customizations to the scriptConfig only (first item)
	module.exports = [
		customizeConfig(defaultConfig[0]),
		defaultConfig[1], // Keep moduleConfig as-is
	];
} else {
	// When experimental modules are disabled, defaultConfig is a single object
	module.exports = customizeConfig(defaultConfig);
}
