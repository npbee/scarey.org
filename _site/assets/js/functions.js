window.scarey = window.scarey || {};


//Breakpoints
scarey.medium = "screen and (min-width: 50em)";
scarey.large = "screen and (min-width: 75em)";


/****
* $DEBOUNCER
****/
scarey.debounce = function(event, callback, timeout) {
    var timer;
    var duration = timeout || 500;
    $(window).on(event, function() {
        if ( timer ) {
            clearTimeout(timer);
        }
        timer = setTimeout(callback, duration);
    });
};




/****
* $FASTCLICK
****/
//Enable fastclick only if not on desktop device
scarey.fastclick =  {
    init: function() {
        if ( matchMedia(scarey.medium).matches ) {
            return;
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




/****
* $SMOOTH SCROLL
****/
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




/****
* $MOBILE FLYOUT
****/
scarey.nav = function() {
    var topNav = $("#nav"),
          flyOut = $("#mobile-flyout");

    $(".more-nav").click(function() {
        flyOut.toggleClass('nav--active');
        $(".main-content").toggleClass("dark");
        event.preventDefault();
    });
};




/****
* $ALBUM FILTER
****/

//Logic for determing if we use the carousel or swipe
scarey.filter = {
    init: function() {
        if ( !$('body').hasClass('albums') ) {
            return;
        }
        // For showing and hiding the filter
        // We need this for both carousel and swipe
        scarey.filter.toggle();

        if ( matchMedia(scarey.medium).matches) {
            scarey.carousel();
        } else {
            scarey.swipe();
        }
    },

    toggle: function() {
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
    }
};




/****
* $CAROUSEL
****/
scarey.carousel = function() {
    if ( !$(".filter").length ) {
       return;
    }
    var slider_outer = $(".filter__slider"),
          slider_inner = $(".filter__slider-wrap"),
          items = $(".filter__slider-wrap li"),
          item_width = items.innerWidth(),
          total_items = items.length,
          prev = $(".prev"),
          next = $(".next"),
          bullets = [],
          active_bullet,
          position = $('#position'),
          items_per_slide,
          viewport_width,
          transform,
          pos,
          end,
          i;

    // Global settings
    var settings = {
        itemsPerSlideBig: 4,
        itemsPerSlideMed: 2,
        itemsPerSlideSmall: 1
    };


    // Initialization
    function init() {
        setItemsPerSlide();
        prepareBullets();
        prepareViewport();
        addListeners();
    }


    // Reset everything
    function reset() {

        // Remove bullets from DOM
        $(bullets).each(function() {
            $(this).off('click');
            $(this).remove();
        });

        // clear any array if it exists
        bullets.length = 0;

        // remove listeners on next, prev
        next.off('click');
        prev.off('click');

        // Remove any width on the slider
        slider_outer.css('width', '');

        // Remove event listener for the carousel
        $(window).off('resize');

        // remove any transforms
        slide("reset");

        // Check the screen size to choose the
        // right implementation
        if ( matchMedia(scarey.medium).matches ) {
            init();
        } else {
            scarey.swipe();
        }
    }

   // Set the amount of items to show per slide
    function setItemsPerSlide() {
        if ( matchMedia(scarey.large).matches) {
            items_per_slide = settings.itemsPerSlideBig;
        } else if ( matchMedia(scarey.medium).matches ) {
            items_per_slide = settings.itemsPerSlideMed;
        } else {
            items_per_slide = settings.itemsPerSlideSmall;
        }
    }



    // Prepare the bullets
    function prepareBullets() {

        var bullet_count;

        // Get bullet count and append to the dom
        bullet_count = total_items / items_per_slide;
        for ( i = 0; i < bullet_count; i++) {
            position.append("<a class='bullet'></a>");
        }

        // Push new bullets to array
        $("#position a").each(function() {
            var bullet = $(this);
            bullets.push(bullet);
        });

        // Set initial active bullet
        active_bullet = 0;
        setActiveBullet(0);
    }


    // Prepare viewport
    function prepareViewport() {
        // To do:  move the first item to left position

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
        slider_outer.css("width", viewport_width);

        //set slider wrap width
        slider_inner.css("width", (item_width * total_items));
    }



    // Set the active bullet
    // The active bullet starts out a 0,
    // and we add or subtract an amount
    // depending on the increment given.
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
    }



    // Generic slide function
    // Takes a direction, increment, factor and provides a callback
    function slide(direction, increment, delta, callback) {

        // Use helper function to get what the current transform value is
        pos = parseInt(matrixToArray(slider_inner.css('transform'))[4], 10);


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
        } if ( direction === "reset") {
            slider_inner.css({
                "-webkit-transform": "translate3d(0, 0, 0)",
                "-moz-transform": "translate3d(0,0,0)",
                "-o-transform": "translate3d(0,0,0)",
                "-ms-transform": "translate3d(0,0,0)",
                "transform": "translate3d(0,0,0)",
            });
        } else if ( Modernizr.csstransforms3d ) {
            slider_inner.css({
                "-webkit-transform": "translate3d(" + transform + "px, 0, 0)",
                "-moz-transform": "translate3d(" + transform + "px,0,0)",
                "-o-transform": "translate3d(" + transform + "px,0,0)",
                "-ms-transform": "translate3d(" + transform + "px,0,0)",
                "transform": "translate3d(" + transform + "px,0,0)",
            });
            callback(increment);
        } else {
            slider_inner.css({
                "-webkit-transform": "left:" + transform + "px)",
                "-moz-transform": "left:" + transform + "px)",
                "-o-transform": "left:" + transform + "px)",
                "-ms-transform": "left:" + transform + "px)",
                "transform": "left:" + transform + "px)",
            });
            callback(increment);
        }

    }



    // ADD LISTENERS
    // Next / Prev / Bullet click handlers
    // Next / prev always have a factor of 1
    // For bullets, get the delta between the current active bullet
    // and the one that was clicked and use that to slide
    // multiple sections
    function addListeners() {
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
                }
            });
        });

        //Listen for resize
        scarey.debounce('resize', reset, 500);


    }

    // Run it!
    init();


};




/****
* $SWIPE
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




/****
* $HISTORY
****/
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
                relativeUrl = url.replace(rootUrl,''),
                animating;

            // Set Loading
            $(".main-content").addClass('slide-fade-to-right');

            setTimeout(fetchPage, 300);

            // Ajax Request the Traditional Page
            function fetchPage() {
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
                        scarey.reload();

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

                        //$(".main-content").removeClass('slide-fade-to-right');
                        $(".main-content").addClass('slide-fade-from-left');

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

            }

        }); // end onStateChange

    }); // end onDomLoad

})(window); // end closure




/****
* $COLORBOX
****/
scarey.colorbox = {
    init: function() {

        //load and execute colorbox only if non-mobile
        if ( matchMedia(scarey.medium).matches) {
            $.getScript('/assets/js/libs/colorbox.js', function() {
                scarey.colorbox.go();
            });
            //this.go();
        } else {
            return;
        }
    },
    go: function() {
        $(".colorbox-container a").colorbox({
            rel : "group",
            scalePhotos: true,
            maxHeight: "900px",
            speed: 200,
            opacity: ".7",
            onComplete: function() {
                $('.wrap').on('click', function() {
                    $.colorbox.close();
                });
            }
        });
    }
};




/****
* $FLIPPER
****/
scarey.flipper = function() {
    var container = $(".flipper-wrap");

    container.on('click', function() {
        $(this).toggleClass('flipper-wrap--flipped');
    });
};




/****
* $PHOTOSET
****/
scarey.photoset = function() {
    if ( !$('.scarey-photoset') ) {
        return;
    }
    $('.scarey-photoset').collagePlus({
        'fadeSpeed' : 200,
        'effect' : 'photoset-transition',
        'direction' : 'vertical'
    });

    scarey.debounce('resize', scarey.photoset, 500);
};




/****
* $LOAD MORE
****/
scarey.loadMore = function() {
    var button = $("#load-more");
    var page = 1;
    var loaded;

    button.on('click', function() {
        $(this).addClass('loading');
        page++;
        $.ajax({
            url: '/page/' + page,
            dataType: 'html',
            success: function(response) {
                button.removeClass('loading');
                var target = $(response).find('.post');
                target.addClass('slide-fade-from-bottom');
                $(target).insertBefore(button);
                setTimeout(scarey.photoset, 300);
            },
            error: function() {
                button.removeClass('loading');
                button.attr('disabled', 'disabled');
                $("<p class='center gamma'>No more posts!</p>").insertBefore(button);
            }
        });
    });
};



/****
* $VISITOR CHECK
* If you're a new visitor, show the home page animation
* If not, skip it
****/
scarey.visitorCheck = function() {

    var $body = $('body');
    var slidefromleft1 = $('#slide-from-left-1');
    var slidefromleft2 = $('#slide-from-left-2');
    var slidefromright = $("#slide-from-right");
    var slidefrombottom = $("#slide-from-bottom");
    var slidefrombottom2 = $("#slide-from-bottom-2");

    if ( 'localStorage' in window && window.localStorage !== null ) {

        if ( !localStorage.getItem('returning_visitor') === true ) {

            slidefromleft1.addClass("slide-fade-from-left");
            slidefromleft2.addClass("slide-fade-from-left");
            slidefromright.addClass("slide-fade-from-right");
            slidefrombottom.addClass("slide-fade-from-bottom");
            slidefrombottom2.addClass("slide-fade-from-bottom");

            localStorage.setItem("returning_visitor", true);

        } else {
            slidefromleft1.css("opacity", 1);
            slidefromleft2.css("opacity", 1);
            slidefromright.css("opacity", 1);
            slidefrombottom.css("opacity", 1);
            slidefrombottom2.css("opacity", 1);
        }
        //localStorage.clear();
    }

};



/****
* $PHOTO GRID
* Uses Instagram API to display photo grid
****/
scarey.photoGrid = function() {

    // If we're not on the photo page, return
    if ( !$('#photo-grid') ) {
        return;
    }

    var $grid = $("#photo-grid"),
          $loadMore = $("#load-more--instagram"),
          count = 0,
          max_id = '',
          images = [],
          isMobile = false;


    // Initialize
    function init() {
        checkCount();
        fetchImages();
    }

    // Set the amount of images to get based on breakpoints
    // Also set the max_id for Instagram API, used to request the next images
    // Based on what we've already downloaded
    function checkCount() {
        if ( matchMedia(scarey.large).matches ) {
            count = 18;
        } else if ( matchMedia(scarey.medium).matches ) {
            count = 12;
        } else {
            count = 2;
            isMobile = true;
        }

    }


    function fetchImages() {

        // Add the loading class while requesting from Instagram
        $grid.removeClass('grid--loaded');
        $grid.addClass('grid--loading');

        var request = $.ajax({
            url: '/assets/php/instagram.php',
            type: 'POST',
            data: ({
                count: count,
                max_id: max_id
            }),
            dataType: 'json'
        });

        request.always( function() {
            $grid.removeClass('grid--loading');
        });

        request.done(function( response ) {

            // Remove loading class,
            // Add loaded class
            // Enable and show load more button
            $grid.addClass('grid--loaded');
            $loadMore.prop('disabled', false);
            $loadMore.css('opacity', 1);

            var resp = JSON.parse(response);
            var thumbs = [];
            var i;

            for ( i = 0; i < count; i++ ) {
                var imageReq = resp.data[i].images;

                // Check for captions
                var caption = resp.data[i].caption ? resp.data[i].caption.text : '';
                images.push(imageReq.thumbnail.url);

                // Store the max_id for later
                max_id = resp.pagination.next_max_id;

                appendImage(imageReq.thumbnail.url, imageReq.standard_resolution.url, caption);
            }

            scarey.colorbox.init();

        });

        request.fail(function( jqXHR, textStatus ) {
            console.log('request failed :' + textStatus);
            $grid.append("<p>There was an error requesting the images from Instagram</p>");
        });
    }

    function appendImage(thumbnail, standard, caption) {
        var thumb = isMobile ? standard : thumbnail;
        $grid.append('<a title="' + caption + '" href="' + standard + '"><img src="' + thumb + '"></a>');
    }


    // Listener for load more
    $loadMore.on('click', function() {
        fetchImages();
    });

    // Run it
    init();


};




/****
* $COLLAPSE
****/
scarey.collapse = function() {
    if ( !$('.collapse__trigger') ) {
        return;
    }
    var $trigger = $(".collapse__trigger");

    $trigger.on('click', function() {
        $(this).toggleClass('bold');
        $(this).parent().toggleClass('collapse--collapsed');
        $(this).next().toggleClass('collapse__content--showing');
    });
};




/****
* $TOUR
* Bands in Town API
****/
scarey.tour = function() {

    if ( !$('.tour--upcoming').length ) {
        return;
    }

    var APPID = 'scarey.org';
    var $content = $('.tour .main-content');
    var $block = $('.tour-block');

    $content.addClass('loading');

    var request = $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'http://api.bandsintown.com/artists/S Carey/events.json?api_version=2.0&app_id=' + APPID,
        timeout: 8000
    });

    request.done(function(data) {
        data.length ? displayData(data) : noShows();
    });

    request.fail(function( jqXHR, textStatus) {
        $content.append('<p class="center">There was an error requesting the data from Bands In Town.  Please try again or visit this link: </p><p class="center"><a target="_blank" href="http://www.bandsintown.com/S.Carey">http://www.bandsintown.com/S.Carey</a></p>');
    });

    request.always(function() {
        $content.removeClass('loading');
    });

    function noShows() {
        $block.hide();
        $content.append('<p class="center italic">No currently scheduled shows.</p>')
    }


    function displayData(data) {
        var i;
        var support = {};
        var supportCnt = 0;
        var denoters = ['*', '^', '#', '**', '^^', '##', '***', '^^^', '###'];

        for ( i = 0; i < data.length; i++  ) {
            var evnt = data[i];
            evnt.support = {};
            var dateMatch = /(january|february|march|april|may|june|july|august|september|october|november|december)\s(\d+),\s(\d){4}/i;
            var strippedDate = evnt.formatted_datetime.match(dateMatch)[0];
            var $tourevent = $('<div>').attr('class', 'tour-event');


            // Check if support acts
            if ( evnt.artists.length > 1 ) {
                for ( var s = 1; s < evnt.artists.length; s++ ) {
                    if ( !support[evnt.artists[s].name] ) {
                        support[evnt.artists[s].name] = denoters[supportCnt];
                        supportCnt++;
                    }
                    evnt.support.name = evnt.artists[s].name;
                    evnt.support.denoter = support[evnt.support.name] || "*";

                }
            } else {
                evnt.support.denoter = '';
            }

            appendDates(evnt);

        }

        appendSupport();

        function appendDates(evnt) {
            var ticket_url;

            if (evnt.ticket_url) {
                ticket_url = '<a class="underlined-link" target="_blank" href="' +
                    evnt.ticket_url + '">' + evnt.venue.name + '</a>';
            } else {
                ticket_url = evnt.venue.name;
            }

            $tourevent.append('' +
                '<p class="tour-date">' + strippedDate + '</p>' +
                '<p class="tour-city">' + evnt.formatted_location + '</p>' +
                '<p class="tour-venue">' + ticket_url +
                    '<span class="bold">' + ' ' + evnt.support.denoter + '</span></p>'
            );
            $block.append($tourevent);
        }

        function appendSupport() {
            var $toursupport = $('<div>').attr('class', 'tour-support');
            for (var act in support ) {
                $toursupport.append('' +
                    '<p><span class="bold">' +
                    support[act] + ' ' +
                    '</span>w/' + ' ' +
                    act + '</p>'
                );
            }

            $toursupport.insertBefore($block);
        }

    }
};



/****
* $RELOAD
* Reload all inits
* for use with history
****/
scarey.reload = function() {
    scarey.nav();
    scarey.filter.init();
    scarey.colorbox.init();
    scarey.fastclick.init();
    scarey.flipper();
    scarey.loadMore();
    scarey.visitorCheck();
    scarey.photoGrid();
    scarey.collapse();
    scarey.tour();
    window.picturefill();
};



/*------------------------------------*\
    $DOCREADY
\*------------------------------------*/
$(document).ready(function() {
    //Inits
    scarey.nav();
    scarey.filter.init();
    scarey.colorbox.init();
    scarey.fastclick.init();
    scarey.flipper();
    scarey.loadMore();
    scarey.visitorCheck();
    scarey.photoGrid();
    scarey.collapse();
    scarey.tour();
});


/****
* $WINDOW LOAD
****/
$(window).load(function() {
    scarey.photoset();
});

