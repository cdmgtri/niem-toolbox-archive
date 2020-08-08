
module.exports = {
  publicPath: '/',
  assetsDir: 'src/assets',

  devServer: {
    watchOptions: {
      poll: true
    }
  },

  configureWebpack: {
    devtool: 'source-map'
  },

  pwa: {
    name: 'NIEM Toolbox'
  },

  chainWebpack: config => {
    config.module
    .rule("comlink")
    .test(/\.worker\.js$/i)
    .use("comlink-loader")
    .lader("comlink-loader")
    .tap( options => {
      return { singleton: true }
    })
    .end()
  }

}
