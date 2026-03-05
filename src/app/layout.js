import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "CineVault – Movie App",
  description: "Discover, track, and manage your favorite movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-[#0a0a0f] text-slate-200 antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 ml-64">
            <Navbar />
            <div className="flex-1 p-6">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
