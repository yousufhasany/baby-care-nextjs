import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Baby Care House | Trusted Baby Sitting & Elderly Care Service Platform",
  description: "Baby Care House provides trusted, secure, and accessible caregiving services for children, elderly, and sick family members. Book caretakers, track bookings, and receive email invoices all from one platform.",
  openGraph: {
    title: "Baby Care House | Trusted Baby Sitting & Elderly Care Service Platform",
    description: "Baby Care House provides trusted, secure, and accessible caregiving services for children, elderly, and sick family members. Book caretakers, track bookings, and receive email invoices all from one platform.",
    url: "https://babycare.house/",
    siteName: "Baby Care House",
    images: [
      {
        url: "/file.svg",
        width: 1200,
        height: 630,
        alt: "Baby Care House caregiving platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import ClientLayout from "./ClientLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
