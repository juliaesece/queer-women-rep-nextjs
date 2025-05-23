import type { Metadata } from "next";
import "./globals.css";
import NavConductor from "./_nav-components/NavConductor";
import { Analytics } from "@vercel/analytics/react"
import Footer from "./_layout-components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Everything Sapphic",
  description: "A collective database of sapphic representation in media, where you can filter for the kind of representation you're searching for.",
};

interface DashboardProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: DashboardProps) {

  return (
    <html lang="en">
      <body>
        <Analytics />
        <NavConductor />
        {children}
        <Suspense>
          <Footer />
        </Suspense>
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
