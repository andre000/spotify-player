/* eslint-disable no-console */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  console.log('-------------------');
  console.log('ENVIRONMENT:', env.NODE_ENV);
  console.log('-------------------');

  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|dist)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: '> 5% in BR' },
                ],
              ],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: env.NODE_ENV,
      }),
    ],
  };
};
