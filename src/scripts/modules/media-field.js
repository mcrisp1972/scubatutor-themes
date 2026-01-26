// image field script
class imageSelector {
	constructor( field ) {
		this.field = field;
		this.remove = field.querySelector( '.js-remove' );
		this.select = field.querySelector( '.js-selectImage' );
		this.input = field.querySelector( '.js-value' );
		this.img = field.querySelector( 'img' );
		this.select.addEventListener( 'click', this.selectImage.bind( this ) );
		this.remove.addEventListener( 'click', this.removeImage.bind( this ) );
		this.type = field.dataset.mediaType ? field.dataset.mediaType : 'image';
		this.titleRow = field.querySelector( '.js-imageSelectTitleRow' );
		this.linkRow = field.querySelector( '.js-imageSelectLinkRow' );
		this.sizeRow = field.querySelector( '.js-imageSelectSizeRow' );
		this.linkValue = field.querySelector( '.js-imageSelectLinkValue' );
		this.sizeValue = field.querySelector( '.js-imageSelectSizeValue' );
	}

	selectImage( event ) {
		event.preventDefault();
		const imageFrame = wp.media( {
			title: 'Select Image',
			multiple: false,
			library: {
				type: this.type,
			},
		} );
		const $this = this;
		const field = this.field;
		const input = this.input;
		const img = this.img;

		imageFrame.on( 'close', function () {
			const selection = imageFrame.state().get( 'selection' );
			let imageId = false;
			let imageURL;
			selection.each( function ( attachment ) {
				if ( parseInt( attachment.id ) ) {
					imageId = attachment.id;
					imageURL = attachment.attributes.url;

					if ( imageId ) {
						$this.input.value = imageId;
						img.src = imageURL;
						$this.field.classList.add( '--has-value' );
						$this.titleRow.classList.remove( '--hidden' );
						$this.linkRow.classList.remove( '--hidden' );
						$this.sizeRow.classList.remove( '--hidden' );
						$this.titleRow.innerHTML = attachment.attributes.title;
						$this.linkValue.innerHTML = `<a href="${ attachment.attributes.url }" target="_blank">${ attachment.attributes.filename }</a>`;
						$this.sizeValue.innerHTML = attachment.attributes.filesizeHumanReadable;
					} else {
						input.value = 0;
						img.src = '';
						field.classList.remove( '--has-value' );
					}
				}
			} );
		} );

		imageFrame.on( 'open', function () {
			// const library = imageFrame.state().get( 'library' );
			// library.props.set( 'type', 'image' );
			// library.props.set( 'type', 'video' );
			// library.props.set( 'type', 'application/pdf' );
			const selection = imageFrame.state().get( 'selection' );
			const id = input.value;
			const attachment = wp.media.attachment( id );
			attachment.fetch();
			selection.add( attachment ? [ attachment ] : [] );
		} );

		imageFrame.open();
	}

	removeImage() {
		this.field.classList.remove( '--has-value' );
		this.titleRow.classList.add( '--hidden' );
		this.linkRow.classList.add( '--hidden' );
		this.sizeRow.classList.add( '--hidden' );
		this.titleRow.innerHTML = '';
		this.linkValue.innerHTML = '';
		this.sizeValue.innerHTML = '';
		this.input.value = '0';
		this.img.src = '';
	}
}

export default imageSelector;
