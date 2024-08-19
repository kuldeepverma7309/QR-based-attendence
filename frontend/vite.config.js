// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
};