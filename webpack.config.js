var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { config } = require('process');

module.exports =(env,options)=> {
    const mode = options.mode

    const config = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        port: 9000,
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
            test: /\.(css|scss|sass)$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
            },
        {
            test: /\.(ts|tsx)$/,
            exclude: /(node_modules)/,
            use: ['babel-loader'],
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    }
    return config
}