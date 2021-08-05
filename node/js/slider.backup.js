$('document').ready(function(){

	$('.splash-slider').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5500,
		infinite: true,
		zIndex: 105,
		dots: false
	});
	// ACCESSORIES SLIDERS
	$('.slider-main-cushion').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav-cushion'
	});
	$('.slider-nav-cushion').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		asNavFor: '.slider-main-cushion',
		arrows: false,
		centerMode: true,
		dots: false,
		focusOnSelect: true
	});
	$('.slider-main-cup').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav-cup'
	});
	$('.slider-nav-cup').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		asNavFor: '.slider-main-cup',
		arrows: false,
		centerMode: true,
		dots: false,
		focusOnSelect: true
	});

});
