
module.exports = {
  assetsDir: 'src/assets',
  devServer: {
    watchOptions: {
      poll: true
    }
  },

  configureWebpack: (config) => {
    config.devtool = "source-map";
    config.module.rules = [
      {
        test: /\.worker\.js$/i,
        use: [
          {
            loader: "comlink-loader",
            options: {
              singleton: true
            }
          }
        ]
      },
      ...config.module.rules
    ]
  },

  pwa: {
    name: 'NIEM Toolbox'
  },

  productionSourceMap: false

}
