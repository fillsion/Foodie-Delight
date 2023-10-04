module.exports = {
    presets: [
        ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": "3.19.0", // or 2,
            "targets": {
                "android": "54" // babel is for debug, it make code compatible android webview, so compatible my genymotion android webview is enough
            },
            "exclude": ["@babel/plugin-transform-regenerator", "@babel/plugin-transform-arrow-functions"]
        }],
        "@babel/preset-react",
    ],
    exclude: [/node_modules\/react/, /node_modules\/urijs/, /node_modules\/axios/]
}