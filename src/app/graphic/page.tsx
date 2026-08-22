import PortfolioGrid from "./components/PortfolioGrid";
import GraphicAuthModal from "./components/GraphicAuthModal";
import Link from "next/link";
import { cookies } from "next/headers";

export default function GraphicPage() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("graphic_auth");
  const isAuthenticated = authCookie?.value === "true";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        color: "#111",
        fontFamily: "Helvetica Neue, Arial, Hiragino Sans, Meiryo, sans-serif",
        position: "relative",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 40px",
          borderBottom: "1px solid #eaeaea",
          filter: isAuthenticated ? "none" : "blur(4px)",
          pointerEvents: isAuthenticated ? "auto" : "none",
          userSelect: isAuthenticated ? "auto" : "none",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "700",
            letterSpacing: "0.22em",
            color: "#111",
            margin: 0,
          }}
        >
          Graphic
        </span>
        <Link
          href="/"
          style={{
            fontSize: "12px",
            letterSpacing: "0.2em",
            color: "#888",
            textDecoration: "none",
            fontWeight: "400",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            padding: "8px 18px",
            display: "inline-block",
            transition: "opacity 0.2s",
          }}
        >
          HOME
        </Link>
      </header>

      <div
        style={{
          filter: isAuthenticated ? "none" : "blur(6px)",
          pointerEvents: isAuthenticated ? "auto" : "none",
          userSelect: isAuthenticated ? "auto" : "none",
          opacity: isAuthenticated ? 1 : 0.4,
        }}
      >
        {isAuthenticated ? (
          <PortfolioGrid />
        ) : (
          <div
            style={{
              maxWidth: "1080px",
              margin: "0 auto",
              textAlign: "center",
              padding: "100px 20px",
              color: "#ccc",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "300",
                letterSpacing: "0.1em",
              }}
            >
              GRAPHIC PORTFOLIO
            </p>
          </div>
        )}
      </div>

      {!isAuthenticated && <GraphicAuthModal />}
    </main>
  );
}
