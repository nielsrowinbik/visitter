/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["prisma"], // https://github.com/prisma/prisma/issues/16117,
    swcPlugins: [["next-superjson-plugin", {}]],
  },
};

module.exports = nextConfig;
