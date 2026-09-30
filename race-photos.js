(function () {
  "use strict";
  var hover = window.matchMedia("(hover: hover) and (pointer: fine)");
  document.querySelectorAll(".race-card").forEach(function (card, index) {
    var img = card.querySelector(".race-img");
    if (!img) return;
    card.classList.add("has-photo");
    card.style.setProperty(
      "--race-photo",
      "url(" + JSON.stringify(img.getAttribute("src")) + ")",
    );
    var button = document.createElement("button");
    button.type = "button";
    button.className = "race-photo-toggle";
    button.setAttribute("aria-expanded", "false");
    var panel = document.createElement("div");
    panel.id = "race-photo-" + index;
    panel.className = "race-photo-panel";
    panel.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-controls", panel.id);
    button.setAttribute(
      "aria-label",
      "Show full photo: " + card.querySelector(".race-name").textContent.trim(),
    );
    var inner = document.createElement("div");
    inner.className = "race-photo-inner";
    inner.appendChild(img);
    var caption = document.createElement("p");
    caption.className = "race-photo-caption";
    caption.textContent =
      card.querySelector(".race-name").textContent.trim() +
      " · " +
      card.querySelector("time").textContent.trim();
    inner.appendChild(caption);
    panel.appendChild(inner);
    card.append(button, panel);
    var pinned = false;
    var closeTimer;
    var lastPointer = null;
    var suppressHover = false;
    function expand(open) {
      card.classList.toggle("is-expanded", open);
      button.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
      button.textContent = open ? "Close photo −" : "View full photo +";
      button.setAttribute(
        "aria-label",
        (open ? "Close photo: " : "Show full photo: ") +
          card.querySelector(".race-name").textContent.trim(),
      );
    }
    expand(false);
    // Layout changes can emit enter/leave without any real pointer movement.
    // Open only on physical movement, not on a moving card boundary.
    card.addEventListener("pointermove", function (e) {
      if (!hover.matches || e.pointerType === "touch" || suppressHover) return;
      clearTimeout(closeTimer);
      if (
        lastPointer &&
        lastPointer.x === e.clientX &&
        lastPointer.y === e.clientY
      )
        return;
      lastPointer = { x: e.clientX, y: e.clientY };
      expand(true);
    });
    card.addEventListener("pointerenter", function () {
      clearTimeout(closeTimer);
    });
    card.addEventListener("pointerleave", function () {
      suppressHover = false;
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () {
        if (
          !pinned &&
          !card.matches(":hover") &&
          !card.contains(document.activeElement)
        )
          expand(false);
      }, 200);
    });
    button.addEventListener("click", function () {
      clearTimeout(closeTimer);
      pinned = !card.classList.contains("is-expanded");
      suppressHover = !pinned;
      expand(pinned);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        clearTimeout(closeTimer);
        pinned = false;
        suppressHover = true;
        expand(false);
        button.focus();
      }
    });
    img.addEventListener("error", function () {
      card.classList.remove("has-photo", "is-expanded");
      card.style.removeProperty("--race-photo");
      button.remove();
      panel.remove();
    });
  });
})();
