const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const browser = process.env.BROWSER || 'chrome';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  entry: {
    popup: './src/shared/popup.ts',
    background: './src/shared/background.ts',
    contentScript: './src/shared/contentScript.ts',
  },
  output: {
    path: path.resolve(__dirname, `dist/${browser}`),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                outputStyle: isProduction ? 'compressed' : 'expanded',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      {
        type: 'javascript/auto',
        test: /manifest\.json$/,
        use: {
          loader: 'wext-manifest-loader',
          options: {
            usePackageJSONVersion: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/shared/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `src/browsers/${browser}/manifest.json`,
          to: 'manifest.json',
          transform(content) {
            return Buffer.from(JSON.stringify({
              ...JSON.parse(content.toString()),
              version: process.env.npm_package_version,
            }));
          },
        },
        {
          from: 'src/shared/assets',
          to: 'assets',
          noErrorOnMissing: true,
        },
      ],
    }),
    ...(isProduction
      ? [
          new ZipPlugin({
            path: path.resolve(__dirname, 'dist'),
            filename: `${browser}.zip`,
            extension: 'zip',
          }),
        ]
      : []),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
};
