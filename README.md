# Mind i — Website (v2)

Bilingual static website for **Mind i Research & Empowerment Center**.
Plain HTML, one CSS file, one small JavaScript file. No build step, no
framework, no third-party requests (fonts are self-hosted). Deploys on
Vercel or any static host as-is.

## Structure

```
index.html, about.html, programs.html, community.html, team.html, contact.html
team/                 one profile page per team member
programs/             program reports (srma-batch-2)
fa/                   Dari (right-to-left) version: same pages and folders
css/style.css         the one stylesheet, used by both languages
js/main.js            contact form only
fonts/                Literata and Vazirmatn (woff2, self-hosted)
assets/               logos, favicons, team photos, report photographs
```

The "دری" / "English" link opens the same page in the other language folder.

## Editing

- Colours and type: the variables at the top of `css/style.css`
  (`--lapis`, `--ink`, `--serif`, `--sans`, `--header-h`).
- The home first screen is sized to the viewport: the height is
  `100svh` minus the header. Its text sizes use `min(vw, vh)`, so the
  whole hero fits a laptop screen.
- Dari sizes and measures live in the "Dari type scale" section at the
  bottom of the stylesheet.
- The contact form posts to Web3Forms. The access key is a hidden field on
  `contact.html` and `fa/contact.html`.
