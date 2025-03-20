import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Katrīna Puķe Portfolio",
  description: "Portfolio of Katrīna Puķe, multimedia artist and graphic designer from Riga, Latvia",
  applicationName: "Katrīna Puķe Portfolio",
  keywords: ["Katrīna Puķe", "Portfolio", "Multimedia Artist", "Graphic Designer", "Riga", "Latvia"],
  authors: [{ name: "Katrīna Puķe" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.katrinapuke.com",
    title: "Katrīna Puķe Portfolio",
    description: "Explore the portfolio of Katrīna Puķe, a talented multimedia artist and graphic designer from Riga, Latvia.",
    images: [
      {
        url: "https://www.katrinapuke.com/portfolio-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Katrīna Puķe Portfolio Cover Image",
      },
    ],
  },
  robots: "index, follow",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const themeColor = "#f3f4f6"
export const colorScheme = "light"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T2RFCXR93R"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T2RFCXR93R');
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
