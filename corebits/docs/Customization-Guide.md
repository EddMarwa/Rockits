## CoreBits — Customization Guide (Non‑Developer Friendly)

This site is built with Next.js (a website framework) and Tailwind CSS (a styling system). You don’t need to know the language to make basic changes. Use this guide to change words, colors, and add simple pages.

### 1) How to run the site locally
- Open a terminal in the project folder.
- Install dependencies once: `npm install`
- Start the dev server: `npm run dev`
- Open `http://localhost:3000` in your browser. The page updates automatically when you save files.

### 2) How the project is organized  
- `src/app/` — Pages and layouts.
  - `src/app/layout.tsx` — Global layout for the default (non‑localized) pages.
  - `src/app/[locale]/` — Language‑aware pages (English `en`, Chinese `zh`).
    - `src/app/[locale]/layout.tsx` — Layout for language pages (sets background, text color, and font).
    - Inside this folder, each subfolder (like `about`, `contact`) has a `page.tsx` which is the page content.
- `src/components/` — Reusable UI blocks (navigation, footer, forms, feature cards, etc.).
- `src/i18n/` — Text translations.
  - `src/i18n/dictionaries/en.json` — English words/phrases.
  - `src/i18n/dictionaries/zh.json` — Chinese words/phrases.
  - `src/i18n/index.ts` — Language setup (supported languages and loading of dictionaries).
- `src/app/globals.css` — Global styles and Tailwind theme setup (fonts, smooth scroll, etc.).
- `public/` — Images and static files (logos, icons, certificates, etc.).

### 3) Changing words and labels (text/content)
Most on‑screen text comes from the language dictionaries, not hardcoded in components. Edit these:
- English: `src/i18n/dictionaries/en.json`
- Chinese: `src/i18n/dictionaries/zh.json`

Examples you can change:
- Navigation labels under `nav` (e.g., `home`, `about`, `contact`).
- Hero section: `hero.headline`, `hero.subheadline`, `hero.cta`.
- Sections: `features.title`, `contact.title`, `footer.terms`, etc.

Tips:
- Keep the JSON valid: use double quotes, commas between entries, and matching braces.
- If you add a new key in English, add it in Chinese too (same key, translated value) to avoid missing text.

### 4) Changing colors, fonts, and styles
This project uses Tailwind CSS utility classes right in the markup.

Where to start:
- Background and text color for localized pages are set in `src/app/[locale]/layout.tsx` on the `<body>` element. Look for classes like `bg-[#0F172A]` (background) and `text-[#F1F5F9]` (text). Replace these hex values with your colors.
- Global font is set via Google Fonts in `src/app/[locale]/layout.tsx` using Poppins. To change font weights or family, edit the `Poppins` config there. Also check `src/app/globals.css` for `--font-poppins` usage.
- Component‑level colors (buttons, cards, etc.) are in the component files under `src/components/` as Tailwind classes, e.g., `bg-blue-600`, `text-slate-100`, `border-zinc-800`.

How to modify a component’s style:
1. Open the relevant file in `src/components/` (e.g., `Footer.tsx`, `LandingNavbar.tsx`, `FeaturesGrid.tsx`).
2. Change Tailwind classes on the elements. Examples:
   - `bg-[#0F172A]` → `bg-black`
   - `text-[#F1F5F9]` → `text-white`
   - `rounded-lg` → `rounded-xl`
   - `p-4` → `p-6`

Tailwind color palette and utilities:
- You can use named colors (e.g., `bg-blue-600`, `text-slate-200`) or custom hex like `bg-[#123456]`.
- Spacing: `p-4`, `py-6`, `mt-8`.
- Typography: `text-sm`, `text-xl`, `font-semibold`.
- Borders & radius: `border`, `border-slate-700`, `rounded-md`.
- Effects: `shadow-lg`, `hover:bg-blue-700`, `transition`.

### 5) Changing images and logos
- Put files into `public/` (or its subfolders). Example: `public/images/partners/bitcoin.svg`.
- Reference them in components with a path beginning with `/`, e.g., `/images/partners/bitcoin.svg`.

### 6) Adding or editing a page
Localized pages live under `src/app/[locale]/`. To add a new page (say, `pricing`):
1. Create a folder: `src/app/[locale]/pricing/`.
2. Create `page.tsx` inside it with a basic component structure.
3. Add navigation text for the new page in `en.json` and `zh.json` (e.g., `nav.pricing`).
4. Link to it from your navbar component (`src/components/LandingNavbar.tsx` or `Navbar.tsx`).

Minimal example for a new page component (replace the text as needed):
```tsx
// src/app/[locale]/pricing/page.tsx
export default function PricingPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <p className="text-slate-300">Our mining plans and rates.</p>
    </main>
  );
}
```

### 7) Editing navigation links
- Open `src/components/LandingNavbar.tsx` or `src/components/Navbar.tsx`.
- Update the link list or add a new link to your page path (e.g., `/{locale}/pricing`).
- Update `en.json` and `zh.json` to show the right label in both languages.

### 8) Changing forms and buttons
- For the email notify section, see `src/components/NotifyForm.tsx`.
- For the contact page form, see `src/components/ContactForm.tsx`.
- Button text usually comes from the dictionaries (e.g., `notify.button`, `contact.submit`). Style via Tailwind classes like `bg-blue-600 text-white px-4 py-2 rounded-lg`.

### 9) Translations and languages
- Supported languages are defined in `src/i18n/index.ts` via `locales: ['en', 'zh']` and `defaultLocale: 'en'`.
- To add a new language (example: Malay `ms`):
  1. Add `ms` to `locales` in `src/i18n/index.ts`.
  2. Create `src/i18n/dictionaries/ms.json` with keys matching `en.json`.
  3. Update navigation to link to `/{locale}` paths for the new language if needed.

### 10) Where colors for the whole site are set
- Primary background/text for localized pages: `src/app/[locale]/layout.tsx` on the `<body>` classes.
- Additional base styles: `src/app/globals.css`. The `@theme inline` section defines the default sans font from Poppins.

### 11) Common tasks quick reference
- Change main headline: edit `hero.headline` in `en.json` and `zh.json`.
- Change footer phrase: edit `footer.made` in both dictionaries.
- Change theme background: modify `bg-[#0F172A]` in `src/app/[locale]/layout.tsx`.
- Change global text color: modify `text-[#F1F5F9]` in the same file.
- Replace a partner logo: drop the new file into `public/images/partners/` and update its path in the relevant component.

### 12) Troubleshooting
- After editing JSON, if the page breaks, check for missing commas or quotes.
- If style changes don’t appear, verify you edited the correct component and class names, then hard refresh the browser.
- If a new page returns 404, confirm the folder name and that it contains `page.tsx` under `src/app/[locale]/`.

That’s it! With this guide you can safely change words, colors, and simple pages without deep coding knowledge.


