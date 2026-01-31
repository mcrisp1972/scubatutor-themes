<?php

namespace cwps\ThemeOptions;

const GROUP_CONTACT = 'cwps-contact-info';
const GROUP_BANNERS = 'cwps-banners';
const GROUP_SOCIALS = 'cwps-socials';
const GROUP_GOOGLE = 'cwps-ga';
const GROUP_API_KEYS = 'cwps-api-keys';
const GROUP_COLOR_THEME = 'cwps-color-theme';

add_action( 'init', __NAMESPACE__ . '\add_options_page', 99 );

function add_options_page() {

	$json_string = file_get_contents( get_stylesheet_directory() . '/color-themes.json' );
	$colors = json_decode( $json_string, true );
	$color_options = array();
	foreach ( $colors as $color ) {
		$color_options[ $color['slug'] ] = $color['name'];
	}

	$form_settings = array(
		'parent_slug' => 'options-general.php',
		'page_title' => 'Theme Options',
		'menu_title' => 'Theme Options',
		'menu_slug' => 'cwps-theme-options',
		'position' => 50,
		'tabs' => array(
			'business-info' => array(
				'tab_label' => 'Business Info',
				'fields_slug' => GROUP_CONTACT,
				'fields' => array(
					array(
						'title' => 'Contact Info',
						'type' => 'title',
						'desc' => 'These fields are used for display of your business contact information in the site footer and other contact info areas.',
					),
					array(
						'label' => 'Business Name',
						'name' => 'cwps_contact[business_name]',
						'option' => array( 'cwps_contact', 'business_name' ),
						'size' => 'large',
						'type' => 'text',
					),
					array(
						'label' => 'Address',
						'name' => 'cwps_contact[address]',
						'option' => array( 'cwps_contact', 'address' ),
						'size' => 'large',
						'type' => 'textarea',
						'rows' => 4,
					),
					array(
						'label' => 'Google Map Link',
						'name' => 'cwps_contact[gmap_link]',
						'option' => array( 'cwps_contact', 'gmap_link' ),
						'size' => 'full',
						'type' => 'text',
					),
					array(
						'label' => 'Phone',
						'name' => 'cwps_contact[phone]',
						'option' => array( 'cwps_contact', 'phone' ),
						'type' => 'text',
					),
					array(
						'label' => 'Email',
						'name' => 'cwps_contact[email]',
						'option' => array( 'cwps_contact', 'email' ),
						'type' => 'text',
					),
					array(
						'type' => 'sectionend',
					),
					array(
						'label' => 'Hours',
						'type' => 'title',
						'desc' => 'These fields populate store hours sections in the site. You can use any format. Days with empty values will display "Closed.',
					),
					array(
						'label' => 'Monday',
						'name' => 'cwps_hours[Monday]',
						'option' => array( 'cwps_hours', 'Monday' ),
						'type' => 'text',
					),
					array(
						'label' => 'Tuesday',
						'name' => 'cwps_hours[Tuesday]',
						'option' => array( 'cwps_hours', 'Tuesday' ),
						'type' => 'text',
					),
					array(
						'label' => 'Wednesday',
						'name' => 'cwps_hours[Wednesday]',
						'option' => array( 'cwps_hours', 'Wednesday' ),
						'type' => 'text',
					),
					array(
						'label' => 'Thursday',
						'name' => 'cwps_hours[Thursday]',
						'option' => array( 'cwps_hours', 'Thursday' ),
						'type' => 'text',
					),
					array(
						'label' => 'Friday',
						'name' => 'cwps_hours[Friday]',
						'option' => array( 'cwps_hours', 'Friday' ),
						'type' => 'text',
					),
					array(
						'label' => 'Saturday',
						'name' => 'cwps_hours[Saturday]',
						'option' => array( 'cwps_hours', 'Saturday' ),
						'type' => 'text',
					),
					array(
						'label' => 'Sunday',
						'name' => 'cwps_hours[Sunday]',
						'option' => array( 'cwps_hours', 'Sunday' ),
						'type' => 'text',
					),
					array(
						'type' => 'sectionend',
					),
				),
			),
			'banners' => array(
				'tab_label' => 'Banners',
				'fields_slug' => GROUP_BANNERS,
				'fields' => array(
					array(
						'title' => 'Notice Banner',
						'type' => 'title',
						'desc' => 'The notice banner displays at the top of the page, and is used to display important updates or alerts to site visitors. Once an alert is closed by a visitor, they will not see it again for the duration of their visit on the site.',
					),
					array(
						'label' => 'Show Notice Banner',
						'name' => 'cwps_notice_banner[display]',
						'option' => array( 'cwps_notice_banner', 'display' ),
						'type' => 'checkbox',
					),
					array(
						'label' => 'Notice Banner',
						'name' => 'cwps_notice_banner[message]',
						'option' => array( 'cwps_notice_banner', 'message' ),
						'type' => 'wysiwyg',
						'mce_id' => 'banner-message-mce',
						'rows' => 4,
					),
					array(
						'label' => 'Banner Color',
						'help' => 'Signifies important or urgency of the notice. Update is good for store updates like upcoming sales, new store hours, etc.. Alert is a severe notice, like temporary changes in business hours or online sales availability.',
						'name' => 'cwps_notice_banner[type]',
						'option' => array( 'cwps_notice_banner', 'type' ),
						'type' => 'radio',
						'options' => array(
							'update' => 'Update',
							'alert' => 'Alert',
						),
					),
					array(
						'type' => 'sectionend',
					),
				),
			),
			'socials' => array(
				'tab_label' => 'Socials',
				'fields_slug' => GROUP_SOCIALS,
				'fields' => array(
					array(
						'title' => 'Allowed Social Shares',
						'type' => 'title',
						'desc' => 'Select the social networks you would like visitors to be able to share your blogs and other content on.',
					),
					array(
						'label' => 'Facebook',
						'name' => 'cwps_social_shares[facebook]',
						'option' => array( 'cwps_social_shares', 'facebook' ),
						'type' => 'checkbox',
					),
					array(
						'label' => 'Twitter/X',
						'name' => 'cwps_social_shares[twitter]',
						'option' => array( 'cwps_social_shares', 'twitter' ),
						'type' => 'checkbox',
					),
					array(
						'label' => 'Pinterest',
						'name' => 'cwps_social_shares[pinterest]',
						'option' => array( 'cwps_social_shares', 'pinterest' ),
						'type' => 'checkbox',
					),
					array(
						'label' => 'LinkedIn',
						'name' => 'cwps_social_shares[linkedin]',
						'option' => array( 'cwps_social_shares', 'linkedin' ),
						'type' => 'checkbox',
					),
					array(
						'type' => 'sectionend',
					),
					array(
						'title' => 'Social Links',
						'type' => 'title',
						'desc' => 'These are used in the footer and other sectiopns for links to your social network pages.',
					),
					array(
						'label' => 'Facebook',
						'name' => 'cwps_social_links[facebook]',
						'option' => array( 'cwps_social_links', 'facebook' ),
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'label' => 'Twitter/X',
						'name' => 'cwps_social_links[twitter]',
						'option' => array( 'cwps_social_links', 'twitter' ),
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'label' => 'Instagram',
						'name' => 'cwps_social_links[instagram]',
						'option' => array( 'cwps_social_links', 'instagram' ),
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'label' => 'Youtube',
						'name' => 'cwps_social_links[youtube]',
						'option' => array( 'cwps_social_links', 'youtube' ),
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'label' => 'Tiktok',
						'name' => 'cwps_social_links[tiktok]',
						'option' => array( 'cwps_social_links', 'tiktok' ),
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'label' => 'Pinterest',
						'name' => 'cwps_social_links[pinterest]',
						'option' => array( 'cwps_social_links', 'pinterest' ),
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'label' => 'Linkedin',
						'name' => 'cwps_social_links[linkedin]',
						'option' => array( 'cwps_social_links', 'linkedin' ),
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'type' => 'sectionend',
					),
				),
			),
			'api-keys' => array(
				'tab_label' => 'API Keys',
				'fields_slug' => GROUP_API_KEYS,
				'fields' => array(
					array(
						'title' => 'API Keys',
						'type' => 'title',
						'desc' => 'This key is used to display Google Maps on the site.',
					),
					array(
						'label' => 'Paid Google Maps API Key',
						'name' => 'cwps_paid_google_maps_api',
						'option' => 'cwps_paid_google_maps_api',
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'label' => 'Free Google Maps API Key',
						'name' => 'cwps_free_google_maps_api',
						'option' => 'cwps_free_google_maps_api',
						'type' => 'text',
						'size' => 'full',
					),
					array(
						'type' => 'sectionend',
					),
				),
			),
			'google' => array(
				'tab_label' => 'Google Analytics',
				'fields_slug' => GROUP_GOOGLE,
				'fields' => array(
					array(
						'title' => 'Google Analytics Scripts',
						'type' => 'title',
					),
					array(
						'label' => 'Head Script',
						'name' => 'cwps_google[head]',
						'option' => array( 'cwps_google', 'head' ),
						'type' => 'textarea',
						'rows' => 4,
						'size' => 'full',
					),
					array(
						'label' => 'Body Script',
						'name' => 'cwps_google[body]',
						'option' => array( 'cwps_google', 'body' ),
						'type' => 'textarea',
						'rows' => 4,
						'size' => 'full',
					),
					array(
						'type' => 'sectionend',
					),
				),
			),
			'color-themes' => array(
				'tab_label' => 'Color Themes',
				'fields_slug' => GROUP_COLOR_THEME,
				'fields' => array(
					array(
						'title' => 'Default Color Themes',
						'type' => 'title',
						'desc' => 'These are the default color themes for the site. These can be overridden on individual pages.',
					),
					array(
						'label' => 'Default Page Color Theme',
						'name' => 'cwps_default_page_color_theme',
						'option' => 'cwps_default_page_color_theme',
						'type' => 'select',
						'options' => $color_options,
					),
					array(
						'type' => 'sectionend',
					),
				),
			),
		),
	);

	$child_api_fields = apply_filters( 'cwps_child_theme_options_fields', array() );
	if ( ! empty( $child_api_fields ) ) {
		$api_fields = $form_settings['tabs']['api-keys']['fields'];
		$last_field = array_pop( $api_fields );
		$api_fields = array_merge( $api_fields, $child_api_fields );
		$api_fields[] = $last_field;
		$form_settings['tabs']['api-keys']['fields'] = $api_fields;
	}

	new \cwps\adminForms\CWPS_Settings_Form(
		$form_settings
	);
}

add_action( 'init', __NAMESPACE__ . '\register_theme_settings' );

function register_theme_settings() {
	register_setting(
		GROUP_CONTACT,
		'cwps_contact',
		array(
			'type' => 'object',
			'show_in_rest' => array(
				'schema' => array(
					'type' => 'object',
					'properties' => array(
						'business_name' => array(
							'type' => 'string',
						),
						'address' => array(
							'type' => 'string',
						),
						'gmap_link' => array(
							'type' => 'string',
						),
						'phone' => array(
							'type' => 'string',
						),
						'email' => array(
							'type' => 'string',
						),
					),
				),
			),
			'default' => array(
				'business_name' => '',
				'address' => '',
				'gmap_link' => '',
				'phone' => '',
				'email' => '',
			),
		)
	);

	register_setting(
		GROUP_CONTACT,
		'cwps_hours',
		array(
			'type' => 'object',
			'show_in_rest' => array(
				'schema' => array(
					'type' => 'object',
					'properties' => array(
						'Monday' => array(
							'type' => 'string',
						),
						'Tuesday' => array(
							'type' => 'string',
						),
						'Wednesday' => array(
							'type' => 'string',
						),
						'Thursday' => array(
							'type' => 'string',
						),
						'Friday' => array(
							'type' => 'string',
						),
						'Saturday' => array(
							'type' => 'string',
						),
						'Sunday' => array(
							'type' => 'string',
						),
					),
				),
			),
			'default' => array(
				'Monday' => '',
				'Tuesday' => '',
				'Wednesday' => '',
				'Thursday' => '',
				'Friday' => '',
				'Saturday' => '',
				'Sunday' => '',
			),
		)
	);

	register_setting(
		GROUP_BANNERS,
		'cwps_notice_banner',
		array(
			'type' => 'object',
			'show_in_rest' => array(
				'schema' => array(
					'type' => 'object',
					'properties' => array(
						'display' => array(
							'type' => 'integer',
						),
						'message' => array(
							'type' => 'string',
						),
						'type' => array(
							'type' => 'string',
						),
					),
				),
			),
			'sanitize_callback' => function ( $value ) {
				if ( ! isset( $value['display'] ) ) {
					$value['display'] = 0;
				}
				return $value;
			},
			'default' => array(
				'display' => 0,
				'message' => '',
				'type' => 'update',
			),
		)
	);

	register_setting(
		GROUP_SOCIALS,
		'cwps_social_shares',
		array(
			'type' => 'object',
			'show_in_rest' => array(
				'schema' => array(
					'type' => 'object',
					'properties' => array(
						'facebook' => array(
							'type' => 'integer',
						),
						'twitter' => array(
							'type' => 'integer',
						),
						'pinterest' => array(
							'type' => 'integer',
						),
						'linkedin' => array(
							'type' => 'integer',
						),
					),
				),
			),
			'default' => array(
				'facebook' => 1,
				'twitter' => 1,
				'pinterest' => 1,
				'linkedin' => 1,
			),
			'sanitize_callback' => function ( $value ) {
				return array_merge(
					array(
						'facebook' => 0,
						'twitter' => 0,
						'pinterest' => 0,
						'linkedin' => 0,
					),
					$value
				);
			},
		)
	);

	register_setting(
		GROUP_SOCIALS,
		'cwps_social_links',
		array(
			'type' => 'object',
			'show_in_rest' => array(
				'schema' => array(
					'type' => 'object',
					'properties' => array(
						'facebook' => array(
							'type' => 'string',
						),
						'twitter' => array(
							'type' => 'string',
						),
						'instagram' => array(
							'type' => 'string',
						),
						'youtube' => array(
							'type' => 'string',
						),
						'tiktok' => array(
							'type' => 'string',
						),
						'pinterest' => array(
							'type' => 'string',
						),
						'linkedin' => array(
							'type' => 'string',
						),
					),
				),
			),
			'default' => array(
				'facebook' => '',
				'twitter' => '',
				'instagram' => '',
				'youtube' => '',
				'tiktok' => '',
				'pinterest' => '',
				'linkedin' => '',
			),
		)
	);

	register_setting(
		GROUP_API_KEYS,
		'cwps_paid_google_maps_api',
		array(
			'type' => 'string',
			'show_in_rest' => true,
			'default' => '',
		)
	);

	register_setting(
		GROUP_API_KEYS,
		'cwps_free_google_maps_api',
		array(
			'type' => 'string',
			'show_in_rest' => true,
			'default' => '',
		)
	);

	register_setting(
		GROUP_COLOR_THEME,
		'cwps_default_page_color_theme',
		array(
			'type' => 'string',
			'show_in_rest' => true,
			'default' => '',
		)
	);

	register_setting(
		GROUP_GOOGLE,
		'cwps_google',
		array(
			'type' => 'object',
			'default' => array(
				'head' => '',
				'body' => '',
			),
		)
	);
}
