<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{list.name}}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="(navList,index) in list.navList" :key="index">
              <a href="navList.url" data-toggle="tab">{{navList.text}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list" >
                <li v-for="(keyword,index) in list.keywords" :key="index">{{keyword}}</li>
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <div class="floorBanner">
<!--              轮播图的地方-->
              <Carousel :list="list.carouselList"/>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit" >
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"Floor",
  props:['list'],
  mounted() {
    //第一次书写Swiper时候：在mounted当中书写是不可以的，但为什么在这里可以呢
    //第一次书写轮番图的时候，是在当前组件内部发请求，动态渲染结构【前台至少服务器数据要回来】，因此之前的写法不可以
    //这里的数据是父组件通过props传递的，也就是说，在mounted之前已经有数据了，当new swiper的时候结构是完整的
    //现在的这种写法为什么可以：因为请求是父组件发的，父组件通过propos传递过来的，而且结构已经完整的情况下执行mounted
    // var mySwiper = new Swiper (this.$refs.floorSwiper, {
    //   //direction: 'vertical', // 垂直切换选项
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable:true, //点击小圆点切换图片，默认false
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    //   // 如果需要滚动条
    //   /*scrollbar: {
    //     el: '.swiper-scrollbar',
    //   },*/
    // })
  },
  watch:{
  //   //监听bannerList的变化：这条数据发生变化-------由空数组变为有四个元素
  //   bannerList:{
  //     deep:true,
  //     immediate:true,
  //     handler(newValue,oldValue){
  //       //通过watch监听bannerList属性的属性值的变化
  //       // 如果执行hanndle方法，代表组件的实例身上这个属性的属性已经有了【数组：四个元素】
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
  //   }
  }
}
</script>
<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}

</style>