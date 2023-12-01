const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  watch: process.env.NODE_ENV === "development",
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "assets"),
    chunkFilename: (pathData) =>
      pathData.chunk.name
        ? `${pathData.chunk.name.replace("-index-js", "")}.js`
        : "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: (pathData) => {
        return pathData.chunk.name
          ? `${pathData.chunk.name.replace("-index-js", "")}.css`
          : "[name].css";
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path
            .resolve(__dirname, "src/components/**/snippet.*.liquid")
            .replaceAll("\\", "/"),
          to({ absoluteFilename }) {
            const p = `snippets/${
              path.basename(absoluteFilename, ".liquid").split(".")[1]
            }.liquid`;
            return path.resolve(__dirname, p);
          },
        },
        {
          from: path
            .resolve(__dirname, "src/components/**/section.*.liquid")
            .replaceAll("\\", "/"),
          to({ absoluteFilename }) {
            const p = `sections/${
              path.basename(absoluteFilename, ".liquid").split(".")[1]
            }.liquid`;
            return path.resolve(__dirname, p);
          },
        },
        {
          from: path
            .resolve(__dirname, "src/assets/fonts/**/*.(woff|woff2)")
            .replaceAll("\\", "/"),
          to({ absoluteFilename }) {
            const p = `assets/${path.basename(absoluteFilename)}`;
            return path.resolve(__dirname, p);
          },
        },
      ],
    }),
  ],
};
