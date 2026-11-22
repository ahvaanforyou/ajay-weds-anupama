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

export const metadata: Metadata = {
  metadataBase: new URL("https://ajay-weds-anupama.vercel.app"),
  title: "Ajay & Anupama — South Indian Wedding Celebration | కల్యాణ వైభోగమే",
  description:
    "॥ శ్రీ గణేశాయ నమః ॥ We cordially invite you to celebrate the traditional Telugu Hindu wedding of Ajay and Anupama on Saturday, December 12, 2026 at GK Convention Hall, Eluru.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ajay-weds-anupama.vercel.app",
    siteName: "Ajay & Anupama Wedding Celebration",
    title: "Ajay & Anupama | Traditional Wedding Invitation",
    description:
      "॥ శ్రీ గణేశాయ నమః ॥ We joyfully invite you to celebrate our sacred wedding on Saturday, December 12, 2026 • 8:26 PM at GK Convention Hall, Eluru.",
    images: [
      {
        url: "https://ajay-weds-anupama.vercel.app/images/ajay-anupama-wedding-share.jpg",
        secureUrl: "https://ajay-weds-anupama.vercel.app/images/ajay-anupama-wedding-share.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Ajay & Anupama Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay & Anupama | Traditional Wedding Invitation",
    description:
      "॥ శ్రీ గణేశాయ నమః ॥ We joyfully invite you to celebrate our wedding on Saturday, December 12, 2026 at GK Convention Hall, Eluru.",
    images: ["https://ajay-weds-anupama.vercel.app/images/ajay-anupama-wedding-share.jpg"],
  },
  other: {
    image_src: "https://ajay-weds-anupama.vercel.app/images/ajay-anupama-wedding-share.jpg",
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
      <body className="min-h-screen bg-[#FFF8E9] text-[#4A0B1A] font-sans selection:bg-[#C9A45C]/30 selection:text-[#6D1429]">
        {children}
      </body>
    </html>
  );
}

