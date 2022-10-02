import Vue from "vue";
import Vuex from "vuex";
import {store} from "core-js/internals/reflect-metadata";
//需要使用插件一次
Vue.use(Vuex);

//引入小仓库
import home from "@/store/home";
import search from  './search'
import detail from '@/store/detail'
import shopcart from '@/store/shopcart'
import user from '@/store/user';
import trade from "@/store/trade";

//对外暴露store 类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块式开发存储数据
    modules:{
        home: home,
        search: search,
        detail: detail,
        shopcart:shopcart,
        trade:trade,
        user:user,
    }
})
