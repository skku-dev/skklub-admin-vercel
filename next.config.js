/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	generateEtags: false,
	async rewrites() {
		return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_API}/:path*`,
      },
    ];
	},
	images: {
		domains: ['s3.ap-northeast-2.amazonaws.com'],
	},
};

module.exports = nextConfig;
