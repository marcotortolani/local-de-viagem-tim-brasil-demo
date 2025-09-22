// src/components/GoogleAnalyticsLoader.tsx
import Script from 'next/script'

const endpoint = process.env.NEXT_PUBLIC_API_URL

export default async function GoogleAnalyticsLoader() {
  if (!endpoint) return null

  try {
    const res = await fetch(`${endpoint}/google-analytics`)

    if (!res.ok) return null

    const { googleAnalyticsId } = await res.json()

    if (googleAnalyticsId) {
      // Inyectar <script> con el GA
      return (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}
          </Script>
        </>
      )
    }
  } catch (error) {
    console.error('GA Fetch Error:', error)
    return null
  }
}
