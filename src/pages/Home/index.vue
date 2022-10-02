<template>
  <div>
<!--    Typenav已经注册为全局组件，因此不需要引入-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
<!--    //floor这个组件：自己内部是没有发请求的，数据是父组件给的-->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState} from "vuex";

export default {
  name:'Home',
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
  methods:{

  },
  computed:{
    ...mapState('home',['floorList'])
  },
  mounted() {
    //派发action，获取FloorList数据
    this.$store.dispatch('home/getFloorList')
    //派发action，获取用户信息在首页展示
    this.$store.dispatch('user/getUserInfo')
  },
}
</script>

<style  lang="less">

</style>