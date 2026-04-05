/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        minimumCacheTTL: 2678400,
        deviceSizes: [640, 1080, 1920],
    },
};



export default nextConfig;
