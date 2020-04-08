(function() {
  var credits = document.querySelectorAll(".credit");
  Array.prototype.forEach.call(credits, function(credit) {
    credit.addEventListener("focusin", function() {
      credit.classList.add("credit--focused");
    });
    credit.addEventListener("focusout", function() {
      credit.classList.remove("credit--focused");
    });
  });
})();
