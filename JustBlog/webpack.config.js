/// <binding AfterBuild='Run - Development' />
module.exports = {
    entry: "./Scripts/App/index.tsx",
    output: {
        filename: "./Scripts/Build/bundle.js"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { 
                test: /\.tsx?$/, 
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react']
                }
            }
        ]
    }
};