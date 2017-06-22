/// <binding AfterBuild='Run - Development' />
'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, "/Scripts/App"),
    entry: {
        commentBoxModule: './CommentBox/commentBox.js',
        postEditorModule: './PostEditor/postEditor.js'
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, '/Scripts/Build')
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", 'react']
                }
            }
        ]
    }
};