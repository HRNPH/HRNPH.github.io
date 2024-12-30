import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	output: 'export',
	images: {
		unoptimized: true,
	},
	// headers: async () => [
	// 	{
	// 		source: "/",
	// 		headers: [
	// 			{
	// 				key: "Cache-Control",
	// 				value: "no-store",
	// 			},
	// 		],
	// 	},
	// ],
};

export default nextConfig;
