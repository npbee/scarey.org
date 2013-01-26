$(function() {
    $(".more-nav").click(function() {
        $("#mobile-flyout").toggleClass("open");
        $(".main-content").toggleClass("dark");
        return false;
    });
});