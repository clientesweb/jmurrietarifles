/** @type {import('next').NextConfig} */
const path = require("path")

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@radix-ui/react-accordion",
    "@radix-ui/react-dialog",
    "@radix-ui/react-label",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-separator",
    "@radix-ui/react-tabs",
    "@radix-ui/react-use-callback-ref",
    "@radix-ui/react-use-controllable-state",
    "@radix-ui/react-use-previous",
    "@radix-ui/react-compose-refs",
    "@radix-ui/react-context",
    "@radix-ui/react-primitive",
    "@radix-ui/react-collection",
    "@radix-ui/react-direction",
    "@radix-ui/react-slot",
    "@radix-ui/react-id",
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@radix-ui/react-use-effect-event": path.resolve(__dirname, "./shims/use-effect-event.js"),
    }
    return config
  },
}

module.exports = nextConfig
