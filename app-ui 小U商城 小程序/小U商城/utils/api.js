import {request} from '@/utils/request.js'

//请求
async function  getseckill(){
	return await request("/api/getseckill")
}
//获取商品信息(首页) 靠下面的内容

async function  getindexgoods(){
	return await request("/api/getindexgoods")
}
// 搜索页面
async function  search(data){
	return await request("/api/search",data)
}
//获取一级分类下的所有商品
async function  getcategoods(data){
	return await request("/api/getcategoods",data)
}


// 分类页面
async function  getcates(){
	return await request("/api/getcates")
}
// 单个商品信息页面
async function  getgoodsinfo(data){
	return await request("/api/getgoodsinfo",data)
}


//购物车列表(      有问题)
async function  cartlist(data,token){
	return await request("/api/cartlist",data,'GET',token)
}

//购物车的添加
async function  cartadd(data,token){
	return await request("/api/cartadd",data,'GET',token)
}
//购物车修改（增加，减少）
async function  cartedit(data,token){
	return await request("/api/cartedit",data,'GET',token)
}
//购物车删除
async function  cartdelete(data,token){
	return await request("/api/cartdelete",data,'GET',token)
}


//获取短信
async function  sms(data){
	return await request("/api/sms",data)
}
//用户登录
async function  wxlogin(data){
	return await request("/api/wxlogin",data)
}

//订单的提交
async function  orderadd(params,idstr,token){
	return await request("/api/orderadd",{params:params,idstr:idstr},'GET',{
		authorization:token
	})
}

//检测token是否过期
async function  checktoken(token){
	return await request("/api/checktoken",{},'GET',{
		authorization:token,
		"content-type":'application/x-www-form-urlencoded'
	})
}



export {getseckill,getindexgoods,search,getcates,getgoodsinfo,cartlist,getcategoods,
cartadd,sms,wxlogin,cartedit,orderadd,cartdelete,checktoken}