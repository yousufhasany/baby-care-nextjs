"use client";
import { Navbar, Footer } from "./components/NavbarFooter";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}