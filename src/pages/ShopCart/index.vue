<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="UpdateCheckedById(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handle('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handle('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet"@click="DeleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @click="updateAllCheckedCart($event)">
        <span >全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">0</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {throttle} from "lodash";
  import {reqUpdateCheckedById} from "@/api";
  export default {
    name: 'ShopCart',
    mounted() {
      this.getDate()
    },
    methods:{
      //获取个人购物车
      getDate(){
        this.$store.dispatch('shopcart/getCartList')
      },
      //修改产品个数，发送请求，修改服务器的参数[节流]
      handle:throttle(async function(type,disNum,cart){
        //传递三个参数：（1）类型type：（2）变化量disnum：（3）产品cart
        //向服务器发请求，修改数量
        switch (type){
          case 'add':
            disNum=1;
                break;
          case 'minus':
            //判断服务器的产品数大于1，才可以减一
            //如果小于1，变化值为0，否则，变化值为-1
            if(cart.skuNum > 1){
              disNum=-1;
            } else{
              disNum=0
            }
            //disNum = cart.disNum > 1 ? -1 : 0;
                break;
          case 'change':
            //用户输入的最终量，如果非法（带有汉子||出现负数），带给服务器的数字为0
            if(disNum==NaN ||disNum<1){
              disNum=0
            }else{
              //正常情况，输入小数
              disNum=parseInt(disNum)-cart.skuNum
            }
            break;
        }
          //发送请求修改数据库的数据
          try {
          //代表修改成功
            await this.$store.dispatch('detail/AddOrUpdateShopCart',{
              skuId:cart.skuId,
              skuNum:disNum,
            });
            //再一次获取数据进行展示
            this.getDate();
          }catch(error){
            alert(error.message)
          }
      },500),
      //删除某一个产品的请求
      async DeleteCartById(cart){
        try {
          //如果删除成功，再次发送请求获取数据
          await this.$store.dispatch('shopcart/DeleteCartList',cart.skuId)
          //发送请求获取数据
          this.getDate()
        }catch (error){
          //如果不成功，提示失败原因
          alert(error.message)
        }
      },
      //修改单个产品的勾选状态
      async UpdateCheckedById(cart,$event){
        //带给服务器的参数isChecked不是布尔值，应该是0或者1
        try {
          //如果修改成功，再次获取数据
          let isChecked=$event.target.checked ? "1":"0";
          await this.$store.dispatch('shopcart/UpdateCheckedById',{skuId:cart.skuId,isChecked:isChecked})
          //再次获取数据
          this.getDate()
        }catch (error){
          alert(error.message)
        }
      },
      //删除所有选中产品（回调没办法收集收集数据）
      async deleteAllCheckedCart(){
        try {
          //派发action
          await this.$store.dispatch('shopcart/deleteAllCheckedCart');
          //再发请求获取购物车列表
          this.getDate();
        }catch (error){
          alert(error.message)
        }
      },
      //勾选全部产品的选中状态
      async updateAllCheckedCart(event){
        let isChecked=event.target.checked?1:0;
        //console.log(checked)
        try{
          await this.$store.dispatch('shopcart/updateAllCheckedCart',isChecked)
          this.getDate()
        }catch (error){
          alert(error.message)
        }
       }
    },
    computed:{
      ...mapGetters('shopcart',['cartList']),
      cartInfoList(){
        return this.cartList.cartInfoList ||[]
      },
      //计算购买商品总价
      totalPrice() {
        let sum = 0
        this.cartInfoList.forEach((item) => {
          sum += item.skuNum * item.skuPrice;
        })
        return sum
      },
      //计算底部的复选框是否勾选
      isAllChecked(){
        //全真返回TRUE，否则返回false
        return this.cartInfoList.every(item=>item.isChecked==1)
      }
      },
    }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


            .item-txt {
              text-align: center;
            }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }
            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }
          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }
          .cart-list-con7 {
            width: 13%;
            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>