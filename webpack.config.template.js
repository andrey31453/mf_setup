// не переписывать
// данный файл сгенерирован автоматически

const html_webpack = require('html-webpack-plugin')
const { ModuleFederationPlugin: module_federation } =
	require('webpack').container
const path = require('path')
const copy_webpack = require('copy-webpack-plugin')

const dist = path.join(__dirname, 'dist/')
const src = path.join(__dirname, 'src/')

require('dotenv').config({ path: './.env' })
const { env } = process

const get_serve = (dev) => {
	if (!dev) return undefined

	return {
		hot: true,
		port: env.app1_port,
		static: dist,
		allowedHosts: 'all',
	}
}

module.exports = ({ dev }) => ({
	entry: {
		index: src + 'index',
	},

	mode: dev ? 'development' : 'production',
	devtool: dev ? 'eval-source-map' : undefined,
	target: ['browserslist'],
	devServer: get_serve(dev),

	output: {
		clean: true,
		path: dist,
		filename: '[name].[hash:8].js',
		assetModuleFilename: '[name].[hash:8][ext]',
		sourceMapFilename: '[name].[hash:8].map',
		chunkFilename: '[id].[hash:8].js',
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
		alias: {
			'@': src,
		},
	},

	module: {
		rules: [
			// ts
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},

			// js
			{
				test: /\.(js|jsx)$/i,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
						},
					},
				],
			},

			// css
			{
				test: /\.(scss|css|sass)$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: dev ? true : false,
						},
					},
				],
			},

			// files
			{
				test: /\.(png|jpg|webp|ico|json)$/i,
				type: 'asset/resource',
			},

			// svg
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader',
			},
		],
	},

	plugins: [
		new html_webpack({
			template: src + 'index.html',
		}),

		new copy_webpack({
			patterns: [
				{
					from: src + 'static',
					to: dist + 'assets',
					noErrorOnMissing: true,
				},
			],
		}),
	],
})
