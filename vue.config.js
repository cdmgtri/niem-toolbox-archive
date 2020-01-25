
module.exports = {
  publicPath: '/niem-assistant/',
  assetsDir: 'src/assets',
  devServer: {
    watchOptions: {
      poll: true
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
