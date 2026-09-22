import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScrollSmoothScroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Funda",
  description: "Funda - Apprenez l’informatique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${montserrat.className} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
