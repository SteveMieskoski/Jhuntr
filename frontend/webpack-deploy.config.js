const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const ManifestPlugin = require('webpack-manifest-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CompressionPlugin = require("compression-webpack-plugin");


const extractSCSS = new ExtractTextPlugin({filename: 'main.css'});

module.exports = {
    entry: {
        app: './src/root.module.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name]-[chunkhash].min.js'
    },
    devtool: 'source-map',
   // profile: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src', 'index.ejs'),
            filename: path.resolve(__dirname, './dist', 'index.html'),
            inject: true,
           // inject: false,
        }),
        new ManifestPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: "vendor",
            minChunks: function (module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: "vendorAngular",
            minChunks: function (module) {
                return module.context && module.context.indexOf("angular") !== -1;
            }
        }),
        new ngAnnotatePlugin({
            add: true,
        }),
        extractSCSS,
        new CopyWebpackPlugin([
            {from: 'src/assets/brand/drawing-medium.png'},
            {from: "vendor/please-wait.min.js.gz"},
            {from: "vendor/please-wait.css"},
            {from: "vendor/3-wave.css"},
            {from: "vendor/fine-uploader/not_available-generic.png"},
            {from: "vendor/fine-uploader/waiting-generic.png"},
            {from: "src/assets/brand/jhuntr-social-image.jpg"},
            {from: "src/assets/images/mrDefulto.png"},
            // {from: "src/components/creator/creator-display/displayTemplates/core.html"}
            {from: "src/components/creator/creator-display/displayTemplates/**/*.html"},
            {from: "src/components/creator/creator-style-edit/styleTemplates/*.html"},
            {from: 'src/components/creator/creator-details-edit/inputTemplates/*.html'},
            {from: 'src/components/creator/creator-display/popovers/*.html'}
            // {from: "src/**/*.html"}
        ]),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css|woff|woff2|eot|tff|png|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {test: /src.*\.js$/, use: {loader: 'babel-loader', options: {presets: ["env"]}}},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
          //  {test: /\.css$/, use: ExtractTextPlugin.extract({use: 'css-loader'})},
            {test: /\.scss$/, use: extractSCSS.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})},
           // {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.html$/, use: ['html-loader']},
           // {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/font-woff']},
           // {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/font-woff']},
           // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/octet-stream']},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?limit=8192&mimetype=application/font-woff']},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?limit=8192&mimetype=application/font-woff']},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?limit=8192&mimetype=application/octet-stream']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader']},
            {test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?limit=10000',
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false, // disabled
                            pngquant: {
                                floyd: 0.5,
                                speed: 2
                            },
                            svgo: {
                                plugins: [
                                    { removeTitle: true },
                                    { convertPathData: false }
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
};
