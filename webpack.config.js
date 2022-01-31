const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const  PrettierPlugin = require("prettier-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack")

const entries = {
  'main': ['./src/client/pages/main/index.ts'],
  'chatRoom': ['./src/client/pages/chatRoom/index.ts']
}

module.exports = {

  entry: entries,
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/index.[hash].js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
    {
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader'
        }
      ],
    },

      {
        test: /\.ts$/,
        //use順序由後往前執行
        use: [
          { //配置babel
            loader: 'babel-loader',
            options: {
              //設置預定義環境
              presets: [
                [
                  //指定環境的差件
                  '@babel/preset-env',
                  //配置信息
                  {
                    targets: {
                      "chrome": 88
                    },
                    //指定corejs版本
                    "corejs": "3",
                    //使用corejs方式 "usage"表示案需求加載
                    "useBuiltIns": 'usage'
                  }

                ]
              ]
            }

          },{
            loader:'ts-loader',
            options:{
              //希望在前端環境下可以使用tree shaking
              configFile:'tsconfigClient.json'
            }
          } ],
        exclude: /node-modules/
      },
    ]
  }
  , plugins: [
    new CleanWebpackPlugin(),

    new CopyPlugin({
      patterns: [{
        from: "assets",
        to: "assets",
        force: true,
        noErrorOnMissing: true
      }]
    }),
    new HTMLWebpackPlugin({
      filename: '[name]/main.html',  //輸出名
      chunks: ['main'], //指定入口js是哪個部分
      template: './src/client/pages/main/index.html', //輸入指定的資料夾與檔案
      title: 'Webpack前端自動化開發',
      description: 'Webpack前端自動化開發，tailwind+typeScript',
      Keywords: '測試連動',
    }), new HTMLWebpackPlugin({
      filename: '[name]/chatRoom.html',
      chunks: ['chatRoom'],
      template: './src/client/pages/chatRoom/index.html',
      title: 'Webpack前端自動化開發',
      description: 'Webpack前端自動化開發，tailwind+typeScript',
      Keywords: '測試連動',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/index.[hash].css'
    }),
    new PrettierPlugin({
      printWidth: 80,               // Specify the length of line that the printer will wrap on.
      tabWidth: 2,                  // Specify the number of spaces per indentation-level.
      useTabs: false,               // Indent lines with tabs instead of spaces.
      semi: true,                   // Print semicolons at the ends of statements.
      encoding: 'utf-8',            // Which encoding scheme to use on files
      extensions: [ ".js", ".ts" ]  // Which file extensions to process
    }),
    new CompressionPlugin(),
    new HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  //用來設置引用模組
  target: 'web',
  resolve: {
    extensions: [".ts", ".js"],
    alias:{
      "@":  path.resolve(__dirname, 'src'),
    }
  },
  devServer: {
    static: './dist',
  },

};