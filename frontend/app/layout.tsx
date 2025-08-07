import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ClientProviders from "./client-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neza - Find Local Services & Trusted Providers",
  description: "Connect with skilled local service providers in your area. From home repairs to tutoring, find trusted professionals for all your needs.",
  keywords: "local services, service providers, home repair, tutoring, cleaning, plumbing, electrician, local business",
  openGraph: {
    title: "Neza - Your Local Services Marketplace",
    description: "Find and book trusted local service providers in your neighborhood. Simple, reliable, community-focused.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
