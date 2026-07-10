# bookchaowalit-journal-frontend

A beautiful, personal journal application built with Next.js, featuring mood tracking, timeline views, and calendar integration.

## Features

- **Timeline View**: See your journal entries organized by date with a visual timeline
- **Mood Tracking**: Track and visualize your moods over time with color-coded entries
- **Calendar View**: Navigate your entries with an interactive calendar
- **Search & Filter**: Find entries by mood, tags, or content
- **MCP API**: Programmatic access to your journal entries via Model Context Protocol
- **Responsive Design**: Works beautifully on all devices
- **Markdown Support**: Write entries in Markdown with frontmatter metadata

## Project Structure

```
bookchaowalit-journal-frontend/
├── app/                    # Next.js app router
│   ├── api/mcp/           # MCP API endpoints
│   ├── calendar/          # Calendar view page
│   ├── journal/           # Journal pages
│   │   ├── [slug]/        # Individual entry pages
│   └── page.tsx           # Homepage with timeline
├── content/journal/       # Journal entries (MDX files)
├── lib/mdx.ts            # MDX utilities and data fetching
└── next.config.ts        # Next.js configuration
```

## Entry Format

Journal entries are stored as MDX files in `content/journal/` with frontmatter:

```mdx
---
title: My Day
date: 2026-02-22
mood: happy
tags: [gratitude, morning-thoughts]
---

# My Day

Today was a great day...
```

## API Endpoints

The app includes MCP (Model Context Protocol) API endpoints at `/api/mcp`:

- `get_entries` - Get all entries with optional filters
- `get_entry_by_slug` - Get a specific entry
- `get_entries_by_date` - Get entries by date range
- `get_moods` - Get all unique moods
- `search_entries` - Search journal content

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Building for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [MDX](https://mdxjs.com) - Markdown with React components
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [date-fns](https://date-fns.org) - Date manipulation
- [Lucide React](https://lucide.dev) - Icons

## Related

- **Mobile App:** [bookchaowalit-journal-mobile](https://github.com/bookchaowalit-mobile/bookchaowalit-journal-mobile)
- **Portfolio:** [bookchaowalit.com](https://bookchaowalit.com)

