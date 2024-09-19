/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  eslint: {
    // Warning: Disabling ESLint during builds is not recommended.
    // This skips ESLint during builds.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript type checking during build
  },
};

export default nextConfig;
