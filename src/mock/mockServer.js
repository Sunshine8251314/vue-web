
//先引入mock模块
import Mock from 'mockjs';
//引入json数据格式
//webpack文件默认暴露：json数据格式，图片
import banner from './banner.json';
import floor from './floor.json'

//mock数据  第一个参数：请求地址  第二个参数：请求参数
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
