import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import {
  absoluteUrl,
  ORGANIZATION,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0799ba",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  // Pas de canonical ici : il serait hérité par toutes les pages qui n'en
  // définissent pas. Chaque page déclare le sien.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: "fr_CD",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icônes : app/icon.png et app/apple-icon.png (convention de fichiers Next).
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    url: SITE_URL,
    logo: absoluteUrl("/logo/logo-3.png"),
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.phone,
    description: SITE_DESCRIPTION,
    areaServed: [
      { "@type": "City", name: "Lubumbashi" },
      { "@type": "Country", name: "République démocratique du Congo" },
    ],
    knowsAbout: [
      "Informatique",
      "Intelligence artificielle",
      "Cybersécurité",
      "Développement web",
      "Auto-apprentissage",
      "Numérique responsable",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: ORGANIZATION.email,
      telephone: ORGANIZATION.phone,
      availableLanguage: ["French"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.address.street,
      addressLocality: ORGANIZATION.address.city,
      addressRegion: ORGANIZATION.address.region,
      addressCountry: ORGANIZATION.address.country,
    },
    sameAs: ORGANIZATION.sameAs,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "fr",
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${montserrat.className} antialiased`}
      >
        <JsonLd data={jsonLd} />
        {children}
      </body>
    </html>
  );
}
