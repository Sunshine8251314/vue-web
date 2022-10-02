//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter)
import routes from "@/router/routes";
import store from "@/store";
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
//重写push|replace
//第一个参数：告诉原来的push方法，你往哪里转跳（传递那些参数）
//第二个参数：成功回调
//第三个参数：失败回调
//call||apply的区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不通点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push=function (location,resole,reject){
    if(resole && reject){
        originPush.call(this,location,resole,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace=function (location,resole,reject){
    if(resole && reject){
        originReplace.call(this,location,resole,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

//配置路由(创建并且暴露路由)
let router=new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {y:0}
    }
})

//全局守外：前置守衛（在路由跳轉之前進行判斷）

router.beforeEach(async (to,from,next)=>{
    //to:跳轉到那個路由
    //from:可以獲取到從那個路由跳轉
    //next：放行函數next    next（/路由）放行到指定路由      next（false）
    //用户登陆了才有token，未登录不一定有token
    let token=store.state.user.token;
    //用户信息
    let name=store.state.user.userInfo.name
    //用户已经登陆了
    if(token){
        //用户已经登陆了，还想去login(不能去，停留在首页)
        if(to.path=='/login'||to.path=='/register'){
            next('/home')
        }else{
            //登陆了，但是去的不是登录和注册(判断是否有用户信息)
            if(name){
                next()
            }else{
                try{
                    //如果没有用户信息，派发action让用户存储信息再跳转
                    await store.dispatch('user/getUserInfo')
                    //获取用户信息成功，放行
                    next()
                }catch(error){
                    //token失效了，获取不到用户的信息了
                    //清除token，重新登录
                    store.dispatch('user/logout')
                    next('/login')
                }
            }
        }

    }else{
        //未登录不能去交易的地方【pay|paysuccess|trade|center】----如果去了，要去login登录页面
        if(to.path.indexOf('/trade')!=-1||to.path.indexOf('/pay')!=-1||to.path.indexOf('/paySuccess')!=-1||to.path.indexOf('/center')!=-1){
            next('/login')
        }else{
            next()
        }

    }


});





export default router

