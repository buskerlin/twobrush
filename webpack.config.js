const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HotScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
const hotjs = "./dev/recieveReLoad.js"; //入口文件之一，接受reload事件 缺点：会直接刷新页面

const hotScript = "webpack-hot-middleware/client?reload=true"; //不能hotload就reload
const acceptHot = "./dev/acceptHot.js";

module.exports = {
	//这样配置无法接受.html的更新内容
//  entry: {
//  	// 添加web应用入口文件 和HotMiddleWare通信
//  	index:[Hot,'./public/index.js'],
//  	manage:[Hot,'./public/js/manage.main.js']
//  },
	//会直接刷新页面
//	entry: {
//	  	index:[hotjs,'./public/index.js'],
//	  	manage:[hotjs,'./public/js/manage.main.js']
//	  },
	entry: {
	  	index:[HotScript,'./public/index.js'],
	  	manage:[HotScript,'./public/manage.main.js']
	},
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: "/"
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
                test: /\.(png|jpg|ttf|eot|woff)$/,
                use: ['file-loader']
            },
            {
		      test: /\.json$/,
		      loader: 'json-loader'
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
            inject: false,
            template:  path.resolve(__dirname, './public/index.html'),
            hash: false
        }),
        new HtmlWebpackPlugin({
            filename: 'manage.html',
            favicon:"./public/img/favicon.ico",
            inject: false,
            template:  path.resolve(__dirname, './public/manage.html'),
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};