# Creative Brain

The personal design portfolio of Ankita Soni — built with React + Vite.
Live at **https://ankitasoni7.github.io**

> **This is not open-source.** The code, case-study writing and design assets in
> this repository are © 2026 Ankita Soni, all rights reserved. They are published
> so the site can be hosted, not for reuse. Please don't copy, fork-and-deploy, or
> republish any part of it — see [LICENSE](LICENSE). If you'd like to use
> something here, ask.

## Stack

- [React 18](https://react.dev)
- [Vite 5](https://vitejs.dev)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (default http://localhost:5173) in your browser.

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server              |
| `npm run build`   | Build for production into `dist/` |
| `npm run preview` | Preview the production build      |

## Structure

```
src/
  components/
    Header.jsx     # Logo + nav
    Hero.jsx       # Intro section
    Projects.jsx   # Project grid (placeholder data)
    Footer.jsx     # Contact
  App.jsx          # Page composition
  main.jsx         # Entry point
  styles.css       # Global styles
```

This is a bare-bones skeleton — extend the components and add pages/routing as the portfolio grows.
