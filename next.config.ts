import { withNextVideo } from "next-video/process";
import type { NextConfig } from 'next'
import { buildConfigs  } from "@/config";

const operatorCountry = process.env.NEXT_PUBLIC_OPERATOR_COUNTRY;
const config = buildConfigs[operatorCountry as keyof typeof buildConfigs || "test"];

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
  env: {
    NEXT_PUBLIC_OPERATOR_COUNTRY: operatorCountry || "test",
    NEXT_PUBLIC_API_URL: config.apiUrl,
    NEXT_PUBLIC_PROD_URL: config.prodUrl,
    NEXT_PUBLIC_LANDING_SUBSCRIPTION: config.landingSubscription ,
    NEXT_PUBLIC_ENDPOINT_ADDITIONAL_COMPONENTS: config.endpointAdditionalComponents,
    NEXT_PUBLIC_URL_CHATBOT: config.chatbot,
    ENDPOINT_VALIDATION_HASH: config.apiUrl + "wp-json/api/v1/validate_hash/",    
    ENDPOINT_CREATE_USER: "https://api.gaming.moob.club/api/v1/createuser",
  },
  distDir: operatorCountry ? `.next-${operatorCountry}` : '.next', // Cambia la carpeta de salida dinámicamente
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-sa-east-1.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'player.vimeo.com'
      },
      {
        protocol: 'https',
        hostname: 'vimeo.com'
      }
    ],
    loader: 'custom',
    loaderFile: 'src/components/LoadingImage.tsx',
  },
}

export default withNextVideo(nextConfig);