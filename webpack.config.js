const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  watch: process.env.NODE_ENV === "development",

  entry: {
    main: {
      import: "./src/index.js",
      dependOn: "vendor",
    },
    vendor: ["preact", "swiper"],
  },
  devtool:
    process.env.NODE_ENV === "development" ? "eval-source-map" : "source-map",
  cache: {
    type: "filesystem",
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "assets"),
    chunkFilename: (pathData) =>
      pathData.chunk.name
        ? `${pathData.chunk.name.replace("-index-tsx", "")}.js`
        : "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // Stops url() imports (fonts) from running
              url: false,
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: (pathData) => {
        return pathData.chunk.name
          ? `${pathData.chunk.name.replace("-index-tsx", "")}.css`
          : "[name].css";
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path
            .resolve(__dirname, "src/**/snippet.*.liquid")
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
            .resolve(__dirname, "src/**/section.*.liquid")
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
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
