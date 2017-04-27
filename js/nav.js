$('document').ready(function(){

	// // NAVBAR STUFF
	// $(document).scroll(function(){
	// 	if ($(window).scrollTop() > 1) {
	// 		$('nav').addClass('nav-collapsed');
	// 	} else {
	// 		$('nav').removeClass('nav-collapsed');
	// 	}
	// });

	$('.nav-menu .close-icon').on('click', function(){
		changeNavMenu();
	});

	$('.menu-subheading, .nav-main-menu-button').on('click', function(){
		changeNavMenu();
	});

	function changeNavMenu(){
		if ($('.nav-menu').hasClass('active')) {
			$('.nav-menu').removeClass('active');
			$('.nav-menu').addClass('closed');
		} else {
			$('.nav-menu').removeClass('closed');
			$('.nav-menu').addClass('active');
		};
	};

	function closeNavMenu(){
		if ($('.nav-menu').hasClass('active')) {
			$('.nav-menu').removeClass('active');
			$('.nav-menu').addClass('closed');
		} else {
		};
	};

	$(document).on('click', function(evt) {
	  if(
			(!$(evt.target).closest('.nav-menu').length)
			&&
			(!$(evt.target).closest('.nav-hamburger-button').length)
			&&
			(!$(evt.target).closest('.js-prevent-cart-listener').length)
		) {
		closeNavMenu();
	  }
	});
});
