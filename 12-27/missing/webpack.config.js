const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let obj = {
    mode: 'development',
    entry: {
        index: './inx.js'
    },
    output:{
        path:path.resolve(__dirname,'./bulid'),
        filename:'bulid.js',
    },
    devServer: {
        contentBase:"./",
        hot: true,
        port: 8080,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html'
        })
    ]
}
module.exports = obj;