$(function ($) {
  "use strict";

  jQuery(document).ready(function () {

    // preloader
    $("#preloader").delay(300).animate({
      "opacity": "0"
    }, 500, function () {
      $("#preloader").css("display", "none");
    });

    // Scroll Top
    var ScrollTop = $(".scrollToTop");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 500) {
        ScrollTop.removeClass("active");
      } else {
        ScrollTop.addClass("active");
      }
    });
    $('.scrollToTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      return false;
    });

    // Navbar Dropdown
    var dropdown_menu = $(".header-section .dropdown-menu");
    $(window).resize(function () {
      if ($(window).width() < 992) {
        dropdown_menu.removeClass('show');
      }
      else {
        dropdown_menu.addClass('show');
      }
    });
    if ($(window).width() < 992) {
      dropdown_menu.removeClass('show');
    }
    else {
      dropdown_menu.addClass('show');
    }

    // Autocomplete off
    $('input[type=text]').attr('autocomplete','off');

    // Sticky Header
    var fixed_top = $(".header-section");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 50) {
        fixed_top.addClass("animated fadeInDown header-fixed");
      }
      else {
        fixed_top.removeClass("animated fadeInDown header-fixed");
      }
    });

    // Nav Active btn
    var navActive = $(".nav-item .nav-link");
    $(navActive).on('click', function () {
      $(navActive).removeClass('active');
      $(this).addClass('active');
    });

    // color switch btn
    var switchWrapper = $(".switch_wrapper");
    var switchBtn = $(".switch_wrapper button");
    $(switchWrapper).on('click', function () {
      $(this).toggleClass('light');
      $(switchBtn).toggleClass('active');
      $('body').toggleClass('dark');
    });







    // form validation
      $("#frmContactus").validate({
          rules: {
              name: {
                  required: true,
                  minlength: 2
              },
              subject: {
                  required: true,
              },
              message: {
                  required: true,
                  minlength: 5
              },
              email: {
                  required: true,
                  email: true
              }
          },
          messages: {
              name: {
                  minlength: "Name should be at least 2 characters"
              },
              message: {
                  number: "Offer should be at least 5 characters"
              }
          }
      });

      // ajax
      jQuery('#frmContactus').on('submit',function(e){
          jQuery('#msg').html('');
          jQuery('#submit').html('Please wait....');
          jQuery('#submit').attr('disabled',true);
          jQuery.ajax({
              url:'mail.php',
              type:'POST',
              data:jQuery('#frmContactus').serialize(),
              success:function(result){
                  jQuery('#msg').html(result);
                  jQuery('#submit').html('Send Message');
                  jQuery('#submit').attr('disabled',false);
                  jQuery('#frmContactus')[0].reset();

                  setTimeout(function () {
                      $('.alert-dismissible').fadeOut('slow', function(){
                          $(this).remove();
                      });
                  }, 3000);
              }
          });
          e.preventDefault();
      });
      
      // Email Subscribe
      jQuery('#frmSubscribe').on('submit',function(e){
          var emailSubscribe = jQuery("input[name='sMail']").val();
          jQuery('#subscribeMsg').html('');
          jQuery('#emailSubscribe').html('Please wait....');
          jQuery('#emailSubscribe').attr('disabled',true);
          jQuery.ajax({
              url:'mail.php',
              type:'POST',
              data: {
                  'subscribes': '',
                  'emailSubscribe': emailSubscribe
              },
              success:function(result){
                  jQuery('#subscribeMsg').html(result);
                  jQuery('#emailSubscribe').html('Subscribe');
                  jQuery('#emailSubscribe').attr('disabled',false);
                  jQuery('#frmSubscribe')[0].reset();

                  setTimeout(function () {
                      $('.alert-dismissible').fadeOut('slow', function(){
                          $(this).remove();
                      });
                  }, 3000);
              }
          });
          e.preventDefault();
      });






  });
});