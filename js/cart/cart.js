$(function() {

	var client = ShopifyBuy.buildClient({
    apiKey: 'b064ae6e618e3677e2a78cce4eb248d6',
    domain: 'myieisure.myshopify.com',
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
	/*DEBUG*/
	// localStorage.clear();

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

  	client.fetchQueryProducts({ collection_id: 261508417}).then(products => {
});
  	// if (cart.lineItems.length >= 1) {
  	// 	$(document).getElementsByClassName('btn--cart-tab').css('js-active');
  	// };

	$('#LettiniBuilder .two-buttons, #LettiniBuilder .cart-circle, .product-modal .add-to-cart, .product-modal .buy-it-now').on('click', function() {
		openCart();
		$(this).addClass('js-prevent-cart-listener');
		var productId = this.id.split(" ")[0];
		var variantId = this.id.split(" ")[1];
		console.log(productId,variantId);
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
