/// <binding AfterBuild='Run - Development' />
'use strict';

var path = require('path');

module.exports = {
    context: __dirname + "/Scripts/App",
    entry: {
        commentBoxModule: './CommentBox/commentBox.js',
        postEditorModule: './PostEditor/postEditor.js'
    },
    output: {
        filename: "[name].js",
        path: __dirname + '/Scripts/Build'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            }
        ]
    }
}