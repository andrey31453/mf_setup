const html_webpack = require('html-webpack-plugin')
const copy_webpack = require('copy-webpack-plugin')
const tsconfig_paths = require('tsconfig-paths-webpack-plugin')

const dist = __dirname + '/dist/'
const src = __dirname + '/src/'

module.exports = ({ dev }) => ({
  entry: {
    index: src + 'index',
  },

  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-source-map' : undefined,
  target: ['browserslist'],

  optimization: {
    splitChunks: false,
  },

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
    plugins: [new tsconfig_paths()],
  },

  module: {
    rules: [
      // ts
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
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
