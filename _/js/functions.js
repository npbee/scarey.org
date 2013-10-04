/* -----------------------------------------------
SMOOTH SCROLLING
------------------------------------------------ */
var smoothScroll = {
    init: function() {
        //Localscroll
        $.localScroll({
            hash: true,
            duration: '1000',
            easing:'easeInOutExpo'
        });
    }
};

/* -----------------------------------------------
MOBILE FLYOUT
------------------------------------------------ */
var navFly = {
    init: function () {
        $(".more-nav").click(function() {
            if ( $("#mobile-flyout").hasClass("slide-in")) {
                $("#mobile-flyout").removeClass("slide-in").addClass("slide-out");
            } else {
                $("#mobile-flyout").addClass('slide-in')
            }
            $(".main-content").toggleClass("dark");
            event.preventDefault();
        });
    }
};

/* -----------------------------------------------
ALBUM FILTER
------------------------------------------------ */
var albumFilter = {
    init: function() {

        $('.filter-toggle').click(function() {
            $('#slider').toggleClass("filter-show");
        });
        $('.filter-close').click(function() {
            $('#slider').removeClass("filter-show");
        });

        this.navigate();
    },

    //allow for permalinks
    navigate: function() {
        var hash = window.location.hash,
              $target = $(hash);
        if ( hash ) {
            $.scrollTo( $target, 1000, {
                easing: 'easeInOutExpo'
            })
        }
    }
};

//Album filter slider
var slider = {
    init: function() {
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
//create a stick nav
$(document).bind('ready scroll', function() {
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

/* -----------------------------------------------
HISTORY
------------------------------------------------ */
var history = {
    animate: function() {
        if ( $("#main-content").hasClass("animate-out") ) {
            $("#main-content").removeClass("animate-out").addClass("animate-in");
        } else {
            $("#main-content").addClass("animate-out").removeClass("animate-in");
        }
    }
};



(function(window,undefined){
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
                            navFly.init();
                            albumFilter.init();
                            slider.init();
                            smoothScroll.init();

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
PAGE INITS
------------------------------------------------ */
$(document).ready(function() {
    //Inits
    navFly.init();
    albumFilter.init();
    slider.init();
    smoothScroll.init();



    //Colorbox (only load if desktop)
    var width = $(window).width();
    if (width >= 600) {
        $(".photo-container a").colorbox({
            rel : "group",
            scalePhotos: true,
            maxHeight: "900px",
            speed: 200,
            opacity: ".7"
        });
    } else {
        $('.photo-container a').click(function(e) {
            event.preventDefault();
        });
    }

    //Album cover slider
    $('.album-cover img').click(function() {
        $('.album-cover img').toggleClass("album-cover-toggled");
    });


    //check if it's a long parapraph in tumblr
    $('.post-content p').each(function() {
        var plength = $(this).text().split(' ').length;
        console.log(plength);
        if (plength >= 10) {
            $(this).css('text-align', 'justify');
            $(this).siblings().css('text-align', 'justify');
        }
    });

});




