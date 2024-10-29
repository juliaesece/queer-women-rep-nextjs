import type { Metadata } from "next";
import "./globals.css";
import NavConductor from "./_nav-components/NavConductor";
import { Analytics } from "@vercel/analytics/react"
import Footer from "./_layout-components/Footer";

export const metadata: Metadata = {
  title: "Queer women rep",
  description: "Collective database of sapphic representation in media",
};

interface DashboardProps {
  children: React.ReactNode;
  params: { supercategory: string, page: string }
}

export default function RootLayout({ children, params }: DashboardProps) {

  return (
    <html lang="en">
      <body>
          <Analytics />
          <NavConductor />
          {children}
          <Footer />  
      </body>
    </html>
  );
}
