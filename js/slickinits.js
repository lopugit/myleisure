$('document').ready(function(){

	$('.splash-slider').slick({
		lazyLoad: 'progressive',
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		// autoplaySpeed: 5000,
		speed: 700,
		infinite: true,
		zIndex: 105,
		// arrows: true,
		dots: false
	});
	// ACCESSORIES SLIDERS
	$('.slider-main-cushion').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav-cushion',
		lazyLoad: 'ondemand',
		infinite: true
	});
	$('.slider-nav-cushion').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		asNavFor: '.slider-main-cushion',
		arrows: false,
		centerMode: true,
		dots: false,
		focusOnSelect: true,
		lazyLoad: 'progressive',
		infinite: true

	});
	/// ACCESSORIES CUP SLIDER
	$('.slider-main-cup').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav-cup',
		lazyLoad: 'ondemand',
		infinite: true

	});
	/// CONT.
	$('.slider-nav-cup').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		asNavFor: '.slider-main-cup',
		arrows: false,
		centerMode: true,
		dots: false,
		focusOnSelect: true,
		lazyLoad: 'progressive',
		infinite: true

	});


	/// PRODUCT SLIDERS
	$('.product-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 2000,
		dots: false,
		arrows: false,
		// fade: true,
		// asNavFor: '.product-slider-nav',
		lazyLoad: 'progressive',
		infinite: true
	});
	$('.product-showcase-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		dots: false,
		arrows: false,
		// fade: true,
		// asNavFor: '.product-slider-nav',
		lazyLoad: 'progressive',
		infinite: true
	});

	// $('.product-slider-nav').slick({
	// 	slidesToShow: 4,
	// 	slidesToScroll: 1,
	// 	centerMode: true,
	// 	focusOnSelect: true,
	// 	dots: false,
	// 	arrows: false,
	// 	// fade: true,
	// 	asNavFor: '.product-slider',
	// 	lazyLoad: 'progressive',
	// 	infinite: true
	// });

	$('.finishes-slider').slick({
		lazyLoad: 'progressive',
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2200,
		speed: 400,
		infinite: true,
		zIndex: 105,
		fade: true,
		// arrows: true,
		dots: false
	});
});
