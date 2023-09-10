module.exports = {
  webpack: function override(webpackConfig) {
    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    })

    return webpackConfig
  },
  devServer: function (configDevServer) {
    return function (proxy, allowedHosts) {
      return configDevServer(proxy, allowedHosts)
    }
  },
}
