import type { Metadata, Viewport } from "next";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Todo Mío", template: "%s · Todo Mío" },
  description: "Compra en línea con stock en tiempo real en nuestras tiendas de República Dominicana.",
  applicationName: "Todo Mío",
  appleWebApp: { capable: true, title: "Todo Mío", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#0b6e4f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-DO">
      <body>
        {children}
        <footer className="footer">
          <div className="container">© {new Date().getFullYear()} Todo Mío · Precios en pesos dominicanos (RD$)</div>
        </footer>
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
