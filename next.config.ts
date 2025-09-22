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
    GOOGLE_CLIENT_EMAIL: "memotest-qgv@portal-qgv.iam.gserviceaccount.com",
    GOOGLE_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDP0kbnxjqClAoj\nuMMdPuabsHyzWQr/+WxgF+/pG6mrFp9xOMXZ2MNEpMuwl/Isuwc4PGGhdpNWO3L3\nB592dsReL3R29RTaQ1MHVPacUNVXZZcwdI/RhnocX8Rz6/rCyEHvI/MR39lGMGoj\nBhBSvfiZfhkJskAMHCcZi54wvcvXeO3g59xdgksTSUnD1/6ksBb8s5uIfvclEyEy\ns+z9Nzlm/fSL426kUu8O5xudfsHq1iykmgdpGqU3ntQwME9Exn+bCv3ArIc3jaOn\n3erGcNiEWJnJxQoRDGxH8sk5vuPLRcjokfPmkXbSRsiAPC04iwSfh3AuG/Onz6P6\n8MyEaCTVAgMBAAECggEAH+jFglOUKvXYE2FhyV0dw3dMblfpscv2W/rQ7MCWmJ0X\nS3x6xIGH2e5ZEtBXGuR3WKciG8ySatcjRn12epYEfgGt/Ds9QcC8lY+cyKY7W6P5\nnDMJh2kChCt1hTxiewM3PHoPRFtT3SG/P4lwJYQ4Zjj6VzF2AWYBNZGTxHV1QFbG\nF0IpnlwEe09G3YAqqz4G8TyfMQKyg7doBls4yBUY7IlDgAz8fHPpMXPfNU8Xb3rp\ne8kLWcvGv1HCAzRMspNvJKIwsMNw4SDBDNmeGQ3KUtaUkfNSX/4cztFjtP1/mhQg\nqqkmpXbULYHeIFqvaLqGsTQLNHiNjo7RXEW0cuhDsQKBgQD1hhtHnRKvaO+3Cnl6\nHeoX6NjEAISMEWxpCzbX9N0EukWKA70UyY+x1w/6v/f2qYyeVo9aldfZYvJPYVuH\niektgHnu+6A73XI4R0jWXGFiOar8/cRSaHAuEa1+9e4g/q+2c8ZrntcEih1qyIqT\ntA9+uKo5e1s8Fm1XFb2Tw1/G4wKBgQDYsFdCwH8A759K9j9odIGf2Mal7nBOFLjF\nk3GSLxwjmts3yW9VtqkuFrTisUTvULIKjkqJNDqKJjThWmyT/tag5mWA8JClMZBs\nsXu72Nk0Zs81h1Dl15yykgnL84c9VOuvpFbyhXXie7P5w65ZbBQC+XwfPvQW37s+\nIQazBdb65wKBgQCMk+CCvHi6XocCcsjjFsW2MugKMZGy8Tb1XipktBroXg762vEk\nOdRAqzbHB6teW+3bqwwhfbI9Ed5TfRb/IAOWvf0SzJgOLtj7SDV4JyTLLOGuQU5r\nMMkqV4zTKNTTp3/MI7X0YNoUC1CUl4Zg07QbhnhQuUSfvueT+Sq2tCLeqQKBgHge\nuSDN6RmxvBIoE9ppy3m7B9PwK9186zjLlYe+CdFLBP8V8VwImBxuhfOs5VPs3eWw\nH22TwGfY6jOKluoruPsU/WvO78BDi5ZVhQwLF81OuMspqhTfw4PSJRAkffHn44dI\niNKEXWchwBFTApGbsjQ77Sy9Dz6m4/t6/2W6dQQ9AoGBAIfs2v+4c43tUhdjPFtv\nIPVZ91GDYiZBjOi5hna/u66HiO2HsRjviKbEMYDDI5W35wO7vOtQdHOHnoss46PX\nvzYeTRkLFVxibDwGx1OukgTc6aUcMgSbUzqVAHeYjNRdIeXfl7Zk3rT36IehOb/v\nOWhv56IShooi+kxuWKxJjn/W\n-----END PRIVATE KEY-----\n"
  },
  distDir: operatorCountry ? `.next-${operatorCountry}` : '.next', // Cambia la carpeta de salida dinámicamente
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-sa-east-1.amazonaws.com'
      }
    ],
    loader: 'custom',
    loaderFile: 'src/components/LoadingImage.tsx',
  },
}

export default withNextVideo(nextConfig);