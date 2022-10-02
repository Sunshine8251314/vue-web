//search模块的小仓库
import {reqGetSearchInfo} from '@/api'

const search= {
    namespaced: true,//开启命名空间
    //actions:可以书写自己的义务逻辑，也可以处理异步
    actions : {
        //获取search的数据
        async getSearchList(context,params={}){
            //当前这个reqGetSearchInfo这个函数在调用获取服务器的时候，至少传递一个参数（空对象）
            //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
            let result=await reqGetSearchInfo(params);
            if(result.code==200)
                context.commit('GETSEARCHLIST',result.data)
        }
    },
    //mutations:修改state的唯一手段
    mutations : {
        GETSEARCHLIST(state,searchList){
            state.searchList=searchList
            //console.log(searchList)
        },
    },
    //state:仓库存储数据的地方
    state : {
        searchList:{}
    },
    //getters:理解为计算属性，让组件获取组件数据更加方便(为简化仓库中的数据而生)
    getters : {
        //state为当前仓库的state，并非大仓库中的state
        goodsList(state){
            //假如网络不给力或者没有网，返回underfind
            return state.searchList.goodsList ||[]
        },
        attrsList(state){
            return state.searchList.attrsList||[]
        },
        trademarkList(state){
            return state.searchList.trademarkList||[]
        },
    },
    }
//对外暴露store 类的一个实例
export default search

