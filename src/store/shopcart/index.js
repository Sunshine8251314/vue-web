//模块的小仓库

import {reqCartList, reqDeleteCartById, reqUpdateCheckedById, } from "@/api";

const shopcart= {
    namespaced: true,//开启命名空间
    //actions:可以书写自己的义务逻辑，也可以处理异步
    actions : {
        //发送请求获取购物车数据
        async getCartList ({commit}){
            //获取购物车数据
            let result=await reqCartList()
            //console.log(result)
            if(result.code==200){
                commit('CARTLIST',result.data)
            }
        },
        //删除购物车产品
        async DeleteCartList({commit},skuId){
            let result=await reqDeleteCartById(skuId)
            if(result.code==200){
                return 'ok';
            }else{
                return Promise.reject(new Error('faile'));
            }
        },
        //修改产品的状态
        async UpdateCheckedById({commit},{skuId,isChecked}){
            let result=await reqUpdateCheckedById(skuId,isChecked)
            if(result.code==200){
                return 'ok';
            }else{
                return Promise.reject(new Error('faile'));
            }
        },
        //删除所有选中产品信息
        deleteAllCheckedCart({dispatch,getters}){
            //上下文对象：conmit【提交mutations】,dispatch[派发action],getters[计算属性]，state【当前仓库的数据】
            //获取购物车全部的产品
            let promiseAll=[]
            getters.cartList.cartInfoList.forEach((item)=>{
               let promise=item.isChecked==1 ? dispatch('DeleteCartList',item.skuId):''
                //将每次的promise添加到数组当中
                promiseAll.push(promise)
            })
            return  Promise.all(promiseAll);
        },
        //修改所有产品的选中状态
        updateAllCheckedCart({dispatch,state},isChecked){
            //数组
            let promiseAll=[]
            state.cartList[0].cartInfoList.forEach(item=>{
                let promise=dispatch('UpdateCheckedById',{skuId:item.skuId,isChecked:isChecked})
                //console.log(promise)
                promiseAll.push(promise);
            })
            //console.log(Promise.all(promiseAll))
            return Promise.all(promiseAll);
        }
    },
    //mutations:修改state的唯一手段
    mutations : {
        CARTLIST(state,cartList){
            state.cartList=cartList
            //console.log(cartList)
        }
    },
    //state:仓库存储数据的地方
    state : {
        cartList:[]
    },
    //getters:理解为计算属性，让组件获取组件数据更加方便(为简化仓库中的数据而生)
    getters : {
        cartList(state){
            return state.cartList[0] ||{}
        },
    },
}
//对外暴露store 类的一个实例
export default shopcart

