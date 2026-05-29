# Daphne Chepkirui - Portfolio

Personal portfolio site for frontend work across healthcare, insurance, fintech, edtech, and enterprise products.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**

## Getting started

```bash
cd daphne-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

| File | Purpose |
|------|---------|
| `src/data/site.ts` | Name, email, links, tagline |
| `src/data/projects.ts` | Project cards, categories, confidential flags |
| `src/data/experience.ts` | Timeline entries |
| `src/data/skills.ts` | Skill groups |

## Deploy

Deploy to [Vercel](https://vercel.com) (recommended):

```bash
npm run build
```

Or connect the `daphne-portfolio` repo to Vercel for automatic deploys on push.

## Resume PDF (optional)

Place your resume at `public/resume.pdf` and link it from the Hero section if desired.

## Project structure

```
src/
  app/           # Layout, page, global styles
  components/    # UI sections
  data/          # Content (edit here, no code changes needed)
```
