//当前的模块：api进行统一管理
//引入二次封装的ajax（带有请求，响应的拦截器）
import requests from "@/api/request";
import mockRequests from '@/api/mockAjax'
//三级联动的接口
//请求地址    api/product/getBaseCategoryList   get请求
//对外暴露一个函数，只要对外调用这个函数，就向服务器发送一个请求，获取三级联动列表的数据，当前这个函数只把服务器返回的结果返回即可
export const reqCategoryList = () =>  requests.get(    `/product/getBaseCategoryList`)
    //发送请求:axios发请求返回的是Promise对象

//获取banner（Home首页轮番图的接口）
export const reqgetBannerList = () => mockRequests.get(     '/banner')

//获取floors（Home首页的接口）
export const reqgetFloorList = () => mockRequests.get(    '/floor')

//获取搜索模块的数据  地址：/api/list  请求方式：post  需要带参数
//当前这个接口，给服务器传递参数params[至少是一个空对象]
export const reqGetSearchInfo = (params) =>  requests({url:"/list",method:"post",data:params})

//获取商品详情detail的接口
export const reqGoodsInfo = (skuId) =>  requests( {url:`/item/${ skuId }`,method:'get'})

//将产品添加到购物车中（获取更新某一个产品的个数）
//接口   /api/cart/addToCart/{ skuId }/{ skuNum }   post
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url: `/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

//获取购物车列表的接口
//url:   /api/cart/cartList         get:get
export const reqCartList=()=>requests({url: '/cart/cartList',method:"get"})

//删除购物车产品
//url:   /api/cart/deleteCart/{skuId} get:get
export const reqDeleteCartById=(skuId)=>requests({url: `/cart/deleteCart/${skuId}`,method:"delete"})

//修改商品选中的状态放入接口
//url：/api/cart/checkCart/{skuID}/{isChecked}         metihons:get
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url: `/cart/checkCart/${skuId}/${isChecked}`,method:"get"})

//获取验证码的接口
///api/user/passport/sendCode/{phone}  get
export const reqCode=(phone)=>requests({url: `/user/passport/sendCode/${phone}`,method:"get"})

//注册接口
//api/user/passport/register    post  phone,password,code
export const reqUserRegister=(data)=>requests({url: `/user/passport/register`,data, method:"post"})

//登录接口
///api/user/passport/login  post  data:password,phone
export const reqUserLogin=(data)=>requests({url: `/user/passport/login`,data, method:"post"})

//获取用户信息【带着token向服务器要数据】
//http://182.92.128.115/api/user/passport/auth/getUserInfo
export const reqUserInfo=()=>requests({url: `/user/passport/auth/getUserInfo`, method:"get"})

//退出登录
///api/user/passport/logout           get
export const reqLogout=()=>requests({url: `/user/passport/logout `, method:"get"})

//订单交易信息接口
///api/order/auth/trade   get
export const reqTradeInfo=()=>requests({url: `/order/auth/trade `, method:"get"})

//获取用户地址信息
///api/user/userAddress/auth/findUserAddressList   get
export const reqUserAddressInfo=()=>requests({url: `/user/userAddress/auth/findUserAddressList `, method:"get"})

//提交订单
///api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder=(tradeNo,data)=>requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo} `,data, method:"post"})

//获取订单信息
///api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo=(orderId)=>requests({url: `/payment/weixin/createNative/${orderId} `, method:"get"})

//获取支付状态
///api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayState=(orderId)=>requests({url: `/payment/weixin/queryPayStatus/${orderId} `, method:"get"})

// 获取我的订单列表
///api/order/auth/{page}/{limit}  get
export const reqMyOrder=(page,limit)=>requests({url: `/order/auth/${page}/${limit} `, method:"get"})