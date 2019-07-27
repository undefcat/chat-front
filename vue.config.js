module.exports = {
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
