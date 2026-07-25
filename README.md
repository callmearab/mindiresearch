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

## The contact form

The form on `contact.html` / `fa/contact.html` submits to
[Web3Forms](https://web3forms.com) using the access key you provided:

```
0a3f7e56-72e1-44db-8212-b777fc35b9b1
```

Submissions are sent by Web3Forms to whatever inbox that access key is
registered to — no backend or server code is needed. To change the
destination inbox, or to add spam filtering / auto-replies, log in at
[web3forms.com](https://web3forms.com) with the email the key was created
with.

## Deploying to Vercel (free)

**Option A — no account needed yet, drag and drop**
1. Go to [vercel.com/new](https://vercel.com/new) and sign up (free).
2. Choose "Deploy" → drag the whole `mindi-website` folder onto the page.
3. Vercel detects it as a static site automatically — no settings to change.

**Option B — from GitHub (recommended for future updates)**
1. Push this folder to a new GitHub repository.
2. On [vercel.com/new](https://vercel.com/new), import that repository.
3. Leave every build setting empty/default (Framework Preset: *Other*) and
   click **Deploy**.

**Option C — Vercel CLI**
```
npm i -g vercel
cd mindi-website
vercel --prod
```

No environment variables or configuration files are required.

---

# ویبسایت Mind i

ویبسایت دو زبانه (انگلیسی / دری) برای **مرکز تحقیق و توانمندسازی Mind i**.
با HTML، CSS و جاوااسکریپت ساده — بدون نیاز به build یا فریمورک، آماده برای
دیپلوی رایگان روی Vercel، همان‌گونه که است.

## ساختار فایل‌ها

صفحات انگلیسی در ریشهٔ پروژه (`index.html`, `about.html`, `programs.html`,
`community.html`, `team.html`, `contact.html`) و نسخهٔ دری همان شش صفحه در
پوشهٔ `fa/` قرار دارند. هر صفحه یک فایل مستقل است — هیچ تبدیل زبان از طریق
جاوااسکریپت انجام نمی‌شود؛ دکمهٔ «EN / دری» در هدر، به سادگی صفحهٔ متناظر را
در پوشهٔ زبان دیگر باز می‌کند.

استایل (`css/style.css`) و جاوااسکریپت (`js/main.js`) میان هر دو زبان
مشترک اند.

## فورم تماس

فورم تماس با استفاده از سرویس [Web3Forms](https://web3forms.com) و کلید
دسترسی زیر پیام‌ها را ارسال می‌کند:

```
0a3f7e56-72e1-44db-8212-b777fc35b9b1
```

پیام‌ها مستقیماً به صندوق ایمیلی که این کلید برای آن ثبت شده، فرستاده
می‌شوند — نیازی به سرور یا بک‌اند نیست. برای تغییر ایمیل مقصد یا تنظیمات
بیشتر، وارد حساب خود در [web3forms.com](https://web3forms.com) شوید.

## دیپلوی روی Vercel (رایگان)

**روش ساده — بدون نیاز به تنظیم اضافی**
1. به [vercel.com/new](https://vercel.com/new) بروید و یک حساب رایگان بسازید.
2. کل پوشهٔ `mindi-website` را روی صفحه بکشید و رها کنید (drag & drop).
3. Vercel آن را به صورت خودکار به عنوان یک سایت استاتیک شناسایی و دیپلوی
   می‌کند — نیازی به تغییر هیچ تنظیمی نیست.

**روش دوم — از طریق GitHub (بهتر برای به‌روزرسانی‌های بعدی)**
1. این پوشه را در یک ریپازیتوری تازه در GitHub قرار دهید.
2. در [vercel.com/new](https://vercel.com/new) همان ریپازیتوری را ایمپورت
   کنید و روی **Deploy** کلیک کنید (تنظیمات را به حالت پیش‌فرض بگذارید).

هیچ متغیر محیطی یا فایل تنظیماتی اضافی لازم نیست.
