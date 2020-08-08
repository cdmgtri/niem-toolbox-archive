
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
  }
}
