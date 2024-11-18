import { resolve } from 'node:path';
import nodeExternals from 'webpack-node-externals';

export default {
	mode: 'production',
	target: 'node',
	entry: './src/index.ts',
	output: {
		path: resolve('dist'),
		filename: 'bundle.cjs',
	},
	externals: [nodeExternals()],

	resolve: {
		extensions: ['.ts'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
				exclude: /node_modules/,
			},
		],
	},
};
