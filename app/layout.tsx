import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

config.autoAddCss = false;

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connell Boyce - Identity and Access Management",
  description: "connellboyce.com identity and access management portal",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} h-full antialiased [scrollbar-gutter:stable] has-[dialog[open]]:overflow-hidden`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        {children}
        <Footer />
        <CursorGlow />
      </body>
    </html>
  );
}
