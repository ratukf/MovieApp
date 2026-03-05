import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AppShell } from "@/components/layout/Appshell";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Movie App",
  description: "Discover, track, and manage your favorite movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Suspense>
            <AppShell>{children}</AppShell>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
