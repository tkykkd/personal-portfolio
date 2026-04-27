# TAKAYUKI KIDO Portfolio (Ver 7.0)

`personal-portfolio` is the primary website project.

## Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- motion + lucide-react

## Features

- Dark modern portfolio layout
- Multi-language switcher (`日本語 / English / ไทย / 中文`)
- Profile, strengths, achievements, certifications, contact sections
- Local static assets in `public/` for profile/certification images

## Local Preview

```bash
npm install
npm run dev -- --port 3000 --host localhost
```

Open: `http://localhost:3000`

## Production Build

```bash
npm run build
```

## Deploy Notes

- Recommended: GitHub Pages or Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
