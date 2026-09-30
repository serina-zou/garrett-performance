(function () {
  "use strict";

  document.querySelectorAll("img.race-img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.remove();
    });
  });
  /* ── ELEMENTS ───────────────────────────────────────── */
  var searchInput = document.getElementById("race-search");
  var statusRegion = document.getElementById("race-status");
  var noResults = document.getElementById("no-results");
  var raceItems = Array.from(document.querySelectorAll("#race-list li"));

  /* ── 1 & 2. SEARCH + YEAR FILTER ───────────────────── */
  function getActiveYear() {
    var checked = document.querySelector('input[name="season"]:checked');
    return checked ? checked.value : "all";
  }

  function applyFilters() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    var year = getActiveYear();
    var visible = 0;

    raceItems.forEach(function (li) {
      var article = li.querySelector(".race-card");
      if (!article) return;

      var name = (article.dataset.name || "").toLowerCase();
      var cardYear = article.dataset.year || "";

      var matchSearch = query === "" || name.includes(query);
      var matchYear = year === "all" || cardYear === year;

      var show = matchSearch && matchYear;
      li.hidden = !show;
      if (show) visible++;
    });

    if (noResults) noResults.hidden = visible > 0;

    if (statusRegion) {
      statusRegion.textContent =
        visible === 0
          ? "No races match your search."
          : visible + " race" + (visible === 1 ? "" : "s") + " shown.";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  document.querySelectorAll('input[name="season"]').forEach(function (radio) {
    radio.addEventListener("change", applyFilters);
  });

  applyFilters();
  document.getElementById("race-total").textContent = raceItems.length;
  document.addEventListener("show-all-races", function () {
    searchInput.value = "";
    document.getElementById("f-all").checked = true;
    applyFilters();
  });
  document.addEventListener("click", function (event) {
    if (event.target.closest(".chart-table a"))
      document.dispatchEvent(new Event("show-all-races"));
  });

  /* ── 3. SCROLL-TO-TOP BUTTON ────────────────────────── */
  var scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-top-btn";
  scrollBtn.innerHTML =
    '<svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M17 18L12 13L7 18M17 11L12 6L7 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  scrollBtn.setAttribute("aria-label", "Scroll back to top");
  document.body.appendChild(scrollBtn);

  window.addEventListener(
    "scroll",
    function () {
      scrollBtn.classList.toggle("visible", window.scrollY > 300);
    },
    { passive: true },
  );

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  });
})();
