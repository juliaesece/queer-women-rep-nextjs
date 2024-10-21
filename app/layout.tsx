import type { Metadata } from "next";
import "./globals.css";
import NavConductor from "./_nav-components/NavConductor";
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: "Queer women rep",
  description: "Generated by create next app",
};

interface DashboardProps {
  children: React.ReactNode;
  params: { supercategory: string, page: string }
}

export default function RootLayout({ children, params }: DashboardProps) {
  const {supercategory, page} = params
  
  return (
    <html lang="en">
      <body>
        <Analytics />
        <NavConductor/>
        {children}
        </body>
    </html>
  );
}
