'use strict';

import imageSelector from './modules/media-field';

// eslint-disable-next-line no-undef
jQuery( document ).ready( function ( $ ) {
	'use strict';
	const imageForm = ( imageId, name, types = 'image' ) => {
		return `
      <div class="image-select-field js-imageSelect" id="${ imageId }" data-media-type="${ types }">
			  <div class="image-select-field__img-wrap">
				  <img src="">
			  </div>
        <div class="image-select-field__right-col">
          <div class="image-select-field__meta-row image-select-field__title-row js-imageSelectTitleRow --hidden"></div>
          <div class="image-select-field__meta-row js-imageSelectLinkRow --hidden">
            <span class="image-select-field__meta-label">File Name:</span> <span class="js-imageSelectLinkValue"></span>
          </div>
          <div class="image-select-field__meta-row js-imageSelectSizeRow --hidden">
            <span class="image-select-field__meta-label">File Size:</span> <span class="js-imageSelectSizeValue"></span>
          </div>
          <div class="image-select-field__button-wrap">
            <input class="js-selectImage button" type="button" value="Select/Upload" />
            <input class="image-select-field__remove js-remove button" type="button" value="Remove" />
          </div>
        </div>
        <input type="hidden" name="${ name }" class="js-value" value="0">
      </div>
    `;
	};

	const $metaBox = $( '#js-productMetaForm' );
	$( '.js-productTab' ).click( function () {
		const tabId = $( this ).attr( 'data-tab' );
		$( '.js-productTab' ).removeClass( 'nav-tab-active' );
		$( '.js-tab-body' ).css( 'display', 'none' );
		$( this ).addClass( 'nav-tab-active' );
		$( '#' + tabId ).css( 'display', 'block' );
	} );

	$metaBox.on( 'click', '.js-removeRow', function () {
		$( this ).closest( '.js-repeaterRow' ).remove();
	} );

	$metaBox.on( 'click', '.js-rowDown', function () {
		const $row = $( this ).closest( '.js-repeaterRow' );
		$row.insertAfter( $row.next() );
	} );

	$metaBox.on( 'click', '.js-rowUp', function () {
		const $row = $( this ).closest( '.js-repeaterRow' );
		$row.insertBefore( $row.prev() );
	} );

	$metaBox.on( 'click', '.js-videoSource input[type="radio"]', function () {
		const selectedValue = $( this ).val();
		const $row = $( this ).closest( '.js-repeaterRow' );
		$row.find( '.js-youtube, .js-vimeo, .js-gallery' ).addClass( '--hidden' );
		$row.find( '.js-' + selectedValue ).removeClass( '--hidden' );
	} );

	$( '.js-addSpecsRow' ).click( function () {
		const timestamp = Date.now();
		const newRow = `
      <div class="cwps-product-tabs__repeater-row --inline js-repeaterRow">
        <div class="form-field">
          <label>Label</label>
          <input class="large-text" type="text" name="productTabSpecs[row-${ timestamp }][label]" value="">
        </div>
        <div class="form-field">
          <label>Value</label>
          <input class="large-text" type="text" name="productTabSpecs[row-${ timestamp }][value]" value="">
        </div>
        <div class="cwps-product-tabs__repeater-row-buttons">
          <button class="--up js-rowUp" type="button"></button>
          <button class="--delete js-removeRow" type="button"></button>
          <button class="--down js-rowDown" type="button"></button>
        </div>
			</div>`;
		$( '#js-featuresRepeater' ).append( newRow );
	} );

	$( '.js-addSlideRow' ).click( function () {
		const timestamp = Date.now();
		const editorId = 'custom_editor_' + timestamp;
		const imageId = 'custom_image_' + timestamp;
		const newRow = `
      <div class="cwps-product-tabs__repeater-row js-repeaterRow">
        <div class="cwps-product-tabs__repeater-row-title">
          <h3>Slide</h3>
          <div class="cwps-product-tabs__repeater-row-buttons">
            <button class="--up js-rowUp" type="button"></button>
            <button class="--delete js-removeRow" type="button"></button>
            <button class="--down js-rowDown" type="button"></button>
          </div>
        </div>
				<div class="form-field">
					<label>Headline</label>
					<input class="large-text" type="text" name="productTabSlides[row-${ timestamp }][headline]" value="">
				</div>
				<div class="form-field">
					<label>Body</label>
          <textarea name="productTabSlides[row-${ timestamp }][body]" id="${ editorId }" class="custom-editor-container"></textarea>
        </div>
				<div class="form-field">
					<label>Image</label>
          ${ imageForm( imageId, `productTabSlides[row-${ timestamp }][image]` ) }
	      </div>
        <div class="form-field">
          <label>Image Style</label>
          <fieldset>
            <label style="display: block;"><input type="radio" name="productTabSlides[row-${ timestamp }][image_style]" value="standard" checked="checked"> Standard</label>
            <label style="display: block;"><input type="radio" name="productTabSlides[row-${ timestamp }][image_style]" value="background"> Background</label>
          </fieldset>
        </div>
        <div class="form-field">
          <label>Image Alignment</label>
          <fieldset>
            <label style="display: block;"><input type="radio" name="productTabSlides[row-${ timestamp }][image_align]" value="right" checked="checked"> Right</label>
            <label style="display: block;"><input type="radio" name="productTabSlides[row-${ timestamp }][image_align]" value="left"> Left</label>
            <label style="display: block;"><input type="radio" name="productTabSlides[row-${ timestamp }][image_align]" value="background-left"> Background w/ Left Text</label>
            <label style="display: block;"><input type="radio" name="productTabSlides[row-${ timestamp }][image_align]" value="background-center"> Background w/ Center Text</label>
            <label style="display: block;"><input type="radio" name="productTabSlides[row-${ timestamp }][image_align]" value="background-right"> Background w/ Right Text</label>
          </fieldset>
        </div>
      </div>`;
		$( '#js-slidesRepeater' ).append( newRow );

		wp.editor.initialize( editorId, {
			tinymce: {
				wpautop: true,
				plugins:
					'charmap colorpicker hr lists media paste tabfocus textcolor fullscreen wordpress wpautoresize wpeditimage wpemoji wpgallery wplink wptextpattern wpview',
				toolbar1: 'bold,italic,link,bullist,numlist',
				toolbar2: '',
				// eslint-disable-next-line no-undef
				content_css: myTheme.themeUri + '/build/styles/tinymce.css',
			},
			quicktags: true,
			mediaButtons: false,
		} );

		new imageSelector( document.getElementById( imageId ) );
	} );

	$( '.js-addSizeRow' ).click( function () {
		const timestamp = Date.now();
		const imageId = 'custom_image_' + timestamp;
		const newRow = `
      <div class="cwps-product-tabs__repeater-row js-repeaterRow">
				<div class="cwps-product-tabs__repeater-row-title">
					<h3>Chart</h3>
					<div class="cwps-product-tabs__repeater-row-buttons">
            <button class="--up js-rowUp" type="button"></button>
            <button class="--delete js-removeRow" type="button"></button>
            <button class="--down js-rowDown" type="button"></button>
          </div>
				</div>
				<div class="form-field">
					<label>Image/File</label>
          ${ imageForm(
				imageId,
				`productTabSizeCharts[row-${ timestamp }]`,
				'[&quot;application/pdf&quot;,&quot;image&quot;]'
			) }
					<!-- <div class="image-select-field js-imageSelect" data-media-type="[&quot;application\/pdf&quot;,&quot;image&quot;]".,;>

          </div> -->
				</div>
			</div>`;
		$( '#js-chartsRepeater' ).append( newRow );
		new imageSelector( document.getElementById( imageId ) );
	} );

	$( '.js-addVideoRow' ).click( function () {
		const timestamp = Date.now();
		const imageId = 'custom_image_' + timestamp;
		const newRow = `
          <div class="cwps-product-tabs__repeater-row js-repeaterRow">
						<div class="cwps-product-tabs__repeater-row-title">
							<h3>Video</h3>
							<div class="cwps-product-tabs__repeater-row-buttons">
								<button class="--up js-rowUp" type="button"></button>
								<button class="--delete js-removeRow" type="button"></button>
								<button class="--down js-rowDown" type="button"></button>
							</div>
						</div>
						<div class="form-field">
							<label>Video Source</label>
							<fieldset class="js-videoSource">
                <label style="display: block;"><input type="radio" name="productTabVideos[row-${ timestamp }][source]" value="youtube" checked="checked"> Youtube</label>
                <label style="display: block;"><input type="radio" name="productTabVideos[row-${ timestamp }][source]" value="vimeo"> Vimeo</label>
                <label style="display: block;"><input type="radio" name="productTabVideos[row-${ timestamp }][source]" value="gallery"> Media Library</label>
              </fieldset>
						</div>
						<div class="form-field js-youtube">
							<label>Youtube ID</label>
							<input class="large-text" type="text" name="productTabVideos[row-${ timestamp }][youtube_video_id]" value="">
						</div>
						<div class="form-field js-vimeo --hidden">
							<label>Vimeo Embed URL</label>
							<input class="large-text" type="text" name="productTabVideos[row-${ timestamp }][vimeo_video_url]" value="">
						</div>
						<div class="form-field js-gallery --hidden">
							<label>Video</label>
              ${ imageForm( imageId, `productTabVideos[row-${ timestamp }][media_id]`, 'video' ) }
						</div>
					</div>`;
		$( '#js-videosRepeater' ).append( newRow );
		new imageSelector( document.getElementById( imageId ) );
	} );
} );
