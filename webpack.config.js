const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {

  entry: './src/index.ts',
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
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
    new CleanWebpackPlugin(), new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  //用來設置引用模組
  resolve: {
    extensions: ['.ts', '.js']
  }
};