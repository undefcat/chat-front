module.exports = {
  publicPath: '/dist',
  devServer: {
    proxy: {
      '^/ws': {
        target: 'http://localhost',
        ws: true,
        changeOrigin: true,
      },
    },
  },
}