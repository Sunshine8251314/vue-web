//home模块的小仓库
import axios from "axios";
import {reqCategoryList, reqgetBannerList, reqgetFloorList} from '@/api';
const home= {
    namespaced:true,//开启命名空间
    //actions:可以书写自己的义务逻辑，也可以处理异步
     actions:{
        //通过api里面的接口函数调用，向服务器发请求，获取服务器的三级菜单category数据
        async categoryList(context){
            let result=await reqCategoryList();
            //提交数据
            if(result.code==200)
                context.commit('CATEGORYLIST',result.data)
        },
         //通过api里面的接口函数调用，向mock发请求，获取服务器的轮番图的bannee数据
         async getBannerList(context){
            //console.log('请求数据了')
             let result=await reqgetBannerList();
             //提交数据
             if(result.code==200)
                 context.commit('BANNERLIST',result.data)
         },
         //通过api里面的接口函数调用，向mock发请求，获取服务器的家用电器floor的数据
         async getFloorList(context){
             //console.log('请求数据了')
             let result=await reqgetFloorList();
             //提交数据
             if(result.code==200)
                 context.commit('FlOORLIST',result.data)
         }
    },
//mutations:修改state的唯一手段
     mutations:{
        CATEGORYLIST(state,categoryList){
            state.categoryList=categoryList.slice(0,16)
            //console.log(categoryList)
        },
         BANNERLIST(state,bannerList){
             state.bannerList=bannerList
             //console.log(bannerList)
         },
         FlOORLIST(state,floorList){
             state.floorList=floorList
             //console.log(floorList)
         },
    },
//state:仓库存储数据的地方
     state:{
        //state中的默认初始值别瞎写，服务器返还对象【数组】，默认值为对象【数组】，根据接口返回值初始化
         //三级菜单的数据categoryList
         categoryList:[],
         //轮播图的数据 bannerList
         bannerList:[],
         //家用电器的数据floorList
         floorList:[]
    },
//getters:理解为计算属性，让组件获取组件数据更加方便
     getters:{},

}



//对外暴露store类的一个实例
export default home
/*{
    state,
    mutations,
    actions,
    getters,
}*/