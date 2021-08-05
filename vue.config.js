const path = require('path')

// @vue/cli API: https://cli.vuejs.org/zh/config/
module.exports = {
  devServer: {
    proxy: {
      '/platserv': {
        // target: 'http://101.200.205.231:9018',
        target: 'http://101.200.205.231:9019',
        changeOrigin: true
      },
      '/resourceconfig': {
        // target: 'http://101.200.205.231:9018',
        target: 'http://101.200.205.231:9019',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
}
