$('document').ready(function(){

  console.log('oo yeah');

  $('#adminPanel .tag').click(function(){
    var aP = $('#adminPanel');

    if (aP.hasClass('inactive')) {
      aP.removeClass('inactive');
      aP.addClass('active');
    }
    if ($('#adminPanel .tag').hasClass('active')) {
      $('#adminPanel .tag').removeClass('active');
      $('#adminPanel .tag').addClass('inactive');
    }
  })

  $('#adminPanel .close-button, #content').click(function(){
    console.log('oo yeah');
    $('#adminPanel').removeClass('active');
    $('#adminPanel').addClass('inactive');
    $('#adminPanel .tag').removeClass('inactive');
    $('#adminPanel .tag').addClass('active');

  })



})

function addBlog(subMenu){

}

function showAllBlogs(subMenu){

}



function showAllChildren(subMenu){
  $(subMenu).parent().closest('.sub-menu').find('.content').toggleClass('active')
}

function hideNav(){
  console.log("really");
  $('body').find('#navbar').toggleClass('hidden')
}

// $(function(){
var socket = io.connect('http://localhost:3002');
// })

socket.on('blog form', function(html){
  console.log(html);
  $('#editor').empty();
  setTimeout(function(){
    $('#editor').append(html)
  }, 10);
  setTimeout(function(){
    var editorLazyLoad = new LazyLoad()
  }, 20)
})



function editThisBlog(blog){
  console.log($(blog).data('id'));
  var blogId = $(blog).data('id');
  socket.emit('edit blog', blogId)

}
