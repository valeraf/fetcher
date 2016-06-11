$(function(){
  var app = {};
  app = {
    init: function(){
        $('body').on('change', '.checkboxed input', function(){
            if($(this).attr('type') == 'checkbox')
              app.checkboxed(this);
            else
              app.radioed(this);
        });
        $('select.selectized').selectize();
        $('select.selectized-multi').selectize({
          maxItems: null
        });
        $('.modal-auth input').on('blur', app.checkAuthFormInputs);
        app.accordionHeadingClass();

        if($(document).width() > 640 && $('.vacancy-meta-wrapper').length > 0 ){
          $('.vacancy-meta-wrapper').affix({
            offset: {
              top: $('.vacancy-meta-wrapper').offset().top + 67 - $('header').height(),
              bottom: 1500
            }
          }).on('affix.bs.affix', function(){
            $(this).width($(this).width());
          }).on('affix-top.bs.affix', function(){
            $(this).removeAttr('style');
          });
        }

        $('header').on('affixed.bs.affix', function(){
          $('body').css('padding-top', $('header').height());
        }).on('affix-top.bs.affix', function(){
          $('body').css('padding-top', 0);
        });

        $('body').on('click', '.disabled-jobs .label', function(){
          return false;
        });
    },
    checkboxed: function(el){
        $(el).parent().removeClass('checked');
        if($(el).is(':checked')){
          $(el).parent().addClass('checked');
        }
    },
    radioed: function(el){
      var name = $(el).attr('name');
      $('input[name='+ name +']').parent().removeClass('checked');
      if($(el).is(':checked')){
        $(el).parent().addClass('checked');
        if($('.profile-form').length > 0 && $('.who-wrapper').length > 0){
          $('.who-wrapper').removeClass('checked-box');
          $(el).parents('.who-wrapper').addClass('checked-box');
        }
      }
    },
    checkAuthFormInputs: function(){
      var i = 0;
      $('.modal-auth input').each(function(){
        if($(this).val().length > 0){
          i++;
        }
        if(i ==$('.modal-auth input').length){
          $('.btn-disabled', '.modal-auth').removeClass('btn-disabled').removeAttr('disabled');
        }else{
          $('.auth-btn', '.modal-auth').addClass('btn-disabled').attr('disabled','disabled');
        }
      });
    },
    accordionHeadingClass: function(){
      $('#acc-func').on('hide.bs.collapse', function (e) {
          $(e.target).prev().removeClass('active');
      }).on('show.bs.collapse', function (e) {
          $(e.target).prev().addClass('active');
      });
    }
  }
  app.init();
});