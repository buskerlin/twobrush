const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HotMiddleWareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

module.exports = {
    entry: [
        // 添加一个和HotMiddleWare通信的客户端
        HotMiddleWareConfig,
    	// 添加web应用入口文件
    	'./public/index.js'
    ],
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, './public/build')
    },
//  devtool: '#eval-source-map',
//  devServer: {
//      contentBase: path.join(__dirname, 'build'),
//      compress: false,
//      port: 8080,
//      host: '0.0.0.0',
//      hot: true,
//      inline: true
//  },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader?{"presets":["es2015"],"plugins": ["transform-object-rest-spread"]}',
                            css: 'vue-style-loader!css-loader'
                        }
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                            plugins: ['transform-object-rest-spread']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.vue'
        ],
        alias: {
            vue: path.resolve(__dirname, 'node_modules', 'vue', 'dist', 'vue.min.js')
        }
    },
//  devServer: {
//  	hot: false
//  },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: "body",
            template:  path.resolve(__dirname, './public/index.html'),
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};