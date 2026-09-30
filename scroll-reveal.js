(function () {
  "use strict";
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  var elements = document.querySelectorAll(
    ".hero-copy, .hero-image, .stats, .section-kicker, .chart-header, .chart-wrap, .race-card, .site-footer",
  );
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -24px 0px" },
  );
  elements.forEach(function (element) {
    // Leave already-visible content in place; animate only content entering below.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add("scroll-reveal");
    observer.observe(element);
  });
  document.addEventListener("focusin", function (event) {
    var parent = event.target.closest(".scroll-reveal");
    if (parent) {
      parent.classList.add("is-visible");
      observer.unobserve(parent);
    }
  });
})();
