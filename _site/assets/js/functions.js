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

    if ( !$('.tour--upcoming').length && !$('.tour--past').length ) {
        return;
    }

    var APPID = 'scarey.org';
    var $content = $('.tour .main-content');
    var $block = $('.tour-block');
    var dateRange;

    if ( $('.tour--upcoming').length ) {
        dateRange = 'upcoming';
    } else if ( $('.tour--past').length ) {
        dateRange = '2011-01-01,';
        var today = new Date();
        var year = today.getFullYear();
        var month = getTwoDigit(today.getMonth() + 1);
        var date =  getTwoDigit(today.getDate() - 1);
        dateRange += year + '-' + month + '-' + date;
    }

    function getTwoDigit(number) {
        return number < 10 ? '0' + number : number;
    }

    $content.addClass('loading');

    var request = $.ajax({
        type: 'GET',
        // Local testing
        //dataType: 'json',
        //url: 'http://localhost/mocks/bandsintown.json',
        // Production
        dataType: 'jsonp',
        url: 'http://api.bandsintown.com/artists/S Carey/events.json?api_version=2.0&date=' + dateRange + '&app_id=' + APPID,
        timeout: 8000
    });

    request.done(function(data) {
        data.length ? displayData(data) : noShows();
    });

    request.fail(function( jqXHR, textStatus) {
        $content.append('<p class="center">There was an error requesting the data from Bands In Town.  Please try again or visit this link: </p><p class="center"><a target="_blank" href="http://www.bandsintown.com/S.Carey">http://www.bandsintown.com/S.Carey</a></p>');
    });

    request.always(function(data) {
        $content.removeClass('loading');
    });

    function noShows() {
        $block.hide();
        $content.append('<p class="center italic">No currently scheduled shows.</p>');
    }


    function displayData(data) {
        var i;
        var support = {};
        var supportCnt = 0;
        //var denoters = ['*', '^', '#', '**', '^^', '##', '***', '^^^', '###'];
        var denoters = ['*', '^', '#'];
        var extraDenoter;
        var currentDenoter = 0;

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
                        if (!denoters[supportCnt]) {
                            extraDenoter = denoters[currentDenoter];
                            extraDenoter += extraDenoter.split('')[0];
                            currentDenoter++;
                            denoters.push(extraDenoter);
                        }
                        support[evnt.artists[s].name] = denoters[supportCnt];
                        supportCnt++;
                    }
                    evnt.support.name = evnt.artists[s].name;
                    evnt.support.denoter = support[evnt.support.name] || "*";
                    //console.log(denoters);
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
    scarey.visitorCheck();
    scarey.collapse();
    scarey.tour();
};



/*------------------------------------*\
    $DOCREADY
\*------------------------------------*/
$(document).ready(function() {
    //Inits
    scarey.nav();
    scarey.visitorCheck();
    scarey.collapse();
    scarey.tour();
});


