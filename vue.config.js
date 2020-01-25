
module.exports = {
  publicPath: '/niem-tool-template-vue/',
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
