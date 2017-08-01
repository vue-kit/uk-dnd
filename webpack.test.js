const webpack = require("webpack");

module.exports = {
    entry: "./test/index.js",
    output: {
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
