<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
<!--      class="all"-class="sort"外面加父盒子，利用事件的委派，实现离开父亲区域才触发事件-->
      <div @mouseleave="leaveShow" @mouseenter="enterShow" @mou>
        <h2 class="all">全部商品分类</h2>
<!--        过度动画/*transition*/-->
        <transition name="sort">
<!--        一级联动-->
        <div class="sort" v-show="show">
<!--          事件的委派结合编程式导航实现路由的跳转与传递参数-->
          <div class="all-sort-list2" @click="goSearch">
            <div class="item " v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
              <h3 @mouseenter="changeIndex(index)">
<!--                自定义动态数据:data-categoryName="c1.categoryName"-->
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
              </h3>
<!--              二级联动-->
              <div class="item-list clearfix" :style="{display :currentIndex==index? 'block':'none'}">
                <div class="subitem" v-for="(c2,value) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
<!--                      自定义动态数据:data-categoryName="c1.categoryName"-->
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
<!--                      三级联动-->
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
<!--                        自定义动态数据:data-categoryName="c1.categoryName"-->
                        <a  :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
//引入方式：是把lodash全部函数引入
//最好引入方式：按需加载
import throttle from "lodash/throttle";
//import _ from 'lodash';
export default {
  name:'TypeNav',
  data(){
    return{
      //存储用户鼠标移到那个一级分类
      currentIndex:-1,
      show:true,
    }
  },
  //组件发送完毕，向服务器发送请求
  mounted(){

    //当组件挂载完毕，让show属性变为false
    //如果不是home路由，将三级导航栏进行影藏
    if(this.$route.path!='/home'){
      this.show=false
    }
  },
  computed:{
    ...mapState('home',['categoryList'])
  },

  methods:{
    //鼠标进入修改响应式currentIndex属性
    /*changeIndex(index){
      //index：鼠标移上某一个一级分类元素的索引值
      //正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）
      this.currentIndex=index
    },*/
    //throttle回调函数别使用箭头函数，可能出现上线文this
    changeIndex:throttle(function (index){
      //index：鼠标移上某一个一级分类元素的索引值
      //正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）
      this.currentIndex=index
    },50),
    //路由跳转的回调函数
    goSearch(e) {
      //最好的解决方案，事件的委派+编程式导航
      //利用事件的委派存在一些问题：
      //事件的委派：把所有的节点都委派给父情节点
      //点击a标签的时候，才会进行路由的跳转【如何确定一定是a标签】
      //c存在另外一个问题：如何确定是那集的a标签

      //第一个问题：把子节点a加上自定义属性data-categrylist树形，其余的节点是没有的
      let element=e.target
      //获取触发当前事件的节点【h3,a,dt】，需要带有属性data-categrylist的节点一定是a标签
      //节点有一个属性dataset，可以获取节点的自定义属性与属性值
      let {categoryname,category1id,category2id,category3id}=element.dataset
      //如果标签的身上有categrylist一定是a标签
      if(categoryname){
        //整理路由跳转的参数
        let location={name:'search'};
        let query={categoryName:categoryname}
        //第二个问题【区分一二三级分类的a标签】
        if(category1id){
          query.Category1Id= category1id;
        }else if(category2id){
          query.Category2Id=category2id;
        }else{
          query.Category3Id=category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，也要传递过去
        if(this.$route.params){
          //整理完参数
          location.params=this.$route.params
          location.query=query;
        }
        //路由的跳转
        this.$router.push(location)
      }
    },
    //当鼠标进入的时候，让商品分类列表进行展示
    enterShow(){
      if(this.$route.path!='/home'){
        this.show=true
      }
    },
    //当鼠标移出的时候，让商品分类列表进行影藏
    leaveShow(){
      this.currentIndex=-1
      //判断是search路由组件才执行
      if (this.$route.path!='/home'){
        this.show=false
      }
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            /*.item-list {
              display: block;
            }*/
          }
        }
        .cur{
          background-color: skyblue;
        }
      }
    }
    //过度动画的效果
    //过度动画开始的状态（进入）
    .sort-enter{
      height: 0px;
    }
      //过度动画结束的状态（进入）
    .sort-enter-to{
      height: 461px;
    }
    //定义动画的时间，速率
    .sort-enter-active{
      transition: all 0.5s linear;
    }
  }
}
</style>