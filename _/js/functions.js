$(function() {
    $(".more-nav").click(function() {
        $("#mobile-flyout").toggleClass("open");
        $(".main-content").toggleClass("dark");
        return false;
    });

    //$("#page-nav a").pjax("#main-content", { fragment: "#main-content" });
   $(document).pjax('#page-nav a', '#main-content');
});