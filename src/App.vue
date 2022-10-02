<template>
  <div id="app">
    <Header/>
<!--    路由组件出口的地方-->
    <router-view></router-view>
<!--    在Home,Search是显示的，在Loign,Register是隐藏的-->
    <Footer v-show="$route.meta.show "/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  model:{
    Home,Login,Register,Search
  },
  mounted() {
    //通知vuex发送请求，获取数据，存储于仓库当中
    //派发action//获取商品分类的三级列表的数据
    this.$store.dispatch('home/categoryList')
  }
}
</script>

<style lang="less">
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
