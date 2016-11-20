$(function(){
  var app = {};
  app = {
    init: function(){
        $('.close-msg').click(app.closeMsg)
        $('body').on('change', '.checkboxed input', function(){
            if($(this).attr('type') == 'checkbox')
              app.checkboxed(this);
            else
              app.radioed(this);
        });
        $('select.selectized').selectize();
        $('select.selectized-multi').each(function(){
          var $this = $(this).selectize({
            maxItems: null,
            onChange: function(e){
              app.checkReset(e, $this[0].selectize);
            }
          });
        });
        
        $('.modal-auth input').on('blur', app.checkAuthFormInputs);
        app.accordionHeadingClass();

        if($(document).width() > 1024 && $('.vacancy-meta-wrapper').length > 0 ){
          $('.vacancy-meta-wrapper').affix({
            offset: {
              top: $('.vacancy-meta-wrapper').offset().top + 67 - $('header').height(),
              bottom: document.documentElement.offsetHeight - $('.job-details').offset().top - $('.job-details').height()
            }
          }).on('affix.bs.affix', function(){
            $(this).width($(this).width());
          }).on('affix-top.bs.affix', function(){
            $(this).removeAttr('style');
          });
        }
        app.showMsg('.global-msg')

        // $('header').on('affixed.bs.affix', function(){
        //   $('body').css('padding-top', $('header').height());
        // }).on('affix-top.bs.affix', function(){
        //   $('body').css('padding-top', 0);
        // });

        $('body').on('click', '.disabled-jobs .label', function(){
          return false;
        });

        enquire.register("screen and (max-width: 1015px)", {

          deferSetup : true,
          match : function() {
            $('.job-details .vacancy-meta-wrapper').insertBefore($('.vp-apply').eq(0));
            $('.job-details .vacancy-meta-wrapper').removeAttr('class').addClass('vacancy-meta-wrapper');
          },
          unmatch : function() {
            $('.job-details .list-right-block').append($('.job-details .vacancy-meta-wrapper'));
          }  

        });

        $('.top-filter-toggle').click(function(e){
          e.preventDefault();
          app.toggleTopFilter();
        });

        var $document = $(document), scrTop;

        var waypoint = new Waypoint({
            element: $('.top-filter'),
            handler: function(direction) {
              console.log(direction);
              if(direction == 'up'){
                if($('.top-filter-wrapper').length){
                  $('.top-filter').parent().css('transform', 'translateY(0px)')
                }
                app.toggleTopFilter('hide');
              }else{
                //$('.top-filter-toggle').css('transform', 'translateY('+ parseInt($('header').height()) +'px)')
              }
            }
        });

        // $(window).on('resize', function(){
        //   if($('.top-filter').hasClass('in')){
        //     $('.top-filter-toggle').css('transform', 'translateY('+ ( parseInt($('.top-filter').position().top) + parseInt($('.top-filter').height()) ) +'px)')
        //   }
        // });

        
    },
    toggleTopFilter: function(event){
      var $filter = $('.top-filter'),
          $this = $('.top-filter-toggle');
      if($('.top-filter-wrapper').length || event == 'hide'){
        $filter.parent().removeClass('in');
        $this.removeClass('active').removeAttr('style');
        $this.css('transform', 'translateY('+ parseInt($('header').height()) +'px)')
        setTimeout(function(){
          $filter.unwrap('.mobile-filter').unwrap('.top-filter-wrapper');
          $filter.removeAttr('style');
        },300)
      }else{
        $filter.wrap('<div class="top-filter-wrapper"><div class="mobile-filter"></div></div>');
        setTimeout(function(){
          $filter.parent().addClass('in');
          $this.addClass('active');
          // $this.css('transform', 'translateY('+ ( parseInt(88) + parseInt($('.top-filter').height()) ) +'px)')
        },10)
      }
    },
    checkReset: function(array, el){
      if(array.indexOf('reset') >= 0){
        el.clear(true);
        el.close();
        el.blur();
      }
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
    },
    showMsg: function(msg){
        $(msg).slideDown(500);
        setTimeout(function(){
            $(msg).find('table').animate({
                opacity: 1
            },350)
        },150)
    },
    closeMsg: function(){
        $(this).parent().slideUp();
        $(this).parent().find('table').animate({
            opacity: 0
        },350)
        return false;
    }
  }
  app.init();
});