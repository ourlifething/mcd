import PortfolioWorks from "@/app/components/portfolioWorks";
import GraphicAuthModal from "./components/GraphicAuthModal";
import Link from "next/link";
import { cookies } from "next/headers";

export default function GraphicPage() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('graphic_auth');
  const isAuthenticated = authCookie?.value === 'true';

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#fff", color: "#111", fontFamily: "sans-serif", position: "relative" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "30px 40px",
        borderBottom: "1px solid #eaeaea",
        filter: isAuthenticated ? "none" : "blur(4px)",
        pointerEvents: isAuthenticated ? "auto" : "none",
        userSelect: isAuthenticated ? "auto" : "none"
      }}>
        <h1 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "0.1em", margin: 0 }}>GRAPHIC</h1>
        <Link 
          href="/" 
          style={{ fontSize: "14px", letterSpacing: "0.1em", color: "#111", textDecoration: "none" }}
        >
          TOP
        </Link>
      </header>
      
      <div style={{ 
        padding: "40px 20px",
        filter: isAuthenticated ? "none" : "blur(6px)",
        pointerEvents: isAuthenticated ? "auto" : "none",
        userSelect: isAuthenticated ? "auto" : "none",
        opacity: isAuthenticated ? 1 : 0.4
      }}>
        {isAuthenticated ? (
          <PortfolioWorks />
        ) : (
          <div style={{ maxWidth: "1080px", margin: "0 auto", textAlign: "center", padding: "100px 20px", color: "#ccc" }}>
            <p style={{ fontSize: "24px", fontWeight: "300", letterSpacing: "0.1em" }}>GRAPHIC PORTFOLIO</p>
          </div>
        )}
      </div>

      {!isAuthenticated && <GraphicAuthModal />}
    </main>
  );
}

