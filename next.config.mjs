/** @type {import('next').NextConfig} */
const nextConfig = {
  // Screenshots are already small WebP files; no need to spend server time resizing them
  images: { unoptimized: true },
};

export default nextConfig;
