(function () {
  var expanders = document.querySelectorAll(".expander");

  Array.prototype.forEach.call(expanders, function (expander) {
    var content = expander.querySelector(".content");
    var button = expander.querySelector("button");

    if (!button) return;

    button.addEventListener("click", function (evt) {
      var expanded = button.getAttribute("aria-expanded") === "true" || false;
      button.setAttribute("aria-expanded", !expanded);
      content.hidden = expanded;
    });
  });
})();
