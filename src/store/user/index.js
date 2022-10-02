//登录注册模块
import {reqCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister} from "@/api";

const user={
    namespaced:true,//开启命名空间
    //actions:可以书写自己的义务逻辑，也可以处理异步
    actions:{
        //获取验证码
        async getCode(context,phone) {
            //获取验证码这个接口，把验证码返回，但是正常情况，后台吧验证码发到用户收集上
            let result = await reqCode(phone)
            console.log(result)
            if (result.code == 200) {
                context.commit('GETCODE', result.data)
                //console.log(result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('fail'))
            }
        },
        //用户注册
        async userRegister({commit},user){
            let result=await reqUserRegister(user)
            if(result.code==200){
                //console.log(result)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        //登录业务
        async userLogin({commit},data){
            let result=await reqUserLogin(data)
            //服务器下发token，用户唯一标识（uuid）
            //将来经常通过token找服务器要数据进行展示
            if(result.code==200){
                //用户登录成功且获取到token
                commit('GETTOKEN',result.data.token)
                //持久化存储token
                localStorage.setItem('TOKEN',result.data.token)
                return 'ok'
            }else{
                return  Promise.reject(new Error('fail'))
            }
        },
        //获取用户信息
        async getUserInfo({commit}){
            let result=await reqUserInfo()
            //console.log(result)
            if (result.code==200){
                //提交用户信息
                commit('USERINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('fail'))
            }
        },
        //退出登录
        async logout({commit}){
            //只是向服务器发请求，通知服务器清除token
            let result=await reqLogout()
            if(result.code==200){
                //服务器发送请求后，清除本地缓存
                commit('CLEAR')
                localStorage.removeItem('TOKEN')
                return 'ok'
            }else {
                return Promise.reject(new Error('fail'))
            }
        }

    },
    //mutations:修改state的唯一手段
    mutations:{
        GETCODE(state,code){
            state.code=code
            //console.log(code)
        },
        GETTOKEN(state,token){
            state.token=token
        },
        USERINFO(state,userInfo){
            state.userInfo=userInfo
        },
        //清除本地存储
        CLEAR(state){
            state.userInfo={}
            state.token=''
        }
    },
    //state:仓库存储数据的地方
    state:{
        code:'',
        token:localStorage.getItem('TOKEN'),
        userInfo:{}
    },
    //getters:理解为计算属性，让组件获取组件数据更加方便
    getters:{},

}

export default user
