import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cinzel = localFont({
  src: "./fonts/Cinzel-Variable.ttf",
  variable: "--font-cinzel",
  weight: "400 900",
  display: "swap",
});

const cormorant = localFont({
  src: "./fonts/CormorantGaramond-Variable.ttf",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});

const notoTelugu = localFont({
  src: "./fonts/NotoSerifTelugu-Variable.ttf",
  variable: "--font-noto-telugu",
  weight: "100 900",
  display: "swap",
});

const plusJakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable.ttf",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

const siteUrl = "https://ajay-weds-anupama.vercel.app";
const shareImageUrl = `${siteUrl}/images/ajay-anupama-wedding-share.jpg?v=5`;
const shareSquareUrl = `${siteUrl}/images/ajay-anupama-wedding-square.jpg?v=5`;
const shareTitle = "Ajay Kumar & Anupama — Wedding Invitation | Dec 12, 2026";
const shareDescription =
  "We joyfully invite you and your family to celebrate the sacred wedding of Ajay Kumar and Anupama on Saturday, December 12, 2026 at GK Convention Hall, Eluru.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: shareTitle,
  description: shareDescription,
  applicationName: "Ajay Kumar & Anupama Wedding",
  authors: [{ name: "Ajay Kumar & Anupama" }],
  creator: "Ajay Kumar & Anupama",
  publisher: "Ajay Kumar & Anupama",
  keywords: [
    "Ajay Kumar Anupama Wedding",
    "Ajay Kumar weds Anupama",
    "Telugu Wedding Invitation",
    "GK Convention Hall Eluru",
    "December 12 2026 Wedding",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Ajay Kumar & Anupama Wedding Celebration",
    title: "Ajay Kumar & Anupama — Wedding Invitation",
    description: shareDescription,
    images: [
      {
        url: shareImageUrl,
        secureUrl: shareImageUrl,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Ajay Kumar & Anupama Wedding Invitation",
      },
      {
        url: shareSquareUrl,
        secureUrl: shareSquareUrl,
        width: 600,
        height: 600,
        type: "image/jpeg",
        alt: "Ajay Kumar & Anupama Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Kumar & Anupama — Wedding Invitation",
    description: shareDescription,
    images: [shareImageUrl],
  },
  other: {
    "theme-color": "#6D1429",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${cinzel.variable} ${cormorant.variable} ${notoTelugu.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <head>
        {/* Core Primary Meta */}
        <title>{shareTitle}</title>
        <meta name="title" content={shareTitle} />
        <meta name="description" content={shareDescription} />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="Ajay Kumar & Anupama Wedding Celebration" />
        <meta property="og:title" content="Ajay Kumar & Anupama — Wedding Invitation" />
        <meta property="og:description" content={shareDescription} />
        <meta property="og:image" content={shareImageUrl} />
        <meta property="og:image:secure_url" content={shareImageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ajay Kumar & Anupama Wedding Invitation" />
        <meta property="og:locale" content="en_IN" />

        {/* Legacy Scrapers & WhatsApp Image Fallback */}
        <link rel="image_src" href={shareImageUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="Ajay Kumar & Anupama — Wedding Invitation" />
        <meta name="twitter:description" content={shareDescription} />
        <meta name="twitter:image" content={shareImageUrl} />

        {/* Theme & Mobile Browser Bar */}
        <meta name="theme-color" content="#6D1429" />
        <meta name="msapplication-TileColor" content="#6D1429" />
      </head>
      <body className="min-h-screen bg-[#FFF8E9] text-[#4A0B1A] font-sans selection:bg-[#C9A45C]/30 selection:text-[#6D1429]">
        {children}
      </body>
    </html>
  );
}
