$(document).ready(function(){


});

function selectframe(frame){

  var choiceContainer = $(frame).parent().closest('div');
  // var numberOfChoices = $(choiceContainer).data('numberOfChoices');
  if($(frame).hasClass('selected')) {
    $(choiceContainer).find('.choice-box').each(function(){
      if (this.id !== frame.id) {
        $(this).removeClass('unselected');
      } else {
        $(this).removeClass('selected');
        $(this).find('.next-link').removeClass('show');
      }
    })

  } else {

    $(choiceContainer).find('.choice-box').each(function(){
      if (this.id !== frame.id) {
        $(this).addClass('unselected');
      } else {
        $(this).addClass('selected');
        $(this).find('.next-link').addClass('show');
        // $(this).find('.next-link').removeClass(hidden);
      }
    })

  }

};
