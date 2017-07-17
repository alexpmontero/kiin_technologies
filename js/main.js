$(document).ready(function () {
  'use strict';


// ============
//    idiomas
// ==============

  // $(".es").click(function(event) {
  //   /* Act on the event */
  //   alert("Idioma español");
  // });

  // $(".en").click(function(event) {
  //   /* Act on the event */
  //   alert("Idioma Ing");
  // });

  $('a.internal-link:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  /* ========================================================================
     Fullscreen burger menu
   ========================================================================== */
  $(".menu-trigger, .mobilenav").click(function () {
    $(".mobilenav").fadeToggle(500);
  });
  $(".menu-trigger, .mobilenav").click(function () {
    $(".top-menu").toggleClass("top-animate");
    $(".mid-menu").toggleClass("mid-animate");
    $(".bottom-menu").toggleClass("bottom-animate");
  });

  /* ========================================================================
     On click menu item animate to the section
   ========================================================================== */
  $(".mobilenav li, .back-to-top").on('click', function() {
    var target = $(this).data('rel');
    var $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 900, 'swing');
  });

  /* Header Height Control
   ========================================================================== */
  var height = $(window).height();
  if(height<600) {
    height = 600;
  }
  $('header').css({
    'minHeight': 0,
    'maxHeight': 'none',
    'height': height
  });
  /* ========================================================================
   Header carousel
   ========================================================================== */
  $('.carousel').carousel({
    interval: 50000
  })

  /* ========================================================================
     Wow Animation
   ========================================================================== */
  var wow = new WOW({
    mobile: false
  });
  wow.init();

  /* ========================================================================
     Collapse event
   ========================================================================== */
  $('.panel-collapse').on('shown.bs.collapse', function () {
   $(this).parent().find(".state").html('<strong>-</strong>');
  });

  $('.panel-collapse').on('hidden.bs.collapse', function () {
    $(this).parent().find(".state").html('<strong>+</strong>');
  });

  /* ========================================================================
     Animated Skill Bar
   ========================================================================== */
  $('.skill-bar li').each(function (i) {
    $(this).appear(function() {
      $(this).animate({opacity:1,left:"0px"},1200);
      var b = $(this).find(".wrapper span").attr("data-width");
      $(this).find("span").animate({
      width: b + "%"
      }, 1700, "swing");
    });
  });





  /* ========================================================================
     Nivo Lightbox
   ========================================================================== */
  $('.portfolio a').nivoLightbox({
    effect: 'fall'
  });



  /* ========================================================================
    Portfolio Filter
   ========================================================================== */
  var container = $('.portfolio-wrapper'); // portfoolio container

  container.isotope({
      itemSelector: '.portfolio-item',
      animationEngine: 'best-available',
      animationOptions: {
          duration: 200,
          queue: false
      },
      layoutMode: 'fitRows'
  });

  // sort items on button click
  $('.filters a').on( 'click', function() {
    $('.filters a').removeClass('active');
    $(this).addClass('active');
    var filterValue = $(this).attr('data-filter');
    container.isotope({
      filter: filterValue
    });
    initIsotope();
    return false;
  });

  // Split columns for different size layout
  function splitColumns() {
      var windowWidth = $(window).width(),
      columnNumber = 1; //  default column number
      if (windowWidth > 1200) {
          columnNumber = 4;
      } else if (windowWidth > 767) {
          columnNumber = 3;
      } else if (windowWidth > 600) {
          columnNumber = 2;
      }
      return columnNumber;
  }
  // Set width for portfolio item
  function setColumns() {
    var windowWidth = $(window).width(),
        columnNumber = splitColumns(),
        postWidth = Math.floor(windowWidth / columnNumber);

    // container.find('.portfolio-item').each(function() {
    //     $(this).css({
    //         width: postWidth + 'px'
    //     });
    // });
  }
  // initialize isotope
  function initIsotope() {
      setColumns();
      container.isotope('layout');
  }
  container.imagesLoaded(function() {
      setColumns();
  });
  $(window).bind('resize', function() {
      initIsotope();
  });
  $(window).load(function(){
    initIsotope();
  });



  /* ========================================================================
     Contacto Formulario
   ========================================================================== */
    // configuracion toastr
  toastr.options = {   
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true  
  }

   
  $("#formulario_kiin").validate({
    submitHandler: function () {

      var $this = $('#formulario_kiin');
      
      toastr.info("Enviando...");

          // obtener datos del formulario
          var inputs = $this.serializeArray();
          var objData = {};

          for (var i = 0; i < inputs.length; i++) {
              objData[inputs[i].name] = inputs[i].value;
          };

          $.ajax({
              type : "POST",
              url : "sendmail.php",
              data : objData
          })
          .done(function(data){
          toastr.success("Enviado");


              $this.find('input[type="text"]').val('');
              $this.find('input[type="email"]').val('');
              $this.find('textarea').val('');
          })
          .fail(function(data){
              $this.find('.text-warncing').text(data);  
          
          toastr.warning("Error de envío");       

          });
    
      return false;
    },
    rules: {
      nombre: "required",
      asunto: "required",
      mensaje: "required",
      correo: {
        required: true,
        email: true
      },  
    },
    messages: {
      nombre: "Este campo es requerido",
      asunto: "Este campo es requerido",
      mensaje: "Este campo es requerido",
      correo: {
        required: "Este campo es requerido",
        email: "Introduzca una dirección de correo electrónica válida"
      }
    },
      onkeyup: false,
      onclick: false,
      onfocusout : false
  }); 




});