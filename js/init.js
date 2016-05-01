/* ==================================================
//  ____  _     _   _            _   _          _____ _                              
// |  _ \(_)___| |_(_)_ __   ___| |_(_)_   ____|_   _| |__   ___ _ __ ___   ___  ___ 
// | | | | / __| __| | '_ \ / __| __| \ \ / / _ \| | | '_ \ / _ \ '_ ` _ \ / _ \/ __|
// | |_| | \__ \ |_| | | | | (__| |_| |\ V /  __/| | | | | |  __/ | | | | |  __/\__ \
// |____/|_|___/\__|_|_| |_|\___|\__|_| \_/ \___||_| |_| |_|\___|_| |_| |_|\___||___/
//
/* ==================================================*/

/*-----------------------------------------------------------------------------------*/
/*  DOCUMENT READY
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	"use strict";

	// FULLSCREEN DIVS //
    var windowHeight = $(window).innerHeight();
    var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if( !isMobileDevice ) {
        $('.fullheight').css('height', windowHeight);
        $(window).resize(function() {
            $('.fullheight').css('height', windowHeight);
        });
    }

    // SEARCH //
    $('a[href="#search"]').on('click', function(event) {
        event.preventDefault();
        $('#search-wrapper').addClass('open');
        $('#search-wrapper > form > input[type="search"]').focus();
    });
    $('#search-wrapper, #search-wrapper button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    })
    // ANIMATE ONCE PAGE LOAD IS OVER //
    Pace.on("done", function(){
		new WOW().init();
        $(window).trigger('resize');
    });

    // OWL //
 	$('.owl-carousel').owlCarousel({
      navigation: false,
      pagination: false,
      navigationText: [
      "<i class='pe-7s-angle-left'></i>",
      "<i class='pe-7s-angle-right'></i>"
      ], 
      autoPlay: 8000,
      loop: true,
      
        afterAction: function(el){
           //remove class active
           this
           .$owlItems
           .removeClass('active')
          
           //add class active
           this
           .$owlItems //owl internal $ object containing items
           .eq(this.currentItem + 1)
           .addClass('active')
          
         }
    });

    $('.owl-carousel-paged').owlCarousel({
      navigation: false,
      pagination: true,
      autoPlay: 8000,
      loop: true
    });

	$('.vertical-center').flexVerticalCenter({ cssAttribute: 'padding-top' });

	$(".home-slider").owlCarousel({
        pagination : true,
        singleItem: true,
        animationStyle: 'goDown',
        autoPlay: true,
        items : 1,
        itemsDesktop : [1199,1],
        itemsTablet: [768,1],
        itemsMobile : [479,1]
 	});

    var owl = $(".home-slider");

    var offset = $('.navbar').outerHeight();
    var offsetDiv = $('#header-offset');
    $(offsetDiv).css({ height: offset });

    $(function(){
    var shrinkHeader = 300;
      $(window).scroll(function() {
        var scroll = getCurrentScroll();
          if ( scroll >= shrinkHeader ) {
               $('.navbar').addClass('shrink');
            }
            else {
                $('.navbar').removeClass('shrink');
            }
      });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
        }
    });

    $('.lb-link').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      gallery:{           /*remove this if doesn't work*/
      enabled:true
      }
    });
  
    $('.navbar-nav > li.dropdown').hover(function() {
      $('ul.dropdown-menu', this).stop(true, true).slideDown('fast');
      $(this).addClass('open');
        }, function() {
      $('ul.dropdown-menu', this).stop(true, true).slideUp('fast');
      $(this).removeClass('open');
    });
});

/*-----------------------------------------------------------------------------------*/
/*  WINDOW LOADED
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function() {
	"use strict";

	jQuery(window).trigger('resize');
  
  	jQuery('a:not([target="_blank"]):not([href*=#]):not([href^=mailto]):not(.fancybox-media):not(.btn.responsive-menu):not(a[href$="jpg"]):not([href$="jpeg"]):not(a[href$="gif"]):not(a[href$="png"]):not(a.ajax-link)').click(function(){
		var href = jQuery(this).attr('href');
		jQuery('.preloader').fadeIn(200);
		setTimeout(function(){
		  window.location = href;
		}, 200);
		return false;	 
	})

	var portfolio_selectors = $('.portfolio-filter li a');

    if(portfolio_selectors!='undefined'){
        var portfolio = $('.portfolio-items');
        portfolio.imagesLoaded( function(){
             portfolio.isotope({
                itemSelector : 'li',
                layoutMode : 'fitRows'
            });
        });

        portfolio_selectors.on('click', function(e){
            e.preventDefault();
            portfolio_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            portfolio.isotope({ filter: selector });
            return false;
        });
    }

    var boxed_portfolio_selectors = $('.boxed-portfolio-filter li a');

    if(boxed_portfolio_selectors!='undefined'){
        var boxed_portfolio = $('.boxed-portfolio-items');
        boxed_portfolio.imagesLoaded( function(){
             boxed_portfolio.isotope({
                itemSelector : 'li',
                layoutMode : 'fitRows'
            });
        });

        boxed_portfolio_selectors.on('click', function(e){
            e.preventDefault();
            boxed_portfolio_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            boxed_portfolio.isotope({ filter: selector });
            return false;
        });
    }

    var masonry_portfolio_selectors = $('.masonry-portfolio-filter li a');
    var masonry_container = $('.masonry-portfolio');

    if(masonry_portfolio_selectors!='undefined'){
        var masonry_portfolio = $('.masonry-portfolio-items');
        masonry_portfolio.imagesLoaded( function(){
             masonry_portfolio.isotope({
                itemSelector: '.masonry-portfolio-item',
                masonry: {
                  columnWidth: masonry_container.width() / 3
                }
            });
        });

        masonry_portfolio_selectors.on('click', function(e){
            e.preventDefault();
            masonry_portfolio_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            masonry_portfolio.isotope({ filter: selector });
            return false;
        });
    }

});