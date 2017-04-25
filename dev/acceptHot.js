
//置于入口文件的代码之后，告诉webpack-hot-middle可热加载啊

if(module.hot) {
    module.hot.accept();
}