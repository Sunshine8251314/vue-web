<template>
<!--  轮播图-->
  <!--              轮播图的地方-->
  <div class="swiper-container"  ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
  name:'Carousel',
  props:['list'],
  watch:{
    //监听bannerList的变化：这条数据发生变化-------由空数组变为有四个元素
    list:{
      //deep:true,
      immediate:true,
      handler(newValue,oldValue){
        //通过watch监听bannerList属性的属性值的变化
        // 如果执行hanndle方法，代表组件的实例身上这个属性的属性已经有了【数组：四个元素】
        //当执行这个结构，只能确定bannerList数据已经有了，但是没办法确认v-for已经执行完毕了【数据有了，但是模板还没加载完毕，结构不完整】
        //v-for执行完毕，才有结构【没办法决定】
        //在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM
        this.$nextTick(()=>{
          //当执行这个结构，确定bannerList数据已经有了，v-for已经执行完毕了【数据有了，模板加载完毕，结构完整】
          var mySwiper = new Swiper (this.$refs.mySwiper, {
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
            /*scrollbar: {
              el: '.swiper-scrollbar',
            },*/
          })
        })
      }
    }
  }
}
</script>