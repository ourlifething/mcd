import PortfolioWorks from "@/app/components/portfolioWorks";
import Link from "next/link";

export default function GraphicPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#fff", color: "#111", fontFamily: "sans-serif" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "30px 40px",
        borderBottom: "1px solid #eaeaea"
      }}>
        <h1 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "0.1em", margin: 0 }}>GRAPHIC</h1>
        <Link 
          href="/" 
          style={{ fontSize: "14px", letterSpacing: "0.1em", color: "#111", textDecoration: "none" }}
        >
          TOP
        </Link>
      </header>
      <div style={{ padding: "40px 20px" }}>
        <PortfolioWorks />
      </div>
    </main>
  );
}

