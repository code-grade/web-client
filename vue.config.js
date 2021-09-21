module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pwa: {
        workboxOptions: {
            exclude: [/_redirects/]
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Code Grade";
                return args;
            })
    }
}
