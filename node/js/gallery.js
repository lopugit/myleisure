$('document').ready(function(){

	// MASONRY GALLERY SCRIPT FOR FORMATING
	var $grid = $('.gallery').masonry({
		itemSelector: '.img-holder',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});

	$grid.imagesLoaded().progress( function(){
		$grid.masonry();
	});

	window.onresize = rejigGallery();


	function rejigGallery(){
		var $grid = $('.gallery').masonry({
			itemSelector: '.img-holder',
			percentPosition: true,
			columnWidth: '.grid-sizer'
		});
		$grid.imagesLoaded().progress( function(){
			$grid.masonry();
		});
	}

	$('.gallery-modal .close-button').on('click', function(){
		if ($('.gallery-modal').hasClass('active')) {
			$('.gallery-modal').removeClass('active')
		} else {
			$('.gallery-modal').addClass('active')
		};
	});

	$('.gallery-modal .buttons-container>.left').on('click', function(){
		var gallery = $('.gallery-modal .inside-img-container img');
		var current = $('.gallery-modal .inside-img-container').find('.active');
		var btngallery = $('.gallery-modal .dots-container .dots .dot');
		var btncurrent = $('.gallery-modal .dots-container .dots').find('.active');
		if (gallery.first()[0] == current[0]) {
			current.addClass('vh');
			setTimeout(function () {
				current.addClass('hidden');
			}, 700);
			current.removeClass('active left right');
			gallery.last().removeClass('hidden vh');
			// gallery.last().removeClass('hidden vh-left vh-right');
			gallery.last().addClass('active left');

			btncurrent.removeClass('active');
			btngallery.last().addClass('active');
		} else {
			current.addClass('vh');
			setTimeout(function () {
				current.addClass('hidden');
			}, 700);

			current.removeClass('active left right');
			current.prev().removeClass('hidden vh');
			// current.prev().removeClass('hidden vh-left vh-right');
			current.prev().addClass('active left');

			btncurrent.removeClass('active');
			btncurrent.prev().addClass('active');

		}
	});
	$('.gallery-modal .buttons-container>.right').on('click', function(){
		var gallery = $('.gallery-modal .inside-img-container img');
		var current = $('.gallery-modal .inside-img-container').find('img.active');
		var btngallery = $('.gallery-modal .dots-container .dots .dot');
		var btncurrent = $('.gallery-modal .dots-container .dots').find('.active');
		if (gallery.last()[0] == current[0]) {
			// current.animate({opacity: 0, transform: 'translateX(-600%)'},1000,'ease');
			current.addClass('vh');
			setTimeout(function () {
				current.addClass('hidden');
			}, 700);
			current.removeClass('active left right');
			gallery.first().removeClass('hidden vh');
			// gallery.first().removeClass('hidden vh-left vh-right');
			gallery.first().addClass('active right');

			btncurrent.removeClass('active');
			btngallery.first().addClass('active');

		} else {
			current.addClass('vh');
			setTimeout(function () {
				current.addClass('hidden');
			}, 700);
			current.removeClass('active left right');
			current.next().removeClass('hidden vh');
			// current.next().removeClass('hidden vh-left vh-right');
			current.next().addClass('active right');

			btncurrent.removeClass('active');
			btncurrent.next().addClass('active');
		}
	});
});

function openGallery(wtf){
	var galleryModal = $('.gallery-modal');
	if (galleryModal.hasClass('active')) {
		galleryModal.removeClass('active')
	} else {
		galleryModal.addClass('active')
		var wtf = $(wtf);
		$('.gallery-modal .inside-img-container').find('.active').addClass('hidden');
		$('.gallery-modal .inside-img-container').find('.active').removeClass('active');
		$('.gallery-modal .inside-img-container').find('[data-url="' + wtf.data()['url'] + '"]').removeClass('hidden');
		$('.gallery-modal .inside-img-container').find('[data-url="' + wtf.data()['url'] + '"]').addClass('active left');

		$('.gallery-modal .dots-container .dots').find('.active').removeClass('active');
		$('.gallery-modal .dots-container .dots').find('[data-url="' + wtf.data()['url'] + '"]').removeClass('active');
		$('.gallery-modal .dots-container .dots').find('[data-url="' + wtf.data()['url'] + '"]').addClass('active');
	};
}

function changeImage(bro){
	var bro = $(bro);
	var parents = bro.parents();
	var activeDot = $('.gallery-modal .dots-container .dots').find('.active');
	var galleryImgs = $('.gallery-modal .inside-img-container');
	var current = $('.gallery-modal .inside-img-container').find('img.active');
	if (bro.hasClass('active')){
		//DO NOTHING
	} else {
		activeDot.removeClass('active');
		current.addClass('vh');
		setTimeout(function () {
			current.addClass('hidden');
		}, 400);
		bro.removeClass('hidden vh');
		// bro.removeClass('hidden vh-left vh-right');
		bro.addClass('active right');
		current.removeClass('active');
		var dataTag = bro.data()['url'];
		var img = galleryImgs.find('[data-url="' + dataTag + '"]');
		// img.removeClass('hidden vh-right vh-left');
		img.removeClass('hidden vh');
		img.addClass('active right');

	}
}

function filterImgTags(me){
	var galleryImgs = $('.gallery');
	var buttonTag = $(me).find("span")[0].textContent;
	var buttons = $('#gallery .button-container').find('.btn');
	for (var countt = 0; countt < buttons.length; countt++){
		buttons.eq(countt).removeClass('active');
	}

	$(me).addClass('active');
	var imgElements = galleryImgs.find('.img-holder');

	var count = 0;
	if (buttonTag == 'All'){
		for (var count = 0; count < imgElements.length; count++) {
			imgElements.eq(count).removeClass('hidden');
		}
	} else {
		for (var count = 0; count < imgElements.length; count++) {

			if (count >= imgElements.length) {
					break
			} else {

				var imgTagStr = imgElements[count]['attributes']['data-tag']['nodeValue'];

				if (imgTagStr.indexOf(buttonTag) !== -1) {
					imgElements.eq(count).removeClass('hidden');
				} else {
					imgElements.eq(count).addClass('hidden');
				}

			}
		}
	}
	rejigGallery();
}

function changeActiveGalleryButton(){
	var buttons = $('#gallery .button-container').find('.btn');
	for (var countt = 0; countt < buttons.length; countt++){
		buttons[countt].removeClass('active');
	}
}

function rejigGallery(){
	var $grid = $('.gallery').masonry({
		itemSelector: '.img-holder',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});
	$grid.imagesLoaded().progress( function(){
		$grid.masonry();
	});
}
