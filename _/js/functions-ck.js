/* -----------------------------------------------
HISTORY
------------------------------------------------ */(function(e,t){var n=e.History,r=e.jQuery,i=e.document;if(!n.enabled)return!1;r(function(){var t=".wrap",s=r(t).filter(":first"),o=s.get(0),u=r("#nav"),a="active",f=".active",l="a",c="statechangecomplete",h=r(e),p=r(i.body),d=n.getRootUrl(),v={duration:800,easing:"swing"};s.length===0&&(s=p);r.expr[":"].internal=function(e,t,n,i){var s=r(e),o=s.attr("href")||"",u;u=o.substring(0,d.length)===d||o.indexOf(":")===-1;return u};var m=function(e){var t=String(e).replace(/<\!DOCTYPE[^>]*>/i,"").replace(/<(html|head|body|title|meta|script)([\s\>])/gi,'<div class="document-$1"$2').replace(/<\/(html|head|body|title|meta|script)\>/gi,"</div>");return t};r.fn.ajaxify=function(){var e=r(this);e.find(".page-nav a").click(function(e){var t=r(this),i=t.attr("href"),s=t.attr("title")||null;if(e.which==2||e.metaKey)return!0;n.pushState(null,s,i);e.preventDefault();return!1});return e};p.ajaxify();h.bind("statechange",function(){var e=n.getState(),u=e.url,a=u.replace(d,"");p.addClass("loading");r.ajax({url:u,success:function(e,n,a){function y(e,t){r("html:not(:animated),body:not(:animated)").delay(t).animate({scrollTop:r("#"+e).offset().top},600)}var f=r(m(e)),l=f.find(".document-body:first"),c=l.find(t).filter(":first"),h,d,v;v=c.find(".document-script");v.length&&v.detach();d=c.html()||f.html();if(!d){i.location.href=u;return!1}s.html(d).ajaxify();navFly.init();i.title=f.find(".document-title:first").text();try{i.getElementsByTagName("title")[0].innerHTML=i.title.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(g){}v.each(function(){var e=r(this),t=e.text(),n=i.createElement("script");n.appendChild(i.createTextNode(t));o.appendChild(n)});r("#main-content").css({left:0,opacity:1});p.removeClass("loading")},error:function(e,t,n){i.location.href=u;return!1}})})})})(window);var navFly={init:function(){$(".more-nav").click(function(){$("#mobile-flyout").toggleClass("open");$(".main-content").toggleClass("dark");return!1})}};$(document).ready(function(){$("#main-content").css({opacity:1,left:0});$(".more-nav").click(function(){$("#mobile-flyout").toggleClass("open");$(".main-content").toggleClass("dark");return!1});$(".camera_wrap").camera({fx:"scrollHorz",autoAdvance:!1,mobileAutoAdvance:!1,loader:"none",transPeriod:"300",minHeight:"500px"});$(".camera_wrap2").camera({fx:"scrollHorz",autoAdvance:!1,mobileAutoAdvance:!1,loader:"none",transPeriod:"300",minHeight:"500px"})});