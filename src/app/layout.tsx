import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "victor — full-stack & AI app developer",
  description:
    "Full-stack and AI app developer. From vibe-coded prototype to production — App Store submissions, EU-compliant migrations, Stripe billing, and multi-agent automation.",
  openGraph: {
    title: "victor — full-stack & AI app developer",
    description:
      "I ship web & mobile apps that actually launch. App Store, EU/GDPR migrations, AI agents & automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
