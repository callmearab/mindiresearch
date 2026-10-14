# Mind i — Website

Bilingual (English / Dari) static website for **Mind i — Research & Empowerment
Center**. Plain HTML, CSS and JavaScript — no build step, no framework,
ready to deploy on Vercel's free tier as-is.

## Structure

```
mindi-website/
├── index.html          English home page
├── about.html           |
├── programs.html         > English pages
├── community.html        |
├── team.html              |
├── contact.html          contact page + form
├── fa/                  Dari (Afghanistan) version — same 6 pages
│   ├── index.html
│   ├── about.html
│   ├── programs.html
│   ├── community.html
│   ├── team.html
│   └── contact.html
├── css/style.css        one shared stylesheet (works for both directions)
├── js/main.js           one shared script (menu, form, back-to-top)
├── assets/              logos, icons, avatars
└── favicon.ico
```

Each page is a normal, separate HTML file — there is no client-side language
switch or content toggling. The "EN / دری" link in the header simply opens
the matching page in the other folder.


