$(function() {



	/// MOSTLY SHOPIFY STUFF
	var client = ShopifyBuy.buildClient({
    apiKey: '30197388c16741334138de5dd1de3f1a',
    domain: 'my-leisure.myshopify.com',
    appId: '6'
  });
	/* variablessssss
	==========================*/
		window.client = client;
		var previousFocusItem;
		var cart;
		var product;
		var fetchProduct;
		var variant;
		var variants;
		var cartLineItemCount;
		var checkoutUrl;
		var item;
		var newQuantity;
		var variantsDB = [];
		var patternsDB = [];
		var framesDB = [];
		var sizesDB = [];
	/*DEBUG*/
	// localStorage.clear();



	client.fetchProduct("8461073805").then(function(product, error){
		// console.log(product);

		var count = 0;
		for (a in product.variants) {
			// console.log(product.variants[a]);

			variantsDB.push(product.variants[a]);

			var variantPattern = product.variants[a].optionValues[1].value;
			var variantPatternSpaced = variantPattern.replace(/ /g, "%20");
			var variantPatternSpacedId = variantPattern.replace(/ /g, "-");
			if ($.inArray(variantPattern, patternsDB) == -1) {
				patternsDB.push(variantPattern);
				if (count == 0) {
					patternsConfigList.insertAdjacentHTML( 'afterbegin', '<div id="'+variantPatternSpacedId+'" class="pattern-circle" style="background: url(./img/colours/50x/'+variantPatternSpaced+'.jpg)"><div class="pattern-modal">'+variantPattern+'</div></div>');
				} else {
					patternsConfigList.insertAdjacentHTML( 'afterbegin', '<div id="'+variantPatternSpacedId+'" class="pattern-circle" style="background: url(./img/colours/50x/'+variantPatternSpaced+'.jpg)"><div class="pattern-modal">'+variantPattern+'</div></div>');
				}

			}
			var variantFrame = product.variants[a].optionValues[2].value;
			var variantFrameSpaced = variantFrame.replace(/ /g, "%20");
			var variantFrameSpacedId = variantFrame.replace(/ /g, "-");
			if ($.inArray(variantFrame, framesDB) == -1) {
				framesDB.push(variantFrame);
				if (count == 0) {
					framesConfigList.insertAdjacentHTML( 'beforeend', '<div id="'+variantFrameSpacedId+'" class="frame-circle" style="background: url(./img/finishes/thumb/'+variantFrameSpaced+'.png)"><div class="frame-modal">'+variantFrame+'</div></div>');
				} else {
					framesConfigList.insertAdjacentHTML( 'beforeend', '<div id="'+variantFrameSpacedId+'" class="frame-circle" style="background: url(./img/finishes/thumb/'+variantFrameSpaced+'.png)"><div class="frame-modal">'+variantFrame+'</div></div>');
				}

			}


			// node.css({ "background" : url });
			count ++;
		}
		console.log("about to do it ");
	}).then(function(){
		changeLettini("default", "default");
		$('#LettiniBuilder .frame-circle').on('click', function(){
			changeLettini(this, "frame");
		});
		$('#LettiniBuilder .pattern-circle').on('click', function(){
			changeLettini(this, "pattern");


		})
	}).catch(function (err) {
		console.log(err);
		console.log("Request Failed");
	});

	function changeLettiniImages(sku){
		var dirhq = "/img/shop/lettinis/mobile/"+sku;
		var dirthumb = "/img/shop/lettinis/150x/"+sku;
		var fileextension = ".jpg";



		console.log("running");
			$.ajax({
				//This will retrieve the contents of the folder if the folder is configured as 'browsable'
				url: dirhq,
				success: function (data) {
					// List all mp4 file names in the page
					var count = 1;
					$(data).find("a:contains(" + fileextension + ")").each(function () {
						// var filename = this.href.replace(window.location.host, "").replace("http:///", "");
						var filename = this.href.replace(window.location.host, "").replace("https:///", "");
						filename = filename.replace("http:///", "");
						if (document.getElementById("productImage"+count)) {
						document.getElementById("productImage"+count).setAttribute('src', dirhq+'/'+filename);
						}
						count ++;
					});
					// $('.product-thumb-slider').slick('reinit');
				}
			}).then(function(){

				$.ajax({
					//This will retrieve the contents of the folder if the folder is configured as 'browsable'
					url: dirthumb,
					success: function (data) {
						// List all mp4 file names in the page
						var count = 1;
						$(data).find("a:contains(" + fileextension + ")").each(function () {
							// var filename = this.href.replace(window.location.host, "").replace("http:///", "");
							var filename = this.href.replace(window.location.host, "").replace("https:///", "");
							filename = filename.replace("https:///", "");
							if (document.getElementById("productImageThumb"+count)) {
								document.getElementById("productImageThumb"+count).setAttribute('src', dirthumb+'/'+filename);
							}
							count ++;
						});
						// $('.product-thumb-for-slider').slick('reinit');
					}
				}).then(function(){
					// $('document').ready(function(){
						// if ($('.product-thumb-slider>.slick-list')) {
						// 	console.log("true what");
						// 	$('product-thumb-slider').unslick();
						// } else {

							$('.product-thumb-slider').slick({
								slidesToShow: 3,
								slidesToScroll: 1,
								arrows: false,
								centerMode: false,
								fade: false,
								dots: false,
								vertical: true,
								verticalSwiping: true,
								focusOnSelect: true,
								waitForAnimate: false,
								infinite: true,
								// speed: 900
								responsive: [
									{
										breakpoint: 1215,
										settings: {
											vertical: false,
											verticalSwiping: false,

											slidesToShow: 1,
											slidesToScroll: 1,
											centerMode: false,
											arrows: true,
											infinite: true
										}
									}
								]

							});
						// }
						// if ($('.product-thumb-for-slider>.slick-list')) {
						// 	$('product-thumb-for-slider').unslick();
						// } else {
							// $('.product-thumb-for-slider').slick({
							// 	slidesToShow: 4,
							// 	slidesToScroll: 1,
							// 	arrows: false,
							// 	asNavFor: '.product-thumb-slider',
							// 	centerMode: true,
							// 	dots: false,
							// 	focusOnSelect: true
							// }).when(function(){
							//
							// 	$('.product-thumb-for-slider').slick('reinit');
							// })

						// }
					// })
				})
				// .then(function(){
				//
				// 	$('.product-thumb-slider').slick('reinit');
				// })
			})

	}

	$('.product-thumb-slider').mousewheel(function(e) {

		if (e.deltaY < 0) {
		    if($(this).slick('slickCurrentSlide') == $(this).find('.slide').length - 1) {
		    	return;
			}

		    e.preventDefault();

		    $(this).slick('slickNext');

		} else {
	    	if($(this).slick('slickCurrentSlide') == 0) {
				return;
	    	}

		    e.preventDefault();
		    $(this).slick('slickPrev');

	  	}
	});

	function changeLettini(data, option){
		console.log("changing lettini options, checking if pattern or frame");
		if (option == "default") {
			sizeConf.innerHTML = "Classic";
			patternConf.innerHTML = "Bianco";
			currentPattern = 'Bianco';
			currentPatternSpaced = currentPattern.replace(/ /g,"-");
			frameConf.innerHTML = "Silver";
			currentFrame = 'Silver';
			currentFrameSpaced = currentFrame.replace(/ /g, "-");
			currentId = "8461073805-28583411469";
			document.getElementById("replaceWithId").setAttribute('id', currentId);
			currentSKU = "BIASC";
			fallbackSKU = currentSKU;
			fallbackFrame = currentFrame;
			fallbackFrameSpaced = currentFrameSpaced;
			fallbackPattern = currentPattern;
			fallbackPatternSpaced = currentPatternSpaced;
			//Changes productImages to the /img/shop/$SKU/etc..
			changeLettiniImages(currentSKU);

				console.log('yes we"re doing it');

			//Adds active classes to options to show titles
			$('#'+currentPattern).addClass('active');
			$('#'+currentFrame).addClass('active');



		} else {


			if (option == 'pattern') {
				console.log("changing pattern");
				// var oldPattern = $(patternsConfigList).find('.active').attr('id').replace(/ /g, "-");
				currentPattern = data.id;
				currentPatternSpaced = currentPattern.replace(/ /g, "-");

				for (a in variantsDB) {
					console.log(variantsDB[a].attrs.variant.option_values[1].value.replace(/ /g, "-"), currentPatternSpaced);
					if (

						//If statement checking to see if the clicked pattern option matches any variant patterns and also that variants frame option
						(variantsDB[a].attrs.variant.option_values[1].value.replace(/ /g, "-") == currentPatternSpaced)
						&&
						(variantsDB[a].attrs.variant.option_values[2].value.replace(/ /g, "-") == currentFrameSpaced)
						)
						{

						currentSKU = variantsDB[a].attrs.variant.sku;

						//Changes active pattern label
						$(patternsConfigList).find('.active').removeClass('active');
						$("#"+currentPatternSpaced).addClass('active');

						var hitCheck = true;
						changeLettiniImages(currentSKU);

						//Changes lettini Product info displayed html
						sizeConf.innerHTML = "Classic";
						patternConf.innerHTML = currentPatternSpaced.replace(/-/g, ' ');
						frameConf.innerHTML = currentFrameSpaced.replace(/-/g, ' ');

						oldId = currentId;
						currentId = oldId.split("-")[0]+"-"+variantsDB[a].attrs.variant.id;
						console.log(currentId, oldId);
						document.getElementById(oldId).setAttribute('id', currentId);
						console.log("currentId to be replaced", currentId);
					} else if (variantsDB[a].attrs.variant.option_values[1].value.replace(/ /g, "-") == currentPatternSpaced) {
						console.log("setting fallback sku");
						fallbackPattern = variantsDB[a].attrs.variant.option_values[1].value;
						fallbackPatternSpaced = fallbackPattern.replace(/ /g,'-');
						fallbackFrame = variantsDB[a].attrs.variant.option_values[2].value;
						fallbackFrameSpaced = fallbackFrame.replace(/ /g,'-');
						fallbackSKU = variantsDB[a].attrs.variant.sku;
					};
				};

				if (!hitCheck) {

					console.log("Frame does not match with the currently selected frame");

					currentSKU = fallbackSKU;
					currentFrame = fallbackFrame;
					currentFrameSpaced = fallbackFrameSpaced;
					currentPattern = fallbackPattern;
					currentPatternSpaced = fallbackPatternSpaced;

					//Changes lettini Product info displayed html
					sizeConf.innerHTML = "Classic";
					patternConf.innerHTML = currentPatternSpaced.replace(/-/g, ' ');
					frameConf.innerHTML = currentFrameSpaced.replace(/-/g, ' ');

					$(patternsConfigList).find('.active').removeClass('active');
					$("#"+currentPatternSpaced).addClass('active');

					$(framesConfigList).find('.active').removeClass('active');
					$("#"+currentFrameSpaced).addClass('active');
					changeLettiniImages(currentSKU);

					oldId = currentId;
					currentId = oldId.split("-")[0]+"-"+variantsDB[a].attrs.variant.id;
					document.getElementById(oldId).setAttribute('id', currentId);
					console.log("currentId to be inserted as ID onto button", currentId);

				};
			} else if (option == 'frame') {
				console.log("changing frame");
				// var oldPattern = $(patternsConfigList).find('.active').attr('id').replace(/ /g, "-");
				currentFrame = data.id;
				currentFrameSpaced = currentFrame.replace(/ /g, "-");

				for (a in variantsDB) {
					if (
						//If statement checking to see if the clicked pattern option matches any variant patterns and also that variants frame option
						(variantsDB[a].attrs.variant.option_values[2].value.replace(/ /g, "-") == currentFrameSpaced)
						&&
						(variantsDB[a].attrs.variant.option_values[1].value.replace(/ /g, "-") == currentPatternSpaced)
						)
						{

						currentSKU = variantsDB[a].attrs.variant.sku;

						//Changes active pattern label
						$(patternsConfigList).find('.active').removeClass('active');
						$("#"+currentPatternSpaced).addClass('active');
						$(framesConfigList).find('.active').removeClass('active');
						$("#"+currentFrameSpaced).addClass('active');

						var hitCheck = true;
						changeLettiniImages(currentSKU);

						//Changes lettini Product info displayed html
						sizeConf.innerHTML = "Classic";
						patternConf.innerHTML = currentPatternSpaced.replace(/-/g, ' ');
						frameConf.innerHTML = currentFrameSpaced.replace(/-/g, ' ');

						oldId = currentId;
						currentId = oldId.split("-")[0]+"-"+variantsDB[a].attrs.variant.id;
						document.getElementById(oldId).setAttribute('id', currentId);
						console.log("currentId to be inserted as ID onto button", currentId);
					} else if (variantsDB[a].attrs.variant.option_values[2].value.replace(/ /g, "-") == currentFrameSpaced) {
						console.log("setting fallback options");
						fallbackPattern = variantsDB[a].attrs.variant.option_values[1].value;
						fallbackPatternSpaced = fallbackPattern.replace(/ /g,'-');
						fallbackFrame = variantsDB[a].attrs.variant.option_values[2].value;
						fallbackFrameSpaced = fallbackFrame.replace(/ /g,'-');
						fallbackSKU = variantsDB[a].attrs.variant.sku;
					};
				};

				if (!hitCheck) {

					console.log("Pattern does not match with the currently selected frame");

					currentSKU = fallbackSKU;
					currentFrame = fallbackFrame;
					currentFrameSpaced = fallbackFrameSpaced;
					currentPattern = fallbackPattern;
					currentPatternSpaced = fallbackPatternSpaced;

					//Changes lettini Product info displayed html
					sizeConf.innerHTML = "Classic";
					patternConf.innerHTML = currentPatternSpaced.replace(/-/g, ' ');
					frameConf.innerHTML = currentFrameSpaced.replace(/-/g, ' ');
					$(patternsConfigList).find('.active').removeClass('active');
					$("#"+currentPatternSpaced).addClass('active');

					$(framesConfigList).find('.active').removeClass('active');
					$("#"+currentFrameSpaced).addClass('active');
					changeLettiniImages(currentSKU);

					oldId = currentId;
					currentId = oldId.split("-")[0]+"-"+variantsDB[a].attrs.variant.id;
					document.getElementById(oldId).setAttribute('id', currentId);
					console.log("currentId to be inserted as ID onto button", currentId);

				};
			}
		}
	//
	// var targetOffset = $("#LettiniBuilder").offset().top;
	//
	// var $w = $(window).scroll(function(){
	//     if ( $w.scrollTop() > targetOffset ) {
	//         $('').css({"border-bottom":"2px solid #f4f5f8"});
	//         $('#voice3').css({"border-bottom":"2px solid #2e375b"});
	//     } else {
	//       // ...
	//     }
	// });

	}

  if(localStorage.getItem('lastCartId')) {
    client.fetchCart(localStorage.getItem('lastCartId')).then(function(remoteCart) {
      cart = remoteCart;
      cartLineItemCount = cart.lineItems.length;
      renderCartItems();
      renderCartButton();
    });
  } else {
    client.createCart().then(function (newCart) {
      cart = newCart;
      localStorage.setItem('lastCartId', cart.id);
      cartLineItemCount = 0;
      $('btn--cart-tab').removeClass('js-active');
    });
  };

	$('.two-buttons, .add-to-cart, .add-accessory, #LettiniBuilder .cart-circle, .product-modal .buy-it-now, .addToCart').on('click', function() {
		openCart();
		$(this).addClass('js-prevent-cart-listener');
		var productId = this.id.split("-")[0];
		var variantId = this.id.split("-")[1];
		console.log("this.id",this.id,"productId",productId,"variantId",variantId);
		addProductToCart(productId, variantId);
	});

	// $('#LettiniBuilder .cart-circle').on('click', function() {
	// 	openCart();
	// 	$(this).addClass('js-prevent-cart-listener');
	// 	var productId = this.id.split(" ")[0];
	// 	var variantId = this.id.split(" ")[1];
	// 	console.log(productId,variantId);
	// 	addProductToCart(productId, variantId);
	// });

	$(document).ready(function() {
		bindEventListeners();
	});

	/* debug
	$(document).on('keydown', function() {
	});
	*/

	/* FUNCTIONS */
	function openCart() {
		$('.cart').addClass('js-active')

		$('.cart-btn').addClass("js-active")
	};
	function toggleCart() {
		$('.cart-btn').toggleClass("js-active");
		$('.cart').toggleClass('js-active');
	};
	function closeCart() {
		$('.cart-btn').removeClass("js-active")
		$('.cart').removeClass("js-active");
	}


	function renderCartButton() {
		$('.btn__counter').text(cart.lineItemCount);
		// $('.btn--cart-tab').addClass('js-active');
	}

	function addProductToCart(productId, variantId) {
		openCart();
		console.log("productId", productId, "variantId", variantId);
		client.fetchProduct(productId).then(function (fetchedProduct) {
			product = fetchedProduct;
			variant = product.variants.filter(function(item) {
				return item.id == variantId;
			})[0];
			if (findCartItemByVariantId(variantId)) {
				quantity = findCartItemByVariantId(variantId).quantity +1;
			} else {
				quantity = 1;
			};
			// if (findCartItemByVariantId(variantId)) {
			// 	incrementQuantity(variantId)
			// } else {
			addOrUpdateVariant(variant, quantity);
			// }
		});
	}

	function checkProductInCart(productId) {

	}
	/* Generate DOM elements for variant selectors
	  ============================================================ */
	  function generateSelectors(product) {
	    var elements = product.options.map(function(option) {
	      return '<select name="' + option.name + '">' + option.values.map(function(value) {
	        return '<option value="' + value + '">' + value + '</option>';
	      }) + '</select>';
	    });

	    return elements;
	  }


	  /* Bind Event Listeners
	  ============================================================ */
	  function bindEventListeners() {
	    /* cart close button listener */
	    $('.cart .btn--close').on('click', closeCart);

	    /* click away listener to close cart */
	    $(document).on('click', function(evt) {
	      if((!$(evt.target).closest('.cart').length) && (!$(evt.target).closest('.js-prevent-cart-listener').length)) {
	        closeCart();
	      }
	    });
	    /* custom key handler */
	    // var D_keycode = 68;
	    // $(document).on('keydown', function (evt) {
	    // 	if (evt.which === D_keycode) {
	    // 		if ($('.cart').hasClass('js-active')) {
	    // 			closeCart();
	    // 		}
	    // 		else {
	    // 			openCart();
	    // 		}
	    // 	}
	    // })

	    /* CLEARRRR ALLLLLL */
	    $('.cart-subtitle').on('click', function() {
	    	client.createCart().then(function (newCart) {
	    		cart = newCart;
	    		localStorage.setItem('lastCartId', cart.id);
      			cartLineItemCount = 0;
      			renderCartItems();
      			renderCartButton();
	    	});

	    });

	    /* escape key handler */
	    var ESCAPE_KEYCODE = 27;
	    $(document).on('keydown', function (evt) {
	      if (evt.which === ESCAPE_KEYCODE) {
	        if (previousFocusItem) {
	          $(previousFocusItem).focus();
	          previousFocusItem = ''
	        };
	        closeCart();
	      };

	    });

	    /* checkout button click listener */
	    $('.btn--cart-checkout').on('click', function () {
	      window.open(cart.checkoutUrl, '_self');
	    });

	    /* buy button click listener */
	    $('.buy-button').on('click', buyButtonClickHandler);

	    /* increment quantity click listener */
	    $('.cart').on('click', '.quantity-increment', function () {
	      var variantId = $(this).data('variant-id');
	      incrementQuantity(variantId);
	    });

	    /* decrement quantity click listener */
	    $('.cart').on('click', '.quantity-decrement', function() {
	      var variantId = $(this).data('variant-id');
	      decrementQuantity(variantId);
	    });

	    /* update quantity field listener */
	    $('.cart').on('keyup', '.cart-item__quantity', debounce(fieldQuantityHandler, 250));

	    /* cart tab click listener */
	    $('.btn--cart-tab, .cart-subheading').on('click', function() {
	      setPreviousFocusItem(this);
	      toggleCart();
	    });
	  }


	  /* Variant option change handler
	  ============================================================ */
	  function attachOnVariantSelectListeners(product) {
	    $('.variant-selectors').on('change', 'select', function(event) {
	      var $element = $(event.target);
	      var name = $element.attr('name');
	      var value = $element.val();
	      product.options.filter(function(option) {
	        return option.name === name;
	      })[0].selected = value;

	      var selectedVariant = product.selectedVariant;
	      var selectedVariantImage = product.selectedVariantImage;
	      updateProductTitle(product.title);
	      updateVariantImage(selectedVariantImage);
	      updateVariantTitle(selectedVariant);
	      updateVariantPrice(selectedVariant);
	    });
	  }

	  /* Update product title
	  ============================================================ */
	  function updateProductTitle(title) {
	    $('#buy-button-1 .product-header').text(title);
	  }

	  /* Update product image based on selected variant
	  ============================================================ */
	  function updateVariantImage(image) {
	    var src = (image) ? image.src : ShopifyBuy.NO_IMAGE_URI;

	    $('#buy-button-1 .variant-image').attr('src', src);
	  }

	  /* Update product variant title based on selected variant
	  ============================================================ */
	  function updateVariantTitle(variant) {
	    $('#buy-button-1 .variant-title').text(variant.title);
	  }

	  /* Update product variant price based on selected variant
	  ============================================================ */
	  function updateVariantPrice(variant) {
	    $('#buy-button-1 .variant-price').text('$' + variant.price);
	  }

	  /* Attach and control listeners onto buy button
	  ============================================================ */
	  function buyButtonClickHandler(evt) {
	    evt.preventDefault();
	    var id = product.selectedVariant.id;
	    var quantity;
	    var cartLineItem = findCartItemByVariantId(id);

	    quantity = cartLineItem ? cartLineItem.quantity + 1 : 1;

	    addOrUpdateVariant(product.selectedVariant, quantity);
	    setPreviousFocusItem(evt.target);
	    $('#checkout').focus();
	  }

	  /* Update product variant quantity in cart
	  ============================================================ */
	  function updateQuantity(fn, variantId) {
	    // var variant = product.variants.filter(function (variant) {
	    //   return (variant.id === variantId);
	    // })[0];
	    // var quantity;
	    var cartLineItem = findCartItemByVariantId(variantId);
	    if (cartLineItem) {
	      cartLineItem.quantity = fn(cartLineItem.quantity);
	      quantity = cartLineItem.quantity;
	      updateVariantInCart(cartLineItem, quantity);
	    }
	  }

	  /* Decrease quantity amount by 1
	  ============================================================ */
	  function decrementQuantity(variantId) {
	    updateQuantity(function(quantity) {
	      return quantity - 1;
	    }, variantId);
	  }

	  /* Increase quantity amount by 1
	  ============================================================ */
	  function incrementQuantity(variantId) {
	    updateQuantity(function(quantity) {
	      return quantity + 1;
	    }, variantId);
	  }

	  /* Update producrt variant quantity in cart through input field
	  ============================================================ */
	  function fieldQuantityHandler(evt) {
	    var variantId = parseInt($(this).closest('.cart-item').attr('data-variant-id'), 10);
	    var variant = product.variants.filter(function (variant) {
	      return (variant.id === variantId);
	    })[0];
	    var cartLineItem = findCartItemByVariantId(variant.id);
	    var quantity = evt.target.value;
	    if (cartLineItem) {
	      updateVariantInCart(cartLineItem, quantity);
	    }
	  }

	  /* Debounce taken from _.js
	  ============================================================ */
	  function debounce(func, wait, immediate) {
	    var timeout;
	    return function() {
	      var context = this, args = arguments;
	      var later = function() {
	        timeout = null;
	        if (!immediate) func.apply(context, args);
	      };
	      var callNow = immediate && !timeout;
	      clearTimeout(timeout);
	      timeout = setTimeout(later, wait);
	      if (callNow) func.apply(context, args);
	    }
	  }


	  /* Find Cart Line Item By Variant Id
	  ============================================================ */
	  function findCartItemByVariantId(variantId) {
	    return cart.lineItems.filter(function (item) {
	      return item.variant_id == variantId;
	    })[0];
	  }

	  function findCartItemByProductId(productId) {
	  	return cart.lineItems.filter(function (item) {
	  		return (item.product_id === productId);
	  	})[0];
	  }

	  /* Determine action for variant adding/updating/removing
	  ============================================================ */
	  function addOrUpdateVariant(variant, quantity) {
	    openCart();
	    var cartLineItem = findCartItemByVariantId(variant.id);
	    if (cartLineItem) {
	      updateVariantInCart(cartLineItem, quantity);
	    } else {
	      addVariantToCart(variant, quantity);
	    }

	    updateCartTabButton();
	  }

	  /* Update details for item already in cart. Remove if necessary
	  ============================================================ */
	  function updateVariantInCart(cartLineItem, quantity) {
	    var variantId = cartLineItem.variant_id;
	    var cartLength = cart.lineItemCount;
	    cart.updateLineItem(cartLineItem.variant_id, quantity).then(function(updatedCart) {
	      var $cartItem = $('.cart').find('.cart-item[data-variant-id="' + variantId + '"]');
	      if (cartLineItem.quantity >= 1) {
	        $cartItem.find('.cart-item__quantity').val(cartLineItem.quantity);
	        $cartItem.find('.cart-item__price').text(formatAsMoney(cartLineItem.line_price));
	      } else {
	        $cartItem.addClass('js-hidden').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
	           $cartItem.remove();
	        });
	      }

	      updateCartTabButton();
	      updateTotalCartPricing();
	      if (updatedCart.lineItems.length < 1) {
	        closeCart();
	      }
	    }).catch(function (errors) {
	      console.log('Fail');
	      console.error(errors);
	    });
	  }

	  /* Add 'quantity' amount of product 'variant' to cart
	  ============================================================ */
	  function addVariantToCart(variant, quantity) {
	    openCart();
	    cart.addVariants({ variant: variant, quantity: quantity }).then(function() {
	      var cartItem = cart.lineItems.filter(function (item) {
	        return (item.variant_id === variant.id);
	      })[0];
	      var $cartItem = renderCartItem(cartItem);
	      var $cartItemContainer = $('.cart-item-container');
	      $cartItemContainer.append($cartItem);
	      setTimeout(function () {
	        $cartItemContainer.find('.js-hidden').removeClass('js-hidden');
	      }, 0)

	    }).catch(function (errors) {
	      console.log('Fail');
	      console.error(errors);
	    });

	    updateTotalCartPricing();
	    updateCartTabButton();
	  }

	  /* Return required markup for single item rendering
	  ============================================================ */
	  function renderCartItem(lineItem) {
	    var lineItemEmptyTemplate = $('#CartItemTemplate').html();
	    var $lineItemTemplate = $(lineItemEmptyTemplate);
	    var itemImage = lineItem.image.src;
	    // console.log(lineItem.product_id);
	    // console.log(lineItem);
	    // client.fetchProduct(lineItem.product_id).then(product => {
	    // 	console.log(product)
	    // });
	    $lineItemTemplate.attr('data-variant-id', lineItem.variant_id);
	    $lineItemTemplate.addClass('js-hidden');
	    $lineItemTemplate.find('.cart-item__img').css('background-image', 'url(' + lineItem.image.src + ')');
	    $lineItemTemplate.find('.cart-item__title').text(lineItem.title);
	    $lineItemTemplate.find('.cart-item__variant-title').text(lineItem.variant_title);
	    $lineItemTemplate.find('.cart-item__price').text(formatAsMoney(lineItem.line_price));
	    $lineItemTemplate.find('.cart-item__quantity').attr('value', lineItem.quantity);
	    $lineItemTemplate.find('.quantity-decrement').attr('data-variant-id', lineItem.variant_id);
	    $lineItemTemplate.find('.quantity-increment').attr('data-variant-id', lineItem.variant_id);

	    return $lineItemTemplate;
	  }

	  /* Render the line items currently in the cart
	  ============================================================ */
	  function renderCartItems() {
	    var $cartItemContainer = $('.cart-item-container');
	    $cartItemContainer.empty();
	    var lineItemEmptyTemplate = $('#CartItemTemplate').html();
	    var $cartLineItems = cart.lineItems.map(function (lineItem, index) {
	      return renderCartItem(lineItem);
	    });
	    $cartItemContainer.append($cartLineItems);

	    setTimeout(function () {
	      $cartItemContainer.find('.js-hidden').removeClass('js-hidden');
	    }, 0)
	    updateTotalCartPricing();
	  }

	  /* Update Total Cart Pricing
	  ============================================================ */
	  function updateTotalCartPricing() {
	    $('.cart .pricing').text(formatAsMoney(cart.subtotal));
	  }

	  /* Format amount as currency
	  ============================================================ */
	  function formatAsMoney(amount) {
	    return '$' + parseFloat(amount, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
	  }

	  /* Update cart tab button
	  ============================================================ */
	  function updateCartTabButton() {
	    if (cart.lineItems.length > 0) {
	      $('.btn--cart-tab .btn__counter').html(cart.lineItemCount);
	      $('.btn--cart-tab').addClass('js-active');
	    } else {
	      // $('.btn--cart-tab').removeClass('js-active');
	      $('.cart').removeClass('js-active');
	    }
	  }

	  /* Set previously focused item for escape handler
	  ============================================================ */
	  function setPreviousFocusItem(item) {
	    previousFocusItem = item;
	  }



});

/// SHOP PAGE THINGS
function filterProductsByColour(tagButton){
	var tag = tagButton.id;
	$(tagButton).addClass('activeTag');
	var numberOfProducts = $('.product-container').length;
	var activeFrame = $('#frameTags').find('.activeTag')[0].id;
	$('#colourTags').children('.tag').each(function(i){
		if (this.id !== tag) {
			$(this).removeClass('activeTag')
		}
	})
	$('#products').children('.product-container').each(function(i){
		if (($(this).data('tags').indexOf(tag) > -1) && ($(this).data('tags').indexOf(activeFrame) > -1)) {
			$(this).removeClass('hidden')
		} else {
			if ($(this).hasClass('hidden')){
			} else {
				$(this).addClass('hidden')
			}
		}
		if (i == numberOfProducts - 1) {
			window.scrollTo(window.scrollX, window.scrollY-1);
			window.scrollTo(window.scrollX, window.scrollY+1);
			if($('#products .hidden').length == numberOfProducts){
				if($('#noProducts .no-products').hasClass('hidden')) {
					$('#noProducts .no-products').removeClass('hidden')
				}
			} else {
				if($('#noProducts .no-products').hasClass('hidden')) {
				} else {
					$('#noProducts .no-products').addClass('hidden')

				}

			}
		}
	})
};

function filterProductsByFrame(tagButton){
	var tag = tagButton.id;
	$(tagButton).addClass('activeTag');
	var numberOfProducts = $('.product-container').length;
	var activeColour = $('#colourTags').find('.activeTag')[0].id;
	$('#frameTags').children('.tag').each(function(i){
		if (this.id !== tag) {
			$(this).removeClass('activeTag')
		}
	})
	$('#products').children('.product-container').each(function(i){
		if (($(this).data('tags').indexOf(tag) > -1) && ($(this).data('tags').indexOf(activeColour) > -1)) {
			$(this).removeClass('hidden')
		} else {
			if ($(this).hasClass('hidden')){
			} else {
				$(this).addClass('hidden')
			}
		}
		if (i == numberOfProducts - 1) {
			window.scrollTo(window.scrollX, window.scrollY-1);
			window.scrollTo(window.scrollX, window.scrollY+1);
			if($('#products .hidden').length == numberOfProducts){
				if($('#noProducts .no-products').hasClass('hidden')) {
					$('#noProducts .no-products').removeClass('hidden')
				}
			} else {
				if($('#noProducts .no-products').hasClass('hidden')) {
				} else {
					$('#noProducts .no-products').addClass('hidden')

				}

			}
		}
	})
};
