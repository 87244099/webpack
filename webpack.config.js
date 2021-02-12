const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename:"js/[name].src.js",
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test:/\.vue$/,
                use:[
                    "vue-loader",
                ]
            },
            
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: 'dist/template.html'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // path: path.resolve(__dirname, "dist/css"),
            filename: "css/[name].src.css"
        })
    ],
    resolve: {
        alias: {
            'vue$':  'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        },
        extensions: [".js", ".json", ".jsx", ".css", ".vue"],
    },
    externals: {
        jquery: 'jQuery',
        vue: 'Vue',
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
}