/* -----------------------------------------------
HISTORY
------------------------------------------------ */

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
            $menu = $('#nav'),
            activeClass = 'active',
            activeSelector = '.active',
            menuChildrenSelector = 'a',
            completedEventName = 'statechangecomplete',
            /* Application Generic Variables */
            $window = $(window),
            $body = $(document.body),
            rootUrl = History.getRootUrl(),
            scrollOptions = {
                duration: 800,
                easing:'swing'
            };
        
        // Ensure Content
        if ( $content.length === 0 ) {
            $content = $body;
        }
        
        // Internal Helper
        $.expr[':'].internal = function(obj, index, meta, stack){
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
                if ( event.which == 2 || event.metaKey ) { return true; }
                
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
                relativeUrl = url.replace(rootUrl,'');
 
            // Set Loading
            $body.addClass('loading');
            
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
                        // $menuChildren = $menu.find(menuChildrenSelector);
                        // $menuChildren.filter(activeSelector).removeClass(activeClass);
                        // $menuChildren = $menuChildren.has('a[href^="' + relativeUrl + '"],a[href^="/' + relativeUrl + '"],a[href^="' + url + '"]');
                        // if ($menuChildren.length === 1) {
                        //     $menuChildren.addClass(activeClass);
                        // }

                        // Update the content
                        $content.html(contentHtml).ajaxify();

                        //reinitialize
                        navFly.init();

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
                        //$("#main-content").css("left", "-100px");
                        

                        $("#main-content").css({
                            "opacity" : 1
                        });

                        // Complete the change
                        $body.removeClass('loading');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        document.location.href = url;
                        return false;
                    }
                }); // end Ajax
 
        }); // end onStateChange
 
    }); // end onDomLoad
 
})(window); // end closure

/* -----------------------------------------------
MOBILE FLYOUT
------------------------------------------------ */
var navFly = {
    init: function() {
        $(".more-nav").click(function() {
            $("#mobile-flyout").toggleClass("open");
            $(".main-content").toggleClass("dark");
            return false;
        });
    }
};


/* -----------------------------------------------
PAGE INITS
------------------------------------------------ */
$(document).ready(function() {
    $("#main-content").css({
        "opacity" : 1
    });

    $(".more-nav").click(function() {
            $("#mobile-flyout").toggleClass("open");
            $(".main-content").toggleClass("dark");
            return false;
        });
});

