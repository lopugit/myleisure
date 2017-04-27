$(document).ready(function(){

  // Cache selectors
  var lastId,
      topMenu = $(".nav-main-menu"),
      sideMenu = $(".side-menu"),
      topMenuHeight = $('.flex-nav').outerHeight(),
      // All list items
      menuItems = topMenu.find("a"),
      sideMenuItems = sideMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      }),
      sideScrollItems = sideMenuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });
      console.log(topMenuHeight)


  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });  

  sideMenuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });  

  function changeActiveMenu() {
    var navHeight = $(".nav-main-menu").outerHeight(true);
    var fromTop = $(window).scrollTop()+navHeight;

    var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
    });
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    var curr = sideScrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
    });

    curr = curr[curr.length-1];
    var idd = curr && curr.length ? curr[0].id : "";

    if (lastId !== id) {
      lastId = idd;
      // Set/remove active class
      menuItems
       .parent().removeClass("active")
       .end().filter("[href='index#"+id+"']").parent().addClass(".active");
      console.log(idd);
      sideMenuItems
        .removeClass("active")
        .end().filter("[href='index#"+idd+"']").addClass(".active");
    };
  };
  changeActiveMenu();

  $(window).scroll(function(){    
    // var navHeight = $("#navmenu").outerHeight(true);
    // var fromTop = $(this).scrollTop()+navHeight; 
    changeActiveMenu();

    // changeSize();
    // setTimeout(changeSize,200);
    // setTimeout(function() {topMenuHeight = topMenu.outerHeight()},150);
    

  });


  (function() {
  'use strict';

  var section = document.querySelectorAll("section");
  var sections = {};
  var i = 0;

  Array.prototype.forEach.call(section, function(e) {
    sections[e.id] = e.offsetTop;
  });
  var smenu = $(".side-menu");
  var smenuitems = smenu.find("a");
  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    for (i in sections) {
      if (sections[i] <= scrollPosition) & () {
        console.log(i);
        smenuitems.removeClass("active")
        .end().filter("[href='index#"+i+"']").addClass(".active")
        ;
      }
    }
  };
})();




});