const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const  PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {

  entry: './src/index.ts',
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
    //   {
    //     test: /\.html$/,
    //     use: [{
    //         loader: 'file-loader',
    //         options: {
    //             name: '[path][name].[ext]'
    //         }
    //     }]
    // },
    {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'] //style-loader 將css放入js的工具
    },
    {
        test: /\.(sass|scss)$/, //sassloader 
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
        ]
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

          }, 'ts-loader'],
        exclude: /node-modules/
      },
    ]
  }
  , plugins: [
    new CleanWebpackPlugin(),
     new HTMLWebpackPlugin({
      template: './src/index.html'
    }), new PrettierPlugin({
      printWidth: 80,               // Specify the length of line that the printer will wrap on.
      tabWidth: 2,                  // Specify the number of spaces per indentation-level.
      useTabs: false,               // Indent lines with tabs instead of spaces.
      semi: true,                   // Print semicolons at the ends of statements.
      encoding: 'utf-8',            // Which encoding scheme to use on files
      extensions: [ ".js", ".ts" ]  // Which file extensions to process
    })
  ],
  devtool: 'source-map',
  //用來設置引用模組
  target: 'web',
  resolve: {
    extensions: ['.ts', '.js']
  }
};