/*
 * Webpack configuration for Capitola theme.
 *
 * This configuration extends the default provided by @wordpress/scripts, adding support for:
 * - Multiple entry points based on the file structure in src/scripts and src/styles.
 * - Custom handling of SVG files to output them as separate resources.
 * - Overriding the publicPath for CSS assets to ensure correct URL paths in the built CSS.
 *
 * To use this configuration, ensure you have @wordpress/scripts installed and run your build commands as usual.

 */

const { getAsBooleanFromENV } = require( '@wordpress/scripts/utils' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const hasExperimentalModulesFlag = getAsBooleanFromENV( 'WP_EXPERIMENTAL_MODULES' );

/* eslint-disable-next-line import/no-extraneous-dependencies */
const glob = require( 'glob' );
const path = require( 'path' );

// update this to the theme path, used for css url paths
const themeURL = '/wp-content/themes/capitola/build/';

const capitolaAliases = {
	'@capitola': path.resolve( __dirname, 'src' ),
};

// Helper to update rules
function updateSvgRules( rules ) {
	return rules.map( ( rule ) => {
		// Find the SVG rule for stylesheets (asset/inline or similar)
		if ( rule.test && rule.test.toString().includes( 'svg' ) && rule.type === 'asset/inline' ) {
			// Clone and override to asset/resource
			return {
				...rule,
				type: 'asset/resource',
				generator: {
					filename: 'svgs/[name].[hash:8][ext]',
				},
			};
		}
		return rule;
	} );
}

function overrideCssPublicPath( rules ) {
	return rules.map( ( rule ) => {
		if ( Array.isArray( rule.use ) ) {
			return {
				...rule,
				use: rule.use.map( ( loader ) => {
					if (
						typeof loader === 'object' &&
						loader.loader &&
						loader.loader.includes( 'mini-css-extract-plugin' )
					) {
						return {
							...loader,
							options: {
								...loader.options,
								publicPath: themeURL,
							},
						};
					}
					return loader;
				} ),
			};
		}
		return rule;
	} );
}

const js = glob.sync( './src/scripts/**.{js,jsx}' ).reduce( function ( obj, el ) {
	obj[ path.parse( el ).dir.replace( /^(\.\/src)/, '' ) + '/' + path.parse( el ).name ] = el;
	return obj;
}, {} );

// styles
const sass = glob.sync( './src/styles/**/*.scss' ).reduce( function ( obj, el ) {
	if ( ! path.parse( el ).name.startsWith( '_' ) ) {
		obj[ path.parse( el ).dir.replace( /^(\.\/src)/, '' ) + '/' + path.parse( el ).name ] = el;
		return obj;
	}
	return obj;
}, {} );

// Helper function to apply our customizations to a config
const customizeConfig = ( config ) => {
	// First update SVG rules, then override CSS publicPath
	let rules = updateSvgRules( [ ...config.module.rules ] );
	rules = overrideCssPublicPath( rules );
	return {
		...config,
		entry: {
			...( typeof config.entry === 'function' ? config.entry() : config.entry ),
			...js,
			...sass,
		},
		resolve: {
			...( config.resolve || {} ),
			alias: {
				...( config.resolve?.alias || {} ),
				...capitolaAliases,
			},
		},
		module: {
			...config.module,
			rules,
		},
	};
};

const addThemeAliases = ( config ) => {
	return {
		...config,
		resolve: {
			...( config.resolve || {} ),
			alias: {
				...( config.resolve?.alias || {} ),
				...capitolaAliases,
			},
		},
	};
};

// Export configuration based on experimental modules flag
if ( hasExperimentalModulesFlag ) {
	// When experimental modules are enabled, defaultConfig is an array [scriptConfig, moduleConfig]
	// Apply customizations to the scriptConfig and alias resolution to moduleConfig
	module.exports = [
		customizeConfig( defaultConfig[ 0 ] ),
		addThemeAliases( defaultConfig[ 1 ] ),
	];
} else {
	// When experimental modules are disabled, defaultConfig is a single object
	module.exports = customizeConfig( defaultConfig );
}
