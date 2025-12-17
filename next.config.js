/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  reactStrictMode: false, // Disable to fix Leaflet double initialization
}

module.exports = nextConfig
