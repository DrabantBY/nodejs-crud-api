import { resolve } from 'node:path';
import nodeExternals from 'webpack-node-externals';

export default {
	mode: 'production',
	target: 'node',
	entry: './src',
	output: {
		path: resolve('dist'),
		filename: 'bundle.cjs',
	},

	externals: [nodeExternals()],
};
