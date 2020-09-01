<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:悟空</label>	
				<label for="">18301628393</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">花果山水帘洞27号</label>
			</view>
		</view>
		
		<!-- 商品信息 -->
		<view class="carts">
			
			<view class="cartsInfo" v-for='(item,index) in list' :key='item.id'>
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:300</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">  
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="down(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="add(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>		
							
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>
		
		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use" >
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分"/>
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>
		
		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>
		
		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {baseUrl} from '@/utils/tools.js'
	import {orderadd} from '../../utils/api.js'
	export default {
		data() {
			return {
				list:[],
				baseUrl:baseUrl,
				receiveInfo:{
					username:'李四',
					userphone:'13000000000',
					address:'四川成都'
				}
			}
		},
		methods: {
			add(index){
				console.log(index)
				this.list[index].num +=1
				//更新一下缓存信息
				uni.setStorageSync('shopInfo',this.list)
			},
			down(index){
				if(this.list[index].num<=1){
					uni.showToast({
						title:'不能再少了',
						icon:'none'
					})
					return
				}
				this.list[index].num -=1
				uni.setStorageSync('shopInfo',this.list)
			},
			//订单提交
			 async pay(){
				//从缓存中拿到uid 和token
				let{uid,token} =uni.getStorageSync('userInfo');
			
				//拿到接收人的 用户名，电话， 住址
				let{username,userphone,address}=this.receiveInfo;
				//获取总价
				let countmoney=this.allPrice;
				//获取总数量
				let countnumber =this.list.reduce((total,item)=>{
					return (total +=item.num)
				},0);
				console.log(countnumber)
				//获取时间戳
				let addtime = new Date().getTime();
				//整理参数 ，组成一个对象
				let params ={uid,username,userphone,address,countmoney,countnumber,addtime}
				//后端需要一个字符串
				params =JSON.stringify(params);
				
				// 获取购物车id ,转换成字符串，用逗号链接
				let idArr =this.list.map(item=>{
					return item.id;
				}) 
				let idstr =idArr.join(','); 
				var result =await orderadd(params,idstr,token)
				// console.log(result)
				uni.reLaunch({
					url:"../mine/mine"
				})
				uni.showToast({
					title:'提交成功',
					icon:'none'
				})
				
			}
		},
		onLoad(){
			var aa = uni.getStorageSync('shopInfo')
			this.list=aa
			console.log(aa)
		},
		computed:{
			allPrice(){
				//计算总价
				if(this.list){
					return this.list.reduce((total,item)=>{
						return total +=item.price*item.num
					},0)
				}
			
			}
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
