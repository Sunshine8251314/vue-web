<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList " :key=slide.id>
<!--        点击谁谁有样式-->
        <img :src="slide.imgUrl" :class="{active:currentIndex==index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data(){
      return{
        currentIndex:0
      }
    },
    props:['skuImageList'],
    methods:{
      changeCurrentIndex(index){
        //修改响应数据
        this.currentIndex=index
        //通知兄弟组件，当前的索引值为几
        this.$bus.$emit('getIndex',this.currentIndex)
      }
    },
    watch:{
      skuImageList:{
        handler(newvalue,oldvalue){
          this.$nextTick(()=>{
            var mySwiper = new Swiper (this.$refs.mySwiper, {
              loop: true, // 循环模式选项
              // 如果需要分页器
              /*pagination: {
                el: '.swiper-pagination',
              },*/
              //显示几张图片
              slidesPerView:3,
              //每次切换几张图片（在carousel mode下定义slides的数量多少为一组。）
              slidesPerGroup : 3,
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            })
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>