


$(document).ready(function(){
  //initial fade in of mast head and header elements
  $(window).ready(function() {
    $('.masthead').fadeIn(2000);
    $('#masthead-subtext').fadeIn(5000);
    $("#developer").fadeIn(6000);
    $('.jumbotron').fadeIn(4000);
  });

  //scroll to projects from nav
  $("#project-scroll-link").click(function() {
    $('html, body').animate({
        scrollTop: $("#projects-section").offset().top
    }, 2000);
  });

  //scroll to technologies from nav
  $("#technology-scroll-link").click(function() {
    $('html, body').animate({
        scrollTop: $("#technology-section").offset().top
    }, 2000);
  });

  //scroll to background from nav
  $("#background-scroll-link").click(function() {
    $('html, body').animate({
        scrollTop: $("#background-section").offset().top
    }, 2000);
  });

  //scroll to contact from nav
  $("#contact-scroll-link").click(function() {
    $('html, body').animate({
        scrollTop: $("#contact-section").offset().top
    }, 2000);
  });

  $('.contact-option').click(function() {
    $(this).toggle('.contact-text');
  });



});
