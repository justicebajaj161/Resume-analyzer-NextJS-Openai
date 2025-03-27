/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: false,
        responseLimit: '10mb',
      },
};

export default nextConfig;
