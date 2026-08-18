# Long screen images for the pinned phone showcase

Drop your full-length (tall) app screen here:

```
itinearydetail_pageui.png
```

It's referenced from `ProjectDetail.jsx` (Final Screens section) via
`<ItineraryShowcase pinned image="/screens/itinearydetail_pageui.png" notes={[]} />`.

- Export the **entire screen as one tall PNG** (e.g. width ~600px, height a few
  thousand px). The phone pins while the page scrolls, and this image scrolls
  inside it top-to-bottom (porty-style).
- Until the file exists, the built-in demo itinerary UI is shown instead
  (automatic fallback on image load error).
