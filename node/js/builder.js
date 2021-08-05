$('document').ready(function(){


});

function selectFrame(frame){

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
    $('.frame-option-container').removeClass('done');
    $('.colour-option-container').removeClass('active');
    document.getElementById('instruction').innerHTML = "to begin, choose a frame"

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

    $('.frame-option-container').addClass('done');
    $('.colour-option-container').addClass('active');
    document.getElementById('instruction').innerHTML = "now select a fabric colour";

    $('#colours').find('.colour-container').each(function(){
      console.log(this);
      if(this.id !== frame.id){
        $(this).addClass('hidden')
      } else {
        $(this).removeClass('hidden')
      }
    })
  }


};
