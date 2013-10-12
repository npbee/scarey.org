window.scarey = window.scarey || {};


//Breakpoints
scarey.medium = "screen and (min-width: 45em)";
scarey.large = "screen and (min-width: 90em)";



/* -----------------------------------------------
FASTCLICK
------------------------------------------------ */
//Enable fastclick only if not on desktop device
scarey.fastclick =  {
    init: function() {
        if ( matchMedia(scarey.large).matches ) {
            return
        } else {
            scarey.fastclick.go();
        }
    },
    go: function() {
        $.getScript('/assets/js/libs/fastClick.js', function() {
                FastClick.attach(document.body);
            });
    }
};



/* -----------------------------------------------
SMOOTH SCROLLING
------------------------------------------------ */
scarey.scroll = function(target) {
    $.scrollTo(
        $(target),
        1000,
        {
            easing: 'easeInOutExpo',
            axis: 'y', //setting the axis seems to avoid flickering on iOS
            onAfter: function() {
                history.pushState(null, null, target);
            }
        }
    );

};



/* -----------------------------------------------
MOBILE FLYOUT
------------------------------------------------ */
scarey.nav = function() {
    var topNav = $("#nav"),
          flyOut = $("#mobile-flyout");

    $(".more-nav").click(function() {
        if ( flyOut.hasClass("slide-in")) {
            flyOut.removeClass("slide-in").addClass("slide-out");
        } else {
            flyOut.addClass('slide-in')
        }
        $(".main-content").toggleClass("dark");
        event.preventDefault();
    });
};



/* -----------------------------------------------
ALBUM FILTER
------------------------------------------------ */

//this is specifically for showing and hiding the filter
scarey.albumFilter = function() {

    var filter = $('.filter'),
          filterToggle = $('.filter__toggle'),
          filterClose = $('.filter__close'),
          filterItems = $('.filter__slider-wrap a'),
          hash = location.hash,
          target;

    filterToggle.on('click', function() {
        filter.toggleClass('showing');
    });

    filterClose.on('click', function() {
        filter.removeClass('showing');
    });

    filterItems.on('click', function(e) {
        target = $(this).attr('href');
        e.preventDefault();
        filter.removeClass('showing');
        setTimeout(function() {
            scarey.scroll(target);
        },300);

    });


};


//Logic for determing if we use the carousel or swipe
scarey.slider = {
    init: function() {
        if ( matchMedia(scarey.large).matches) {
            scarey.carousel();
        } else {
            scarey.swipe();
        }
    }
};


/****
* Carousel
****/
scarey.carousel = function() {
    var slider = $(".filter__slider"),
          sliderWrap = $(".filter__slider-wrap"),
          items = $(".filter__slider-wrap li"),
          item_width = items.innerWidth(),
          total_items = items.length,
          prev = $(".prev"),
          next = $(".next"),
          bullets = [],
          bullet_count,
          active_bullet,
          position = $('#position'),
          items_per_slide,
          pos_string,
          pos,
          transform,
          end,
          i;

    //set the amount of albums to show for each slide
    if ( matchMedia(scarey.large).matches) {
        items_per_slide = 2;
    } else {
        items_per_slide = 2;
    }


    //appending one bullet for each slide
    bullet_count = total_items / items_per_slide;
    for ( i = 0; i < bullet_count; i++) {
        position.append("<a class='bullet'></a>");
    }


    //push newly append bullets to an array
    $("#position a").each(function() {
        var bullet = $(this);
        bullets.push(bullet);
    });

    // get the width of the viewport
    // if total items less than the amount set above,
    // then the width should just be the total items
    // and we should hide the bullets and arrows
    if ( total_items <= items_per_slide ) {
        viewport_width = item_width * total_items;
        $('.filter__controls').hide();
        $(bullets).each(function() {
            $(this).hide();
        });
    } else {
        viewport_width = item_width * items_per_slide;
    }

    //set slider viewport width
    slider.css("width", viewport_width);

    //set slider wrap width
    sliderWrap.css("width", (item_width * total_items));


    // set active bullet initally to the first bullet
    active_bullet = 0;

    // call set active bullet function
    setActiveBullet(0);



    /****
    * Set the active bullet
    * The active bullet starts out a 0,
    * and we add or subtract an amount
    * depending on the increment given.
    ****/
    function setActiveBullet(increment) {
        active_bullet +=  increment;
        $(bullets).each(function() {
            $(this).removeClass('on');
        });
        $(bullets[active_bullet]).addClass('on');
    }



    // Helper for getting transform value
    function matrixToArray(matrix) {
        return matrix.substr(7, matrix.length - 8).split(', ');
    };


    /****
    * Generic slide function
    * Takes a direction, increment, factor and provides a callback
    ****/
    function slide(direction, increment, delta, callback) {

        // Use helper function to get what the current transform value is
        // Returns a string
        pos_string = matrixToArray(sliderWrap.css('transform'))[4];

        //convert value abvoe to integer
        pos = parseInt(pos_string, 10);


        // Setting the new transform value
        // If direction is set to forward, new value is:
        // current position - ( viewport width * delta)
        // Otherwise we going backward:
        // current position + ( viewport width * delta)
        if ( direction === "forward") {
            transform = pos - (viewport_width * delta);
        } else {
            transform = pos + (viewport_width * delta);
        }


        //set the end of the carousel
        end = ( direction === "forward" && Math.abs(pos) + viewport_width === ( item_width * total_items ) ) ||
                  ( direction === "backward" && pos === 0);

        //if we're either end don't do anything
        if ( end ) {
            return;
        } else if ( Modernizr.csstransforms3d ) {
            sliderWrap.css({
                "-webkit-transform": "translate3d(" + transform + "px, 0, 0)",
                "-moz-transform": "translate3d(" + transform + "px,0,0)",
                "-o-transform": "translate3d(" + transform + "px,0,0)",
                "-ms-transform": "translate3d(" + transform + "px,0,0)",
                "transform": "translate3d(" + transform + "px,0,0)",
            });
            callback(increment);
        } else {
            sliderWrap.css({
                "-webkit-transform": "translateX(" + transform + "px)",
                "-moz-transform": "translateX(" + transform + "px)",
                "-o-transform": "translateX(" + transform + "px)",
                "-ms-transform": "translateX(" + transform + "px)",
                "transform": "translateX(" + transform + "px)",
            });
            callback(increment);
        }

    }


    /****
    * Next / Prev / Bullet click handlers
    * Next / prev always have a factor of 1
    * For bullets, get the delta between the current active bullet
    * and the one that was clicked and use that to slide
    * multiple sections
    ****/
    next.on('click', function() {
        slide("forward", 1, 1, setActiveBullet);
    });

    prev.on('click', function() {
        slide("backward",-1 , 1, setActiveBullet);
    });

    $(bullets).each(function(index) {
        $(this).on('click', function() {
            var delta = index - active_bullet,
                  abs_delta = Math.abs(delta);
            if ( index === active_bullet ) {
                return;
            } else if ( index > active_bullet ) {
                slide("forward", delta, abs_delta, setActiveBullet);
            } else {
                slide("backward", delta, abs_delta, setActiveBullet);
            };
        });
    });
};


/****
* Swipe
****/
scarey.swipe =  function() {
    var slides = $("#slider li"),
          slideLength = slides.length,
          bullet,
          bullets = [],
          position = $("#position"),
          i;

    $(slides).each(function() {
        position.append("<a class='bullet'></a>");
    });

    $("#position a ").each(function() {
        var bullet = $(this);
        bullets.push(bullet);
    });

    $("#position a:first-child").addClass('on');

    $(bullets).each(function(index) {
        $(this).on("click", function() {
            mySwipe.slide(index, 200);
        });
    });

    window.mySwipe = $("#slider").Swipe({
        continuous: false,
        callback: function(pos) {
            var i = bullets.length;
            while(i--) {
                bullets[i].removeClass("on");
            }
            bullets[pos].addClass("on");
        }
    }).data('Swipe');
};



/* -----------------------------------------------
STICKY NAV
------------------------------------------------ */
scarey.stickyNav = function() {
    $(document).on('scroll', function() {
        var docScroll = $(document).scrollTop();
        if (docScroll >= 500) {
            if (!$('#nav').hasClass('sticky')) {
                $('#nav').addClass('sticky').css({
                    top: '-300px'
                }).stop().animate({
                    top: 0
                }, 500);
            }
        } else {
            $('#nav').removeClass('sticky').removeAttr('style');
        }

    });
};

/* -----------------------------------------------
HISTORY
------------------------------------------------ */
scarey.history = (function(window,undefined){
    // Prepare our Variables
    var
        History = window.History,
        $ = window.jQuery,
        document = window.document;

    // Check to see if History.js is enabled for our Browser
    if ( !History.enabled ) {
        return false;
    }

    // Wait for Document
    $(function(){
        // Prepare Variables
        var
            /* Application Specific Variables */
            contentSelector = '.wrap',
            $content = $(contentSelector).filter(':first'),
            contentNode = $content.get(0),
            $window = $(window),
            $body = $(document.body),
            rootUrl = History.getRootUrl()
            ;

        // Ensure Content
        if ( $content.length === 0 ) {
            $content = $body;
        }

        // Internal Helper
        $.expr[':'].internal = function(obj){
            // Prepare
            var
                $this = $(obj),
                url = $this.attr('href')||'',
                isInternalLink;

            // Check link
            isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;

            // Ignore or Keep
            return isInternalLink;
        };

        // HTML Helper
        var documentHtml = function(html){
            // Prepare
            var result = String(html)
                .replace(/<\!DOCTYPE[^>]*>/i, '')
                .replace(/<(html|head|body|title|meta|script)([\s\>])/gi,'<div class="document-$1"$2')
                .replace(/<\/(html|head|body|title|meta|script)\>/gi,'</div>')
            ;

            // Return
            return result;
        };

        // Ajaxify Helper
        $.fn.ajaxify = function(){
            // Prepare
            var $this = $(this);

            // Ajaxify
            $this.find('.page-nav a').click(function(event){
                // Prepare
                var
                    $this = $(this),
                    url = $this.attr('href'),
                    title = $this.attr('title')||null;

                // Continue as normal for cmd clicks etc
                if ( event.which === 2 || event.metaKey ) { return true; }

                // Ajaxify this link
                History.pushState(null,title,url);
                event.preventDefault();
                return false;
            });

            // Chain
            return $this;
        };

        // Ajaxify our Internal Links
        $body.ajaxify();

        // Hook into State Changes
        $window.bind('statechange',function(){
            // Prepare Variables
            var
                State = History.getState(),
                url = State.url,
                animating;

            // Set Loading
            $body.addClass('loading');
            //$(".main-content").addClass('loading');

            // Ajax Request the Traditional Page
            $.ajax({
                url: url,
                success: function (data) {
                    // Prepare
                    var $data = $(documentHtml(data)),
                        $dataBody = $data.find('.document-body:first'),
                        $dataContent = $dataBody.find(contentSelector).filter(':first'),
                        contentHtml, $scripts;

                    // Fetch the scripts

                    $scripts = $dataContent.find('.document-script');
                    if ($scripts.length) {
                        $scripts.detach();
                    }

                    // Fetch the content

                    contentHtml = $dataContent.html() || $data.html();
                    if (!contentHtml) {
                        document.location.href = url;
                        return false;
                    }

                    // Update the content
                    $content.html(contentHtml).ajaxify();

                    //reinitialize
                    scarey.nav();
                    scarey.albumFilter();
                    scarey.slider.init();


                    // Update the title
                    document.title = $data.find('.document-title:first').text();
                    try {
                        document.getElementsByTagName('title')[0].innerHTML = document.title.replace('<', '&lt;').replace('>', '&gt;').replace(' & ', ' &amp; ');
                    } catch (Exception) {}

                    //Add the scripts
                    $scripts.each(function(){
                    var $script = $(this), scriptText = $script.text(), scriptSrc = $script.attr('src'), scriptNode = document.createElement('script');
                    if(scriptSrc) {
                    scriptNode.src = scriptSrc;
                    contentNode.appendChild(scriptNode);
                    }
                    else{
                    scriptNode.appendChild(document.createTextNode(scriptText));
                    contentNode.appendChild(scriptNode);
                    }
                    });

                    //$(".main-content").removeClass("loading");
                    $body.removeClass('loading');

                    // Inform Google Analytics of the change
                    if ( typeof window._gaq !== 'undefined' ) {
                        window._gaq.push(['_trackPageview', relativeUrl]);
                    }
                },
                error: function (errorThrown) {
                    document.location.href = url;
                    return false;
                }
            }); // end Ajax

        }); // end onStateChange

    }); // end onDomLoad

})(window); // end closure


/* -----------------------------------------------
COLORBOX
------------------------------------------------ */
scarey.colorbox = {
    init: function() {

        //load and execute colorbox only if non-mobile
        if ( matchMedia(scarey.medium).matches) {
            $.getScript('/assets/js/libs/colorbox.js', function() {
                scarey.colorbox.go();
            });
            //this.go();
        } else {
            return
        }
    },
    go: function() {
        $(".photo-container a").colorbox({
            rel : "group",
            scalePhotos: true,
            maxHeight: "900px",
            speed: 200,
            opacity: ".7"
        });
    }
}



/****
* Album flipper
****/
scarey.flipper = function() {
    var album_container = $(".album-cover");

    album_container.on('click', function() {
        $(this).toggleClass('album-cover--flipped');
    });
}




/* -----------------------------------------------
BLOG
------------------------------------------------ */
scarey.blog = function() {
    $('.post-content p').each(function() {
        var plength = $(this).text().split(' ').length;
        if (plength >= 10) {
            $(this).css('text-align', 'justify');
            $(this).siblings().css('text-align', 'justify');
        }
    });
}



/* -----------------------------------------------
PAGE INITS
------------------------------------------------ */
$(document).ready(function() {
    //Inits
    scarey.nav();
    scarey.stickyNav();
    scarey.albumFilter();
    scarey.slider.init();
    scarey.colorbox.init();
    scarey.blog();
    scarey.fastclick.init();
    scarey.flipper();

});




