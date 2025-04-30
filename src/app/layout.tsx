import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="jp">
      <body>
        <Header />
         <main>
          {children}
         </main>
        <Footer />
      </body>
    </html>
  );
}
