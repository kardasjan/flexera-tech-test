const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack")

module.exports = {
  entry: {
    js: ['babel-polyfill', './src/index.js'],
    vendor: ['react']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('0.22'), 
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      'process.env': {
        API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
        NODE_ENV: JSON.stringify(process.env.REACT_APP_NODE_ENV)
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

