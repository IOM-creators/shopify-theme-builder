const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  watch: process.env.NODE_ENV === "development",

  entry: {
    global: {
      import: "./src/index.tsx",
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
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
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
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "global.css",
      runtime: false,
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
        {
          from: path
            .resolve(__dirname, "src/assets/icons/*.svg")
            .replaceAll("\\", "/"),
          to({ absoluteFilename }) {
            const p = `assets/${path.basename(absoluteFilename)}`;
            return path.resolve(__dirname, p);
          },
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
        common: {
          name: "vendor",
          type: "javascript/auto",
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimize: process.env.NODE_ENV !== "development",
    minimizer: [
      new TerserPlugin({
        // Stops license.txt files from generating
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat", // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
};
