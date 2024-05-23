/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	generateEtags: false,
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: `${process.env.NEXT_PUBLIC_API}/:path*`,
			},
		];
	},
	images: {
		domains: ['s3.ap-northeast-2.amazonaws.com'],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
