/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    reactStrictMode: false,
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
