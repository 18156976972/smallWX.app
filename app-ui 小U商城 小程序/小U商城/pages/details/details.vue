<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="baseUrl+info.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{info.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{info.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>			
		</view>
		
		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
				  <label class="jian" @click="down">-</label>
				  <label class="zhi">{{number}}</label>
				  <label  class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{info.specsname}}</label>
					<view class="threed3i1" v-for="item in description" :key='item'>{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		 <view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<!-- <image src="/static/detail/2.jpg" mode="aspectFill"/> -->
			<rich-text :nodes="info.description"></rich-text>
		</view>
		
		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>					
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg"/>
					<image src="../../static/detail/pingjia2.jpg"/>
					<image src="../../static/detail/pingjia3.jpg"/>
						
				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="toShopCar">加入购物车</button>
			<button class="footbtn2" @click="toCart">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {baseUrl} from '@/utils/tools.js'
	import{getgoodsinfo,cartadd,checktoken} from '../../utils/api.js'
	export default{
		data(){
			return{
				info:{},
				baseUrl:baseUrl,
				description:[],
				number:1,
				id:''
			}
		},
		methods:{
			//增加购物数量
			add(){
				this.number = this.number+1
			},
			down(){
				if(this.number<=1){
					uni.showToast({
					    title: '宝贝不能再少咯',
						icon:'none',
					    duration: 1000
					});
					return
				}
				this.number = this.number-1
			},
			//添加，跳转到购物车 
			async toShopCar(){ 
				console.log(11)
				var userInfo =uni.getStorageSync('userInfo')
				//判断是否有token，
				if(userInfo.token){
				    //判断token是否过期
					 var overTime=	await checktoken(userInfo.token)
					 if(overTime[1].data.msg){  //登录过期
						 uni.navigateTo({
						 	url:"../send/send"
						 })
						 uni.showToast({
						 	title:overTime[1].data.msg,
						 	icon:'none'
						 })
						 
						 return
					 }
					 
					var number =this.number
					// console.log(this.id)
					var data={
						uid:uni.getStorageSync('userInfo').uid,
						goodsid: this.id,  //商品编号，必填项
						num:this.number
					}
					var token ={
						authorization:uni.getStorageSync('userInfo').token
					}
					var result =await cartadd(data,token)
					console.log(result)
					uni.showToast({
						title:'添加成功',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:"../send/send"
					})
				}
				
			},
			toCart(){
				var userInfo =uni.getStorageSync('userInfo')
				if(userInfo.token){
					uni.reLaunch({
						url:'../cart/cart'
					})
				}else{
					uni.navigateTo({
						url:"../send/send"
					})
				}
				
			}
		},
	async onLoad(e){
			// console.log(e)
			//请求信息
			var data ={id:e.id}
			this.id =e.id
		var result=	await getgoodsinfo(data) 
		// console.log(result[1].data.list[0])
		this.info=result[1].data.list[0]
		this.description=this.info.specsattr.split(',') 
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
	
</style>
	
