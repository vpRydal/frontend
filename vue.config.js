module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/frontend/'
        : '/',
    transpileDependencies: ['vuex-module-decorators'],
    configureWebpack: {
    }
}
