const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,//上线打包不需要map检查，为了减小体积，不用map
  transpileDependencies: true,
  lintOnSave:false, /*关闭语法检查（eslink校验工具）*/

  //开启代理服务器(方式一)
  /*devServer: {
    proxy: 'http://localhost:5000'
  },*/
  //开启代理服务器(方式二)
  devServer: {
    proxy: {
      '/api': {  //代理服务器转发
        target: 'http://gmall-h5-api.atguigu.cn',
        //pathRewrite: {'^/api': ''},
        ws: true,//用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      },
      /*'/demo': {
        target: 'http://localhost:5001',
        pathRewrite: {'^/demo':''},
        ws: true,//用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      },*/
    }
  },

})
