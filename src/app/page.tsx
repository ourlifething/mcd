import Link from "next/link";

export default function Home() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* 既存の共通ヘッダー・フッターのみ非表示にする */
        div[class*="header-title-wrapper"],
        footer:not(:last-of-type) {
          display: none !important;
        }
        /* メニューのホバーエフェクト */
        .menu-hover {
          opacity: 1;
          transition: opacity 0.25s ease;
        }
        .menu-hover:hover {
          opacity: 0.4;
        }
      `,
        }}
      />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "50px 40px",
          backgroundColor: "#ffffff",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              letterSpacing: "0.15em",
              color: "#333",
              fontWeight: "800",
            }}
          >
            MA.
          </span>
        </header>

        <div style={{ margin: "auto 0" }}>
          <nav
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div>
              <Link
                href="/graphic"
                className="menu-hover"
                style={{
                  fontSize: "clamp(32px, 6vw, 64px)",
                  fontWeight: "300",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  color: "#111",
                  display: "inline-block",
                }}
              >
                GRAPHIC
              </Link>
            </div>
            <div>
              <Link
                href="/apps"
                className="menu-hover"
                style={{
                  fontSize: "clamp(32px, 6vw, 64px)",
                  fontWeight: "300",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  color: "#111",
                  display: "inline-block",
                }}
              >
                APPS
              </Link>
            </div>
            <div>
              <Link
                href="/contact"
                className="menu-hover"
                style={{
                  fontSize: "clamp(32px, 6vw, 64px)",
                  fontWeight: "300",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  color: "#111",
                  display: "inline-block",
                }}
              >
                CONTACT
              </Link>
            </div>
          </nav>
        </div>

        <footer
          style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#999" }}
        >
          &copy; {new Date().getFullYear()}
        </footer>
      </main>
    </>
  );
}
