import type { Metadata } from "next";
import Header from "@/app/components/Reuseable/Header"
import Footer from "./components/Reuseable/Footer";
import ClientProviders from "./components/Reuseable/ClientProviders";
import "./globals.css";  
export const metadata: Metadata = {
  title: {
    default: "Mehria Mobiles — Mobile Phones & Accessories",
    template: "%s | Mehria Mobiles",
  },

  description:
    "Mehria Mobiles offers the latest mobile phones, smartphones, accessories, and quality mobile products at competitive prices.",

  keywords: [
    "Mehria Mobiles",
    "mobile phones",
    "smartphones",
    "mobile accessories",
    "buy mobile phones",
    "latest mobile phones",
    "Pakistan mobiles",
  ],

  authors: [
    {
      name: "Mehria Mobiles",
    },
  ],

  creator: "Mehria Mobiles",
  applicationName: "Mehria Mobiles",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    title: "Mehria Mobiles — Mobile Phones & Accessories",
    description:
      "Explore the latest mobile phones, smartphones, and accessories at Mehria Mobiles.",
    siteName: "Mehria Mobiles",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mehria Mobiles",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mehria Mobiles — Mobile Phones & Accessories",
    description:
      "Explore the latest mobile phones, smartphones, and accessories at Mehria Mobiles.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientProviders>
        <Header/>
        {children}
        <Footer/>
        </ClientProviders>
        </body>
    </html>
  );
}
