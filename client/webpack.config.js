const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const path = require('path');

module.exports = (env) => ({
  entry: './src/index.js', //точка входа
  output: {
    filename: 'main.[contenthash].js',
    publicPath: '/',
  }, //что получаем на выходе
  module: {
    rules: [
      // {
      //   test: /\.svg$/,
      //   use: [
      //     { loader: 'svg-sprite-loader' },
      //     'svg-transform-loader',
      //     'svgo-loader',
      //   ],
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    static: path.join(__dirname, 'assets'),
  },
});
