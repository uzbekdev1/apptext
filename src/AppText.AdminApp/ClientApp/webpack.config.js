const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}, argv = {}) => {

  const isProd = argv.mode === 'production';

  const config = {
    mode: argv.mode || 'development', // we default to development when no 'mode' arg is passed
    entry: {
      main: './src/main'
    },
    output: {
      path: path.resolve(__dirname, '../wwwroot/dist'),
      filename: isProd ? '[name].[hash].js' : '[name].js',
      publicPath: '/dist/'
    },
    resolve: {
      extensions: ['.mjs', '.ts', '.tsx', '.js'], // .mjs for react-icons
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          // Transpile .ts, .tsx and .js files
          test: /\.tsx?$/,
          loader: 'ts-loader',
          // exclude node_modules
          exclude: /node_modules/
        },
        { 
          test: /\.(png|jpg|jpeg|gif|svg)$/, 
          loader: 'url-loader?limit=8192' 
        },
        { 
          test: /\.(woff|woff2|eot|ttf)(\?|$)/, 
          loader: 'url-loader?limit=30000' 
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[hash].css': '[name].css',
        options: {
          hmr: ! isProd
        }
      }),
      new HtmlWebpackPlugin({
        filename: '../../Views/Admin/AppTextAdmin.cshtml',
        inject: 'body',
        template: './templates/AppTextAdminTemplate.cshtml',
        minify: false // To prevent breaking the ASP.NET core view
      }),
    ]
  };

  // Set environment-specific properties
  if (isProd) {
    config.devtool = 'source-map';
  } else { // development
    config.devtool = 'eval-source-map';
    config.devServer = {
      index: '', // specify to enable root proxying
      contentBase: path.resolve(__dirname, '../wwwroot/dist'),
      proxy: {
        context: () => true,
        target: 'https://localhost:5101',
        secure: false
      },
      hot: true
    }
  }

  return config;
};