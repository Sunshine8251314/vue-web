//引入路由组件
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
//二级路由
import myOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder";
//暴露一个数组
export default [
    {
        path:'/home',
        component:()=>import("@/pages/Home"),
        meta:{show:true},
    },
    {
        name:'login',
        path:'/login',
        component:()=>import("@/pages/Login"),
        meta:{show:false},
    },
    {
        path:'/register',
        component:()=>import("@/pages/Register"),
        meta:{show:false},
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:()=>import("@/pages/Search"),
        meta:{show:true},
        //props:true,//布尔形式（路由组件传递propos参数）
        props(route){
            return{
                /*keyword:route.params.keyword ||"",
                category1Id:route.query.category1Id ||"",
                category2Id:route.query.category2Id ||"",
                category3Id:route.query.category3Id ||"",*/
            }
        }  //函数形式（路由组件传递query参数和propos参数）
    },
    {
        path:'/detail/:skuid',
        component:()=>import("@/pages/Detail"),
        meta:{show:false},
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:false},
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta:{show:false},
    },
    {
        name:'trade',
        path:'/trade',
        component:Trade,
        meta:{show:false},
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            //去交易路由，必须从购物车而来，其他不行
            if(from.path=='/shopcart'){
                next();
            }else{
                //终断当前导航
                next(false);
            }
        }
    },
    {
        name:'pay',
        path:'/pay',
        component:Pay,
        meta:{show:false},
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            //去支付路由，必须从交易路由而来，其他不行
            if(from.path=='/trade'){
                next();
            }else{
                //终断当前导航
                next(false);
            }
        }
    },
    {
        name:'paySuccess',
        path:'/paySuccess',
        component:PaySuccess,
        meta:{show:false},
    },
    {
        name:'center',
        path:'/center',
        component:Center,
        meta:{show:false},
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: myOrder,
                meta: {show: false},
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: groupOrder,
                meta: {show: false},
            },
            {
                path:'/center',
                redirect:'/center/myorder',
            },
        ],

    },
    //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path:'/',
        redirect:'/home',
    },
]
