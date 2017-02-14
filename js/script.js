// *************************************
//
// Author: Sebastian Thaler
// Email: sebi.thaler@gmail.com
//
// *************************************

/*globals $, jQuery */

// ---------------------------
// Foundation Configuration
// ---------------------------

$(document).foundation();

// ---------------------------
// jQuery document ready
// ---------------------------

$(document).ready(function () {
    
    "use strict";
    
    // --------------------------------
    // Menu shrink on scrolling
    // --------------------------------
    
    // caches a jQuery object containing the navContainer element
    var navContainer = $('.nav-container');

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 500) {
            navContainer.addClass('not-top');
        } else {
            navContainer.removeClass('not-top');
        }
    });
    
    // --------------------------------
    // Menu Toggle
    // --------------------------------
    
    $('.top-nav-toggle a').click(function () {
        $('.top-nav-right').toggleClass('active');
    });
    
    // close menu after item click
    $('.top-nav-right a').click(function () {
        $('.top-nav-right').removeClass('active');
    });
    
    // --------------------------------
    // Scroll to Anchor
    // --------------------------------
    
    $('a[href*=\\#]:not([href=\\#])').bind('click', function (event) {
        if ($(this).attr('href').toLowerCase().indexOf('#') >= 0) {
            event.preventDefault();
            
            // setTimeout -> open menu fix
            // if link is in menu on mobile -> wait till menu is closed
            setTimeout($.proxy(function () {
                var anchor = $(this);
                var offset = 70;
                var currentScroll = $(anchor.attr('href')).offset().top;
                var bottomScroll = $(document).height() - $(window).height();
                
                if ($('.nav-spaceholder').css('display') == 'none') {
                    offset = 0;
                }
                
                if (currentScroll > bottomScroll) {
                    currentScroll = bottomScroll;
                    offset = 0;
                }
                
                if (anchor.attr('href') == '#top') {
                    offset = 0;
                }
                
                $('html, body').stop().animate({
                    scrollTop: (currentScroll - offset)
                }, 1500, 'easeInOutExpo');
            }, this), 50);
        }
    });
    
    // --------------------------------
    // Image Slider
    // --------------------------------
    
    var imgSlider = $("#img-slide");

    imgSlider.owlCarousel({
        pagination: true,
        singleItem: true,
        transitionStyle: "fade",
        mouseDrag: false,
        touchDrag: false,
        autoPlay: 5000
    });
    
    // --------------------------------
    // Room Navigation
    // --------------------------------
    
    var roomImgSlider = $("#room-imgs");

    roomImgSlider.owlCarousel({
        pagination: false,
        singleItem: true,
        transitionStyle: "fade",
        mouseDrag: false,
        touchDrag: false,
        afterAction: afterAction
    });

    // custom navigation events
    $('[data-roomid]').click(function () {
        roomImgSlider.trigger('owl.goTo', $(this).data("roomid"));
    });
    
    // style the active navigation item
    function afterAction() {
        $('.room-select').removeClass('active');
        $('[data-roomid="' + this.owl.currentItem + '"]').addClass('active');
    }
    
    // --------------------------------
    // Google Maps
    // --------------------------------
    
    var map = new Maplace({
        map_div: '#contact-map',
        locations: [{
            lat: 46.695466,
            lon: 12.804584,
            show_infowindow: false
        }],
        map_options: {
            zoom: 15,
            scrollwheel: false,
            mapTypeControl: false
        },
        styles: {
            'Flat Green': [
                {"stylers":[{"hue":"#bbff00"},{"weight":0.5},{"gamma":0.5}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","stylers":[{"color":"#a4cc48"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":1}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"},{"gamma":1.14},{"saturation":-18}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"saturation":30},{"gamma":0.76}]},{"featureType":"road.local","stylers":[{"visibility":"simplified"},{"weight":0.4},{"lightness":-8}]},{"featureType":"water","stylers":[{"color":"#4aaecc"}]},{"featureType":"landscape.man_made","stylers":[{"color":"#718e32"}]},{"featureType":"poi.business","stylers":[{"saturation":68},{"lightness":-61}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"weight":2.7},{"color":"#f4f9e8"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"weight":1.5},{"color":"#e53013"},{"saturation":-42},{"lightness":28}]}
            ]
        }
    }).Load();
    
    // --------------------------------
    // Scroll Reveal
    // --------------------------------
    
    window.sr = ScrollReveal({
        mobile: false,
        distance: '30px',
        duration: 3000,
        delay: 0,
        opacity: 0,
        scale: 1,
        easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
    });
    
    sr.reveal('.sr-fade', {
        distance: '0',
        scale: 0.95
    });
    
    $('.sr-sequence').each(function (index) {
        $(this).addClass('sr-sequence-' + index);
        
        sr.reveal('.sr-sequence-' + index + ' .columns', {
            origin: 'bottom',
        }, 400);
    });
    
});