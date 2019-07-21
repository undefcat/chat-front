module.exports = {
  devServer: {
    proxy: {
      '^/ws': {
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}