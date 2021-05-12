const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    popup: path.join(__dirname, "src", "popup.js"),
    options: path.join(__dirname, "src", "options.js"),
    background: path.join(__dirname, "src", "background.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "style-loader!css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              useRelativePath: true,
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
    //babel도 넣을지 생각해봐야댐 지금으로썬 굳이?
    //이거 나중에 통합할지 봐야됨
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "src", "popup.html"),
    //   filename: "popup.html",
    //   chunks: ["popup"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "src", "options.html"),
    //   filename: "options.html",
    //   chunks: ["options"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "src", "background.html"),
    //   filename: "background.html",
    //   chunks: ["background"],
    // }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
