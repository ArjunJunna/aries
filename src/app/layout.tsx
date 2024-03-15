import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-Provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aries",
  description: "All in one design and documentation tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         
          {children}
         
        </ThemeProvider>
      </body>
    </html>
  );
}
