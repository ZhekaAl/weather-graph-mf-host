const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack'); 
const path = require("path");

// const styleRules = require('./styles');


const isProd = process.env.NODE_ENV === 'production';

const miniCssExtractLoader = isProd
? {
    loader: MiniCssExtractPlugin.loader,
    options: {
        esModule: false,
    },
}
: {
    loader: 'style-loader',
    options: {
        esModule: false,
    },
};

 const cssLoader = {
    loader: 'css-loader',
};

const cssModuleLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 1,
        modules: {
            localIdentName: '[local]_[hash:base64:5]',
        },
    },
};

const babelLoader = {
  loader: 'babel-loader',
  options: {
     configFile:  './\.babelrc.js',
  },
 };

module.exports = {
  entry: "./src/index",
  mode: isProd ? 'production' : 'development',
  devServer: isProd ? undefined : {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: '/',
    },
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  optimization: isProd ? {
    minimize: true,
    minimizer: [new TerserPlugin()],
   } : undefined,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(tsx|ts)$/,
        use: [babelLoader],
        exclude: /node_modules/,
      },
       {
        test: /\.css$/,
        use: [miniCssExtractLoader, cssLoader],
        exclude: /\.module\.css$/,
    },
     {
        test: /\.css$/,
        use: [miniCssExtractLoader, cssModuleLoader],
        include: /\.module\.css$/,
    },
    {
      test: /\.component\.svg$/,
      use: [
          {
           loader: 'babel-loader',
           options: {
              configFile:  './\.babelrc.js',
           },
          },
          {
              loader: '@svgr/webpack',
               options: {
                   babel: false,
                   svgoConfig: {
                      plugins: {
                        removeViewBox: false
                      }
                    }
               },
          },
      ],
   },
   {
    test: /\.inline\.svg$/,
    type: 'asset/resource',
   }
  ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
        "./Button": "./src/Button",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(''),
     },
    ),
  ],
};
