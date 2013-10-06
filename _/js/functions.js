window.scarey = window.scarey || {};


//Breakpoints
scarey.medium = "screen and (min-width: 45em)";
scarey.large = "screen and (min-width: 90em)";



/* -----------------------------------------------
SMOOTH SCROLLING
------------------------------------------------ */
scarey.scroll = function(target) {
    //Localscroll
    // $.localScroll({
    //     hash: true,
    //     duration: '1000',
    //     easing:'easeInOutExpo'
    // });
//console.log(target);
    $.scrollTo(
        $(target),
        1000,
        {
            easing: 'easeInOutExpo'
        }
    );

};

/* -----------------------------------------------
MOBILE FLYOUT
------------------------------------------------ */
scarey.nav = function() {
    $(".more-nav").click(function() {
        if ( $("#mobile-flyout").hasClass("slide-in")) {
            $("#mobile-flyout").removeClass("slide-in").addClass("slide-out");
        } else {
            $("#mobile-flyout").addClass('slide-in')
        }
        $(".main-content").toggleClass("dark");
        event.preventDefault();
    });
};

/* -----------------------------------------------
ALBUM FILTER
------------------------------------------------ */
scarey.albumFilter = function() {

    var filter = $('.filter'),
          filterToggle = $('.filter-toggle'),
          filterClose = $('.filter-close'),
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


//Album filter slider
scarey.slider = {
    init: function() {
        if ( matchMedia(scarey.medium).matches) {
            this.carousel();
        } else {
            this.swipe();
        }
    },
    carousel: function() {
        var slider = $(".filter__slider"),
              sliderWrap = $(".filter__slider-wrap"),
              items = $(".filter__slider-wrap li"),
              itemWidth = items.innerWidth(),
              prev = $(".prev"),
              next = $(".next"),
              initial,
              posStr,
              pos,
              dist;

        if ( matchMedia(scarey.large).matches) {
            initial = 4;
        } else {
            initial = 2;
        }

        initialDist = itemWidth * initial;

        //set slider container width
        slider.css("width", (itemWidth * initial));

        //set slider wrap width
        sliderWrap.css("width", (itemWidth * items.length));

        //for getting transform value
        function matrixToArray(matrix) {
            return matrix.substr(7, matrix.length - 8).split(', ');
        };


        next.on('click', function() {
            posStr = matrixToArray(sliderWrap.css('transform'))[4];
            pos = parseInt(posStr, 10);
            dist = initialDist - pos;
            if ( dist === (itemWidth * items.length) ) {
                return;
            } else {
                sliderWrap.css({
                    "-webkit-transform": "translateX(-" + dist + "px)",
                    "-moz-transform": "translateX(-" + dist + "px)",
                    "-o-transform": "translateX(-" + dist + "px)",
                    "-ms-transform": "translateX(-" + dist + "px)",
                    "transform": "translateX(-" + dist + "px)",

                });
            }
        });

        prev.on('click', function() {
            posStr = matrixToArray(sliderWrap.css('transform'))[4];
            pos = parseInt(posStr, 10);
            dist = initialDist + pos;
            if ( pos == 0) {
                return;
            } else {
                sliderWrap.css({
                    "-webkit-transform": "translateX(" + dist + "px)",
                    "-moz-transform": "translateX(" + dist + "px)",
                    "-o-transform": "translateX(" + dist + "px)",
                    "-ms-transform": "translateX(" + dist + "px)",
                    "transform": "translateX(" + dist + "px)",
                });
            }
        });



    },
    swipe: function() {
        var bullets = [];
        $("#position a ").each(function() {
            var bullet = $(this);
            bullets.push(bullet);
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
    }
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
            $("#main-content").removeClass("animate-in").addClass("animate-out");
            //$("#main-content").removeClass("in").addClass("slide out");

            $("#main-content").on("webkitAnimationStart", function() {
                animating = true;
            });

            if ( !animating ) {

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
                            scarey.smoothScroll();

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

                           $("#main-content").removeClass("animate-out").addClass("animate-in");
                            // Complete the change
                            $body.removeClass('loading');

                            $("#main-content").on("webkitAnimationEnd", function() {
                                animating = false;
                            });

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


/* -----------------------------------------------
COLORBOX
------------------------------------------------ */
scarey.colorbox = {
    init: function() {

        //load and execute colorbox only if non-mobile
        if ( matchMedia(scarey.medium).matches) {
            $.getScript('/_/js/libs/colorbox.js', function() {
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
    //scarey.scroll();
    scarey.colorbox.init();
    scarey.blog();

});




