import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Resolve",
  description: "Powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className="bg-black text-white font-[figtree]">
        <main className="w-full min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
