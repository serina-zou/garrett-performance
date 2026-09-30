# Garrett Comer — athlete journal

A responsive athlete profile and 2023–2025 cross-country race archive. Plain HTML, CSS and JavaScript; no build step.

## Preview

Run `python3 -m http.server 8765` in this directory, then open http://localhost:8765.

## Design

An editorial athlete introduction, career summary, season chart and compact race archive replace the original sidebar and card grid. The palette combines warm off-white, forest green and a pale lime accent. Existing athlete photographs and all 26 race records are retained.

References supplied by the site owner: [Wix Sports Psychologist template](https://www.wix.com/website-template/view/html/2583) and [The Last Tango](https://www.thelasttango.com/). No reference-site assets or code are copied.

## Behavior and accessibility

- Latest recorded season opens by default; chart tabs are independent of archive filters.
- Search and year filtering work together, with a visible live results count.
- Chart-point navigation clears archive filters so the destination can be reached.
- An expandable HTML data table gives a keyboard-accessible alternative to the canvas.
- Skip navigation, visible focus, reduced motion, descriptive photo text and narrow-screen layouts are included.
- Missing race photos do not render placeholder cards; results still display without JavaScript.

## Data caveats

The page is an archive through 2025, not a current athlete status feed. The supplied 5000m records remain unchanged. Distance is not independently parsed by the existing chart, so future additions must be checked for distance comparability. Regression uses race sequence, not elapsed calendar time; course and weather differences are not controlled. Trend labels describe recorded times rather than proving fitness changes.

## Verification

JavaScript syntax and preservation of all race names, dates, results and source links are checked. DOM interaction checks cover filtering, default season, chart switching and data-table navigation. Browser screenshots were blocked by the host's macOS browser-launch sandbox; desktop/mobile visual review is still required before publication.

Changes are local and have not been pushed or deployed.
