
//SHOP PRODUCT MODAL FUNCTIONS
function hideProductModal(e){
	var product = $(e).find('.chair-1');
	if ($('.product-modal').hasClass('show-modal')) {
		$('.product-modal').removeClass('show-modal');
	} else {

		var imgsrc = $(e).find('.product-img').attr('src');
		var sku = product.context.id;
		$('.modal-img img').attr('src', imgsrc);
		$('.img-choice .current').attr('src', imgsrc);
		$('.product-modal').addClass('show-modal');

		//SELECTS THE IMG ELEMENTS TO FILL WITH THE CORRECT SRC PRODUCT IMG URL
		for (var i = 3; i < product.context.attributes.length; i++) {
			var urlcode = "data-url"+(i - 2).toString();
			var img = $('.product-modal .img-choice').find("#"+(i - 2).toString());

			if (product.context.attributes[urlcode]) {
				if (product.context.attributes[urlcode].value !== null) {
					img.attr('src', "./img/shop/lettinis/100x/"+sku+"/"+product.context.attributes[urlcode].value);
				} else {
					img.addClass('hidden');
				}
			} else {
				img.addClass('hidden');
			}
		}

		// var productImages = $('.product-modal .img-choice').find('img');
		// for (var i = 0; i < productImages.length; i++) {
		// 	var str = productImages[i].currentSrc,
		// 	len = str.length,
		// 	char = str.charAt(len - 1);
		// 	if ($(productImages[i]).attr('src') == '#') {
		// 		$(productImages[i]).addClass('hidden');
		// 	}
		// }
		$('.product-modal .modal-img')
	      .zoom({
	  		url: $('.product-modal .modal-img img').attr('src')
	  	});
		var desc = $('.product-modal').find('#desc'),
		price = $('.product-modal').find('#price'),
		name = $('.product-modal').find('#name'),
		pattern = $('.product-modal').find('#pattern'),
		checkoutbut = $('.buy-buttons').find('.add-to-cart'),
		addtocartbut = $('.buy-buttons').find('.buy-it-now');

		desc[0].innerHTML = product.context.attributes['data-desc'].value;
		price[0].innerHTML = product.context.attributes['data-price'].value;
		var name2 = product.context.attributes['data-name'].value,
		pattern2 = product.context.attributes['data-pattern'].value,
		areEqual = name2.toUpperCase() === pattern2.toUpperCase(),
		idstring = product.context.attributes['data-prodIdVariantCombo'].value.replace(/ /g, '-');

		checkoutbut[0].setAttribute("id", idstring);
		addtocartbut[0].setAttribute("id", idstring);

		if (areEqual){
			name[0].innerHTML = name2;
			pattern[0].innerHTML = name2;

		} else {
			name[0].innerHTML = name2;
			pattern[0].innerHTML = pattern2;
		}
	};
};
function changeModalImage(e){
	var src = $(e).attr('src');
	var res = src.replace('100x','mobile');
	$('.product-modal #modal-img img').attr('src', res);

	$('.product-modal .modal-img')
      .zoom({
  		url: $('.product-modal .modal-img img').attr('src')
  	});
}
function updateQuantity(c){
	var current = $('#product-modal input#quantity').val();
	current = parseInt(current);
	if (c == 'm') {
		if ($('#product-modal input#quantity').val() == 1) {
			// do nothing
		} else {
			$('#product-modal input#quantity').val(current -= 1);
		}
	} else {
		if (c == 'p') {
			var newcurrent = current + 1;
			$('#product-modal input#quantity').val(newcurrent);
		} else {
			alert('something went wrong, contact ireply@myleisure.com.au');
		}
	}
};
function switchGallery(e){
	var gallery = $(e).parent();
	if (gallery.hasClass('no-max')){
		gallery.removeClass('no-max');
		gallery.css('height','auto');
	} else {
		gallery.addClass('no-max');
		gallery.css('height','auto');
	}
}
