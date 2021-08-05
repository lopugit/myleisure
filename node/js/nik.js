$('document').ready(function(){

	var myLazyLoad = new LazyLoad({
		callback_processed: function(){
			$(window).trigger('scroll');
		}
	});

	var slideList = ['showcase_shrunk'];
	var slideCount = 0;
	var parallaxSlideSectionLink = '#show-case-gallery .buttons-container';
	function setSlideImg(imgurl){
		$('#show-case-gallery .parallax-sci').parallax({imageSrc: 'img/slide_gal/'+imgurl+'.jpg', naturalWidth: '100%', speed: 0.3, iosFix: true});
	};

	setSlideImg(slideList[slideCount]);

	$(window).resize(changeProductHeight);
	changeProductHeight();


	function changeProductHeight() {
		var cw = $('.chair-1').width();
		$('.chair-1').css({'height':cw+'px'});
	};

	$('#play-fold-video').on('click', function(ev) {

		$("#fold-video")[0].src += "?autoplay=1";
		ev.preventDefault();

	});

	// var targetOffset = $("#configurator").offset().top;
	// console.log(targetOffset);
	// // $(window).resize(function(){
	// // 	var targetOffset = $("#configurator").offset().top;
	// // });
	// var $w = $(window).scroll(function(){
	// 	console.log($w.scrollTop());
	//     if ( $w.scrollTop() > targetOffset ) {
	//         $('#configurator').css({"position":"fixed !important"});
	//     } else {
	//       // ...
	//     }
	// });

	// var targetOffset = $("#LettiniBuilder").offset().top;
	// $(window).on('scroll', function () {
	// 	if (targetOffset !== $("#LettiniBuilder").offset().top) {
	// 		targetOffset = $("#LettiniBuilder").offset().top;
	// 	}
	// 	console.log(targetOffset);
	//     var scrollPos = $(document).scrollTop();
	// 	console.log(scrollPos);
	// 	// $('.configurator').css({
    //     // 	top: scrollPos - targetOffset - 175
    // 	// });
	// 	$('.configurator').velocity({
    //     	top: scrollPos - targetOffset - 175
    // 	});
	// }).scroll();

	//IMG LOADING STUFF
	// $("img").unveil(50);

	//some js timer plugin
	// $(".fs-splash-landing #countdown")
 //  		.countdown("2017/01/08", function(event) {
	// 		$(this).find(".time").text(
    //   			event.strftime('%D %H %M ')
    // 		);
	// 		$(this).find(".seconds").text(
    //   			event.strftime(' %S')
    // 		);
	//
	//
	//
	//
 //  		});
	// var time = countdown(new Date(2017, 1, 17));
	// time = (((time.days * 24) + time.hours) * 60 * 60) + (time.minutes * 60) + time.seconds;
	// var clock = $('.fs-splash-landing .countdown').FlipClock(time, {
	// 	clockFace: 'DailyCounter',
 // 		countdown: true	});
});
