//订单结算模块
import { reqTradeInfo, reqUserAddressInfo, } from "@/api";

const trade={
    namespaced:true,//开启命名空间
    //actions:可以书写自己的义务逻辑，也可以处理异步
    actions:{
        //获取用户地址
        async getUserAddressInfo({commit}){
            let result=await reqUserAddressInfo()
            //console.log(result)
            if (result.code==200){
                commit('ADDRESSLISS',result.data)
                return 'ok'
            }else{
                return Promise.reject(new  Error('fail'))
            }
        },
        //获取商品清单
        async getTradeInfo({commit}){
        let result=await reqTradeInfo()
            if (result.code==200){
                commit('TRADEINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject(new  Error('fail'))
            }
        },

    },
    //mutations:修改state的唯一手段
    mutations:{
        ADDRESSLISS(state,addressInfo){
            state.addressInfo=addressInfo
        },
        TRADEINFO(state,tradeInfo){
            state.tradeInfo=tradeInfo
            console.log(tradeInfo)
        }
    },
    //state:仓库存储数据的地方
    state:{
        addressInfo:[],
        tradeInfo:{}
    },
    //getters:理解为计算属性，让组件获取组件数据更加方便
    getters:{},

}

export default trade