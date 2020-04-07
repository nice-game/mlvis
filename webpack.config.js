const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = (env) => {
	const prod = env && env.prod;
	const mode = prod ? "production" : "development";
	const optimization = prod ? { minimizer: [new TerserPlugin({})] } : undefined;

	const outdir = path.join(__dirname, "dist");

	return {
		mode,
		entry: "./src/react.tsx",
		devtool: "source-map",
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					include: /src/,
					use: [{ loader: "ts-loader" }],
				},
				{
					test: /\.scss$/,
					use: ["style-loader", "css-loader", "sass-loader"],
				},
			],
		},
		output: { path: outdir, filename: "react.js" },
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
			plugins: [new TsconfigPathsPlugin()],
		},
		plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
		optimization,
		devServer: {
			contentBase: outdir,
			compress: true,
			port: 9000,
		},
	};
};
