<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" @blur="aaa" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<button @click="getInfo" class="aa" :disabled='dis'>{{text}}</button>
			</view>
			<input type="text" v-model="code"  placeholder="- - - -" maxlength="4"
			 @blur="bbb($event)" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;"
			 @click="doLogin" :disabled='isLogin'>登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	 import {sms,wxlogin} from '../../utils/api.js'
	 export default {
	 	data() {
	 		return {
	            phone:'',
				code:'',
				text:'发送',
				dis:true,
				isLogin:true
	 		}
	 	},
	 	methods: {
			aaa(e){
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					this.dis =true
					wx.showToast({
						title: '手机号码有误，请重填',
					    icon:'none'
					})
				      return false; 
				} 
				this.dis =false
				if(this.phone && this.code){
					this.isLogin=false
	
				}else{
					this.isLogin=true
				}
			},
			bbb(e){
				if(this.phone && this.code){
					this.isLogin=false
					
				}else{
					this.isLogin=true
				}
			},
	    async getInfo(){ 
			console.log('发送信息')
			// console.log(this.phone)
			 var result =await sms({phone:this.phone})
			 var code =result[1].data.list.code;
			 console.log(code)
			 uni.setStorageSync('code',code)
			 // 倒计时
			 this.text=10
			var a= setInterval(()=>{
				// console.log(11)
				this.dis =true
				 this.text =this.text -1
				 if(this.text<=0){
					 this.text ='发送' ;
					 this.dis =false;
					 clearInterval(a)
				 }
			 },1000)
			 // number setInterval(function callback, number delay, any rest)
		 },
		async doLogin(){
			 var code =this.code //用户输入的验证码
			 var codeStorage=uni.getStorageSync('code') 
			 if(code==codeStorage){
				 //执行登录
				 var result =await wxlogin({phone:this.phone});
				 console.log(result)
				 // 将获取的信息缓存 
				 var userInfo =result[1].data.list;
				 wx.setStorageSync('userInfo',userInfo)
				 // 跳转页面
				 wx.reLaunch({
					 url:'/pages/index/index'
				 })
			 }else{
				 wx.showToast({
				 	title: '验证码不正确',
					icon:'none'
				 })
			 }
		 }
		 
		 
	 	}
	 }
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	.aa{
		width: 75px !important;
		height: 30px;
		line-height:30px;
		border: 1px solid #555555;
		text-align: center !important;
		position: absolute;
		right:20px;
		z-index: 100 !important;
	}
</style>
