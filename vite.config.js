import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [ // 配置 @ 指代 src
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
    ],
  },
  // 服务器配置
  server: {
    host: true,
    https: false, //是否启用 http 2
    cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
    open: false, //服务启动时自动在浏览器中打开应用`
    hmr: true, //禁用或配置 HMR 连接
    // 设置代理
    proxy: {
      "/dev-api": {
        target: 'http://159.75.178.32:8080',
        secure: false, 
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev-api/, '')
      },
    }
  }
})
