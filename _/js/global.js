/* -----------------------------------------------  

Site Name: Crafted Pixelz
File: global.js
Author: Abid Din
Version: 1.0
Copyright (c): Crafted Pixelz
  
------------------------------------------------ */

/* -----------------------------------------------  
  HTML5 HISTORY  
------------------------------------------------ */

var html5History = {
    init: function () {
        // Global Vars
        var History = window.History,
            $ = window.jQuery,
            document = window.document;

        // Is History enabled?
        if (!History.enabled) {
            return false;
        }

        // App Vars
        var contentSelector = '#main-content',
            $content = $(contentSelector),
            contentNode = $content.get(0),
            $menu = $('#page-nav'),
            menuChildrenSelector = 'a',
            activeClass = 'active',
            activeSelector = '.active',
            $body = $(document.body),
            rootUrl = History.getRootUrl();

        // Ensure Content
        if ($content.length === 0) {
            $content = $body;
        }

        // Set active links on load
        var $currentUrl = window.location.pathname.split("/"),
            $currentPage = $currentUrl[1];

        $menu.find(menuChildrenSelector).removeClass("active");

        if (window.location.pathname === "/") {
            $("#home-link").addClass("active");
        } else {
            $("#" + $currentPage + "-link").addClass("active");
        }

        // Internal Helper
        $.expr[':'].internal = function (obj, index, meta, stack) {
            // Prepare
            var $this = $(obj),
                url = $this.attr('href') || '',
                isInternalLink;

            // Check link
            isInternalLink = url.substring(0, rootUrl.length) === rootUrl || url.indexOf(':') === -1;

            // Ignore or Keep
            return isInternalLink;
        };

        // External Helper
        var external = {
            init: function(){
                $("a[href^='http://']").each(function () {
                    $(this).attr("target", "_blank");
                }); 
            }       
        };
        
        external.init();

        // HTML Helper
        var documentHtml = function (html) {
            // Prepare
            var result = String(html).replace(/<\!DOCTYPE[^>]*>/i, '').replace(/<(html|head|body|title|meta|script)([\s\>])/gi, '<div class="document-$1"$2').replace(/<\/(html|head|body|title|meta|script)\>/gi, '</div>');
            // Return
            return result;
        };

        // Ajaxify Helper
        $.fn.ajaxify = function () {
            // Prepare
            var $this = $(this);

            // Ajaxify
            $this.find('a:internal:not(.no-ajaxy,[href^="#"])').click(function (event) {
                // Prepare
                var $this = $(this),
                    url = $this.attr('href'),
                    title = document.title;

                // Continue as normal for cmd clicks etc
                if (event.which == 2 || event.metaKey) {
                    return true;
                }
                
                // Track Links
                clicky.log($(this).attr("href"));

                // Ajaxify this link
                History.pushState(null, title, url);
                event.preventDefault();
                return false;
            });

            // Chain
            return $this;
        };

        // Ajaxify Internal Links
        $body.ajaxify();

        // Hook into State Changes
        $(window).bind('statechange', function () {
            // Prepare Variables
            var State = History.getState(),
                url = State.url,
                relativeUrl = url.replace(rootUrl, '');

            // Set Loading
            $body.addClass('loading');

            $("#main-content").delay(100).animate({
                "left": "100px",
                "opacity": 0
            }, 600, "easeInOutExpo", function () {
                doAjax();
            });

            $("#footer").animate({
                "left": "100px",
                "opacity": 0
            }, 500, "easeInOutExpo");

            function doAjax() {
                // Ajax Request the Traditional Page
                $.ajax({
                    url: url,
                    success: function (data, textStatus, jqXHR) {
                        // Prepare
                        var $data = $(documentHtml(data)),
                            $dataBody = $data.find('.document-body:first'),
                            $dataContent = $dataBody.find(contentSelector).filter(':first'),
                            $menuChildren, contentHtml, $scripts;

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

                        // Update the menu
                        $menuChildren = $menu.find(menuChildrenSelector);
                        $menuChildren.filter(activeSelector).removeClass(activeClass);
                        $menuChildren = $menuChildren.has('a[href^="' + relativeUrl + '"],a[href^="/' + relativeUrl + '"],a[href^="' + url + '"]');
                        if ($menuChildren.length === 1) {
                            $menuChildren.addClass(activeClass);
                        } else if (window.location.pathname === "/") {
                            $("#home-link").addClass("active");
                        }

                        // Update the content
                        $content.html(contentHtml).ajaxify();

                        // Reinitialise plugins / Page specific JS
                        work.init();
                        external.init();
                        contact.init();

                        // Update the title
                        document.title = $data.find('.document-title:first').text();
                        try {
                            document.getElementsByTagName('title')[0].innerHTML = document.title.replace('<', '&lt;').replace('>', '&gt;').replace(' & ', ' &amp; ');
                        } catch (Exception) {}

                        // Add the scripts
                        $scripts.each(function () {
                            var $script = $(this),
                                scriptText = $script.text(),
                                scriptNode = document.createElement('script');
                            scriptNode.appendChild(document.createTextNode(scriptText));
                            contentNode.appendChild(scriptNode);
                        });
                        
                        // Scroll to top
                        function scrollTo(id, delay) {
                            $("html:not(:animated),body:not(:animated)").delay(delay).animate({
                                scrollTop: $("#" + id).offset().top
                            }, 600);
                        }
                        
                        // Page transitions
                        $("#main-content").css("left", "-100px").delay(100).animate({
                            "left": 0,
                            "opacity": 1
                        }, 600, "easeOutExpo");

                        $("#footer").css("left", "-100px").animate({
                            "left": 0,
                            "opacity": 1
                        }, 500, "easeOutExpo", function(){
                            scrollTo("logo", 0);
                        });

                        // Complete the change
                        $body.removeClass('loading');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        document.location.href = url;
                        return false;
                    }
                }); // end Ajax                
            }
        }); // end onStateChange
    }
};

/* -----------------------------------------------  
  PRELOADER
------------------------------------------------ */

var preload = {
    init: function(){
        $("body").prepend("<div id='loader' />");
        
        $("#loader").css({
            top: ($(window).height() / 2 - $("#loader").height() / 2),
            left: ($(window).width() / 2 - $("#loader").width() / 2) 
        });
            
        var cl = new CanvasLoader('loader');
        cl.setColor('#73d0ff');
        cl.setDiameter(100);
        cl.setDensity(100);
        cl.setRange(1);
        cl.setSpeed(3);
        cl.setFPS(40);
        cl.show();
    }
};

/* -----------------------------------------------  
  ANIMATIONS 
------------------------------------------------ */

var animate = {
    entrance: function () {
        var totalPixels = 36;

        $("body").prepend("<div id='pixelbg' />");

        for(var i = 0; i < totalPixels; i++) {
            $("#pixelbg").append("<span />");
        }

        $("#pixelbg span").each(function () {
            var colours = ['#c5e8ff', '#9ad8ff', '#5ec0ff', '#e2f4ff', '#dbf1ff', '#81ceff', '#94d5ff', '#8bd2ff'],
                randcolour = colours[Math.floor(Math.random() * colours.length)];
                
            $(this).css("background-color", randcolour);
        });

        function anim() {
            $("#pixelbg").delay(500).animate({
                top: 0
            }, 250, function(){
                $("#container").css("visibility", "visible").delay(200).animate({
                    top: 0,
                    opacity: 1
                }, 500, function(){
                    var links = $("#nav li"),
                        i = 0;

                    (function () {
                        $(links[i++]).animate({
                            "top": 0,
                            "opacity": 1
                        }, 180, arguments.callee);
                    })();
                    
                    requestInterval(animate.sparkle, 2000);
                });
            });
        }
            
        $(window).load(function(){
            $("#loader").fadeOut(500, function(){
                $(this).remove();
                anim();
            });
        });
    },
    
    sparkle: function(){
        $("#pixelbg span").each(function(){
            var colours = ['#c5e8ff', '#9ad8ff', '#5ec0ff', '#e2f4ff', '#dbf1ff', '#81ceff', '#94d5ff', '#8bd2ff'],
                randcolour = colours[Math.floor(Math.random() * colours.length)];
                
            $(this).css({
                backgroundColor: randcolour
            }, 800);
        });
    }
};

/* -----------------------------------------------  
  INITIALISE PLUGINS 
------------------------------------------------ */



/* -----------------------------------------------  
  KEYBOARD NAVIGATION
------------------------------------------------ */

var keyNav = {
    init: function () {
        var currentLink = "#nav li.active";
        $(document).keydown(function (e) {
            var direction = null;
            if (e.keyCode == 37) {
                direction = 'prev';
            } else if (e.keyCode == 39) {
                direction = 'next';
            }

            if (direction !== null) {
                $(currentLink)[direction]().find('a').click();
            }
        });
    }
};

/* -----------------------------------------------  
  SOCIAL BUTTONS
------------------------------------------------ */

var social = {
    init: function () {
        $("#show").mouseover(function () {
            Socialite.load("#buttons");
        }).toggle(function () {
            $(this).next("#buttons").stop().animate({
                "left": 0,
                "opacity": 1
            }, 300);
        }, function () {
            $(this).next("#buttons").stop().animate({
                "left": "235px",
                "opacity": 0
            }, 300);
        });
    }
};

/* -----------------------------------------------  
  WORK PAGE
------------------------------------------------ */

var work = {
    init: function () {
    
        var workitem = $(".work-item"),
            toggles = $(".details, .screenie");
            
        workitem.each(function () {
            var el = $(this);
            el.attr("data-height", el.outerHeight());
        }).css("height", "190px");

        toggles.toggle(function () {
            var el = $(this),
                workitem = el.parent(),
                fullHeight = workitem.data("height");

            $("html:not(:animated),body:not(:animated)").animate({
                scrollTop: workitem.offset().top - 20
            }, 600, "easeInOutExpo");

            workitem.find(".more").text("See Less");
            workitem.find(".details").css("background", "#222527 url(http://cdn.craftedpixelz.co.uk/resource/images/arrow-down.png) 190px 140px no-repeat");
            workitem.animate({
                height: fullHeight
            }, 200, "easeInOutExpo", function () {
                var el = $(this);
                el.find(".desc, .role").animate({
                    top: 0,
                    opacity: 1
                }, 400, "easeOutBack");
            });
        }, function () {
            var workitem = $(this).parent();
            workitem.find(".more").text("See More");
            workitem.find(".details").css("background", "#222527 url(http://cdn.craftedpixelz.co.uk/resource/images/arrow-right.png) 190px bottom no-repeat");
            workitem.find(".desc, .role").animate({
                top: "100px",
                opacity: 0
            }, 400, "easeInBack", function () {
                workitem.animate({
                    height: "190px"
                }, 200, "easeInOutExpo");
            });
        });

        $(".comingsoon").find(toggles).off();
    }
};

/* -----------------------------------------------  
  CONTACT PAGE
------------------------------------------------ */

var contact = {
    init: function () {
        $("#getintouch").submit(function (e) {
            e.preventDefault();
            
            var data = $(this).serialize(),
                isValid = $("#getintouch")[0].checkValidity();
                
            if(isValid === true){
                $.ajax({
                    data: data,
                    url: "/contact",
                    type: "POST",
                    success: function () {
                        $("#getintouch").slideUp(300, function () {
                            var name = $("#name").val();
                            $(this).after("<div class='thanks'></div>");
                            $(".thanks")
                            .append("<h2>Message sent successfully!</h2>")
                            .append("Thanks for contacting me " + name + ". I'll be in touch as soon as possible!")
                            .animate({
                                top: 0,
                                opacity: 1
                            }, 500, "easeOutBack");
                        });
                    }
                });  
            }
        });
    }
};

/* -----------------------------------------------  
  ANALYTICS
------------------------------------------------ */

var clicky_site_ids = clicky_site_ids || [];
clicky_site_ids.push(142937);
var analytics = {
    init: function () {
        var s = document.createElement('script');
        s.async = true;
        s.src = '//static.getclicky.com/js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
    }
};

/* -----------------------------------------------  
  LET'S KICK THIS SHIT OFF!
------------------------------------------------ */

$(function () {
    preload.init();
    animate.entrance();
    html5History.init();
    keyNav.init();
    social.init();
    work.init();
    contact.init();
    analytics.init();
});