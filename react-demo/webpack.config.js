const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
    const mode = env.production ? 'production' : 'development';

    process.env.NODE_ENV = mode;
    return {
        entry: path.resolve(__dirname, './src/index.js'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './dist')
        },
        mode,
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
            }, {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader?modules', 'less-loader']
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, './index.tpl.html')})
        ],
        devtool: mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            host: '0.0.0.0'
        }
    }
};
