# Mind i — Website

Bilingual static website for **Mind i Research & Empowerment Center**.
Plain HTML, CSS and a small JavaScript file. No build step, no framework.
Deploys on Vercel (or any static host) as-is.

## Structure

```
index.html, about.html, programs.html, community.html, team.html, contact.html
team/                 team profile pages (one per member)
programs/             program reports (srma-batch-2)
fa/                   Dari (RTL) version, same pages and folders
css/style.css         the one stylesheet, used by both languages
js/main.js            contact form only
assets/               logos, favicons, team photos, report photographs
```

Each page is a separate HTML file. The "دری" / "English" link opens the same
page in the other language folder.

## Editing

- Shared look: change the CSS variables at the top of `css/style.css`
  (`--lapis`, `--ink`, `--serif`, `--sans`, and so on).
- Dari headings and sizes are set in the "Dari type scale" section at the
  bottom of the same file.
- The contact form posts to Web3Forms. Its access key is in the `<form>`
  element on `contact.html` and `fa/contact.html`.
