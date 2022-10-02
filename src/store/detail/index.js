//detail模块的小仓库
import {reqAddOrUpdateShopCart, reqGoodsInfo,} from '@/api';
//封装游客身份模块uuid----->生成随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token'
const detail= {
    namespaced:true,//开启命名空间
    //actions:可以书写自己的义务逻辑，也可以处理异步
    actions:{
        //获取产品信息的action
        async getGoodsInfo ({commit}, skuId) {
            let result=await reqGoodsInfo(skuId);
            //提交数据
            if(result.code==200)
               commit('GETGOODINFO',result.data)
        },
        //产品添加到购物车中
        async AddOrUpdateShopCart ({commit},{skuId,skuNum}){
            //加入购物车以后（发送请求），前台将参数带给服务器
            //服务器写入参数成功后，并没有返回其他的数据，只是返回code==200，代表操作成功，加入购物车
            //加入购物车返回的结构
            //不需要三连环存储
            let result=await reqAddOrUpdateShopCart(skuId,skuNum);
            //console.log(result)
            //判断加入购物车是否成功
            if(result.code==200){
                //加入购物车成功
                return 'OK'
            }else{
                //加入购物车失败
                return Promise.reject(new Error('fail'));
            }

        }
    },
//mutations:修改state的唯一手段
    mutations:{
        GETGOODINFO(state,goodInfo){
            state.goodInfo=goodInfo
            //console.log(goodInfo)
        },
    },
//state:仓库存储数据的地方
    state:{
        //state中的默认初始值别瞎写，服务器返还对象【数组】，默认值为对象【数组】，根据接口返回值初始化
        //三级菜单的数据categoryList
        goodInfo:{},
        //游客临时身份
        uuid_token:getUUID()
    },
//getters:理解为计算属性，让组件获取组件数据更加方便
    getters:{
        //路径导航简化数据
        categoryView(state){
            //空对象的属性underfind
            return state.goodInfo.categoryView ||{}
        },
        //简化产品信息的数据
        skuInfo(state){
            return state.goodInfo.skuInfo ||{}
        },
        //产品售卖属性的简化
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || []
        },
        valuesSkuJson(state){
            return state.goodInfo.valuesSkuJson
        },
        price(state) {
            return state.goodInfo.price
        }
    },

}

export default detail;