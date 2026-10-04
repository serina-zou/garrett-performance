# Garrett Comer: Athlete Performance Site

**[View live site →](https://serina-zou.github.io/garrette-performance/)**

A responsive athlete profile and race archive for a high school cross-country runner, covering 26 races across the 2023–2025 seasons. The athlete, his coaches and his family can explore results and see how performance changes within and across seasons.

Built as my final project for SI 338 at the University of Michigan (Jan–Apr 2026).

**My role:** UX/UI design and front-end development (sole designer and developer)
**Built with:** HTML, CSS, JavaScript (canvas chart, no libraries or build step)

## Design decisions

- **Separating trend from noise.** Each season's chart has a dashed regression line and a grey season-average line, so a single bad race doesn't look like a decline.
- **Benchmarking the season opener.** The first race of a season has no earlier race to compare against, so its tooltip compares it to the previous season's average instead.
- **Even spacing.** The x-axis is indexed by race order rather than date, so races held close together don't bunch up.
- **Chart and archive work together.** Clicking a point on the chart scrolls to that race in the archive and highlights it. Season tabs on the chart are kept separate from the archive filters.

## Accessibility

- An expandable HTML data table gives keyboard and screen-reader users an alternative to the canvas chart.
- Skip navigation, visible focus states, descriptive photo text and `prefers-reduced-motion` support.
- Results still display without JavaScript, and layouts adapt to narrow screens.

## Data caveats

- The regression uses race order, not calendar time, and does not control for course or weather differences.
- Trend labels describe recorded times. They do not prove changes in fitness.
- The site is an archive through 2025, not a live results feed.

## Run locally

```bash
python3 -m http.server 8765
```
Then open http://localhost:8765.
