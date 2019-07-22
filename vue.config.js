module.exports = {
  publicPath: '/dist',
  devServer: {
    proxy: {
      '^/ws': {
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
}