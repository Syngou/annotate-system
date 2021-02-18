module.exports = {
    assetsDir: "static/",
    configureWebpack: {
        resolve: {
            alias: {
                assets: "@/assets",
                network: "@/api",
            },
        },
    },
};
