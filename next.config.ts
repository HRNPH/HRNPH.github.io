import type { NextConfig } from "next";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	webpack: (config) => {
		// Add TypeScript extensions if not already included
		config.resolve.extensions.push(".ts", ".tsx");

		// Provide a fallback for the fs module
		config.resolve.fallback = { ...config.resolve.fallback, fs: false };

		// Add Node polyfills for browser compatibility
		config.plugins.push(new NodePolyfillPlugin());

		// Copy WASM and model files so they can be fetched at runtime
		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm",
						to: "static/chunks/pages",
					},
					{
						from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm",
						to: "static/chunks/pages",
					},
					{
						from: "./node_modules/kokoro-js/dist/kokoro.web.js",
						to: "static/chunks/pages",
					},
				],
			})
		);

		// See https://webpack.js.org/configuration/resolve/#resolvealias
		config.resolve.alias = {
			...config.resolve.alias,
			"sharp$": false,
			"onnxruntime-node$": false,
		}
		return config;
	},
	headers: async () => [
		{
			source: '/:path*',
			headers: [
				{
					key: 'Cross-Origin-Embedder-Policy',
					value: 'require-corp',
				},
				{
					key: 'Cross-Origin-Opener-Policy',
					value: 'same-origin',
				},
			],
		},
		{
			source: '/:path*.wasm',
			headers: [
				{
					key: 'Content-Type',
					value: 'application/wasm',
				},
			],
		},
	],
};

export default nextConfig;