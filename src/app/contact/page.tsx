'use client';

import ContactForm from "@/app/components/contactForm";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#fff", color: "#111", fontFamily: "sans-serif" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "30px 40px",
        borderBottom: "1px solid #eaeaea"
      }}>
        <h1 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "0.1em", margin: 0 }}>CONTACT</h1>
        <Link 
          href="/" 
          style={{ fontSize: "14px", letterSpacing: "0.1em", color: "#111", textDecoration: "none" }}
        >
          TOP
        </Link>
      </header>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 20px" }}>
        <ContactForm />
      </div>
    </main>
  );
}

