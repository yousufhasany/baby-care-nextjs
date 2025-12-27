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

import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    }
    const handleStorage = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };
  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Baby Care House Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-green-500 tracking-tight">Baby Care House</span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-zinc-700 dark:text-zinc-200 hover:text-green-500 transition font-medium">Home</a>
          <a href="/my-bookings" className="text-zinc-700 dark:text-zinc-200 hover:text-green-500 transition font-medium">My Bookings</a>
          {user ? (
            <>
              <a href="/profile" className="text-zinc-700 dark:text-zinc-200 hover:text-green-500 transition font-medium">{user.name}</a>
              <button onClick={handleLogout} className="text-zinc-700 dark:text-zinc-200 hover:text-red-500 transition font-medium">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="text-zinc-700 dark:text-zinc-200 hover:text-green-500 transition font-medium">Login</a>
              <a href="/register" className="text-zinc-700 dark:text-zinc-200 hover:text-green-500 transition font-medium">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    }
    const handleStorage = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-zinc-600 dark:text-zinc-300 text-sm">&copy; {new Date().getFullYear()} Baby Care House. All rights reserved.</div>
        <div className="flex gap-6 text-zinc-500 dark:text-zinc-400 text-sm">
          <a href="/" className="hover:text-green-500 transition">Home</a>
          <a href="/my-bookings" className="hover:text-green-500 transition">My Bookings</a>
          {user ? (
            <>
              <a href="/profile" className="hover:text-green-500 transition">{user.name}</a>
              <button onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
                window.location.href = "/login";
              }} className="hover:text-red-500 transition">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-green-500 transition">Login</a>
              <a href="/register" className="hover:text-green-500 transition">Register</a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
