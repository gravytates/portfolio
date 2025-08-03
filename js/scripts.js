
var _isOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/);

if (_isOS) {
  $('body').addClass('is-os');
}

$(document).ready(function(){
  //initial fade in of mast head and header elements
  // $(window).ready(function() {
  //   $('.masthead').fadeIn(500);
  //   $("#developer").fadeIn(800);
  // });



  //scroll to projects from nav
  $("#project-scroll-link").click(function() {
    $('html, body').animate({
        scrollTop: $(".projects").offset().top
    }, 2000);
  });

  //scroll to technologies from nav
  $("#technology-scroll-link").click(function() {
    $('html, body').animate({
        scrollTop: $(".technologies").offset().top
    }, 2000);
  });

  //scroll to background from nav
  $("#background-scroll-link").click(function() {
    $('html, body').animate({
        scrollTop: $(".background").offset().top
    }, 2000);
  });

  //scroll to connect from nav
  $("#connect-scroll-link").click(function() {
    $('html, body').animate({
        scrollTop: $(".connect").offset().top
    }, 2000);
  });

  // show and hide connect information upon hover
  $('.connect-option').hover(function() {
       $(this).children('.connect-text').slideToggle();
    });

  // show and hide project details upon hover
  $('.project-screen').hover(function() {
    $(this).children('.project-details').slideToggle();
  });

  // show and hide project details upon tab
  $('.project-screen').focusin(function() {
    $(this).children('.project-details').slideDown();
  });

  // show and hide project details upon click
  $('.project-screen').click(function() {
      $(this).children('.project-details').slideDown();
  });

  // separate function for university api due to it's header element

  $('#universityapi').hover(function() {
    $('#university-api-title').slideToggle();
    $(this).children('.university-details').slideToggle();
  });
});
