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
        $('select.selectized').selectize({
            valueField: 'name',
            labelField: 'name',
            searchField: ['name']
        });
        $('.modal-auth input').on('blur', app.checkAuthFormInputs);
        app.accordionHeadingClass();
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
        if($('.profile-form').length > 0 && $('.subscr-price').length > 0){
          console.log($(el).parent().siblings('.subscr-price'));
          $('.subscr-price').removeClass('black');
          $(el).parent().siblings('.subscr-price').addClass('black')
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