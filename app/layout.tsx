import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
export const metadata: Metadata = { title: "Field Notes | Bookchaowalit", description: "A personal journal of moods, work, and the things that become clear after writing them down.", metadataBase: new URL("https://bookchaowalit.com"), robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>
  {/* THESIS: A journal is a field instrument for noticing, so the reading surface must hold attention before it categorizes.
OWN-WORLD: A field notebook / naturalist log: warm paper, forest ink, weather marks, dated margins, quiet archive rows.
STORY: Arrive at the current observation, scan the mood register, then follow dated notes into the archive.
FIRST VIEWPORT: The notebook thesis, latest entry, and first five timeline marks appear before the archive.
FORM: Entries are read as dated notes; mood dots and topic tags are wayfinding, not decorative cards; direction seed 4a4bb795.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
  <Analytics /><SpeedInsights />{children}</body></html>; }
