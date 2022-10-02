<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Carousel :list="bannerList"/>
<!--        <div class="swiper-container" ref="mySwiper">-->
<!--          <div class="swiper-wrapper">-->
<!--            <div class="swiper-slide" v-for="(carousel,index) in bannerList" :key="carousel.id">-->
<!--              <img :src="carousel.imgUrl" />-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
<!--          <div class="swiper-pagination"></div>-->
<!--          &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;-->
<!--          <div class="swiper-button-prev"></div>-->
<!--          <div class="swiper-button-next"></div>-->
<!--        </div>-->
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
//import Swiper from 'swiper';
export default {
  name:'ListContainer',
  mounted() {
    //console.log('组件挂载了')
    //派发action 通知vuex发起ajax请求。将数据存储在仓库中
    this.$store.dispatch('home/getBannerList');
    //在new Swiper实例之前，页面的结构中必须要有【new Swiper实例放在这里不行】
    //因为dispitch当中涉及到异步语句，导致v-for便利的时候结构还不完整
    //笨方法：
    /*
    setTimeout(()=>{
      //console.log('组件实例来了')
      var mySwiper = new Swiper (document.querySelector('.swiper-container'), {
        //direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable:true, //点击小圆点切换图片，默认false
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // 如果需要滚动条
      })
    },2000)
     */
  },
  computed:{
    ...mapState('home',['bannerList'])
  },
  watch:{
    //监听bannerList的变化：这条数据发生变化-------由空数组变为有四个元素
    // bannerList:{
    //     deep:true,
    //     handler(newValue,oldValue){
    //     //通过watch监听bannerList属性的属性值的变化
    //     // 如果执行hanndle方法，代表组件的实例身上这个属性的属性已经有了【数组：四个元素】
    //       //当执行这个结构，只能确定bannerList数据已经有了，但是没办法确认v-for已经执行完毕了【数据有了，但是模板还没加载完毕，结构不完整】
    //       //v-for执行完毕，才有结构【没办法决定】
    //       //在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM
    //       this.$nextTick(()=>{
    //         //当执行这个结构，确定bannerList数据已经有了，v-for已经执行完毕了【数据有了，模板加载完毕，结构完整】
    //         var mySwiper = new Swiper (this.$refs.mySwiper, {
    //           //direction: 'vertical', // 垂直切换选项
    //           loop: true, // 循环模式选项
    //           // 如果需要分页器
    //           pagination: {
    //             el: '.swiper-pagination',
    //             clickable:true, //点击小圆点切换图片，默认false
    //           },
    //           // 如果需要前进后退按钮
    //           navigation: {
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev',
    //           },
    //           // 如果需要滚动条
    //           /*scrollbar: {
    //             el: '.swiper-scrollbar',
    //           },*/
    //         })
    //       })
    //     }
    // }
}

}
</script>
<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;
  .sortList {
    height: 464px;
    padding-left: 210px;
    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }
    .right {
      float: left;
      width: 250px;
      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;
        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;
          .fl {
            float: left;
          }
          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }
        .news-list {
          padding: 5px 15px;
          line-height: 26px;
          .bold {
            font-weight: 700;
          }
        }
      }
      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;
          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }
          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }
          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }
          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }
          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }
          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }
          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }
          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }
          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }
          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }
          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }
          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }
          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }
          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }
      .ads {
        margin-top: 5px;
        img {
          opacity: 0.8;
          transition: all 400ms;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>