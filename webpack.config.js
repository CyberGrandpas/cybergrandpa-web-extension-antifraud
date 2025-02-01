const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const sveltePreprocess = require('svelte-preprocess');

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
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !isProduction,
            },
            emitCss: true,
            hotReload: !isProduction,
            preprocess: sveltePreprocess({
              sourceMap: !isProduction,
              scss: {
                prependData: '@import "./src/shared/styles/_variables.scss";',
              },
              typescript: {
                tsconfigFile: './tsconfig.json',
              },
            }),
          },
        },
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
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
            browser,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/shared/popup/popup.html',
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
            return Buffer.from(
              JSON.stringify({
                ...JSON.parse(content.toString()),
                version: process.env.npm_package_version,
              })
            );
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
