import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//统一引入api里面的所有请求函数
import *  as API from '@/api'
//按需引入element-ui
import {Button, MessageBox} from "element-ui";
//三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
//轮播图--全局组件
import Carousel from "@/components/Carousel";
//分页器---全局组件
import Pagination from "@/components/Pagination";
//第一个参数：全局组件的名字；第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//注册全局组件
Vue.component(Button.name,Button)
//注册element-ui，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入状态仓库
import store from '@/store';
//引入MockServe.js------mock数据
import '@/mock/mockServer';
//引入Swiper样式（几个组件都要用）
import 'swiper/css/swiper.css'
//引入插件
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading : ' dist/loading.gif' ,
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //注册路由（看kv一致，小写）
  //注册路由信息，在这里写router的时候，路由组件身上都有$route,$router信属性
  router,
  //注册仓库,组件实例的身上会多了一个$store的属性
  store,
  //配置全局事件总线
  beforeCreate() {
    //挂载在vue原型上，谁都可以使用
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  }
}).$mount('#app')
