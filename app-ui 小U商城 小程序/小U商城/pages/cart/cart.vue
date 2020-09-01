<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in list" :key="item.id">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @change='switchCheck($event,index)' />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="down(index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(index)">+</label>
							</view>
						</view>
					</view>
				</view>

				<view class="cartDel" id="demo2" @click="remove(index)"><label for="">删除</label></view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked='isAllCheck' @click="doAllCheck" />
				<!-- 全选的属性，时一个变量，再计算属性中计算 -->
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{sum}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="toConfirm">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{shopNumber}}}件)</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '@/utils/tools.js'
	import {
		cartlist,
		cartadd,
		cartedit,
		cartdelete
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				list: [],
				sum: 0,
				shopNumber: 0
			}
		},
		methods: {
			//封装，增加，减少
			async comment(index, number) {
				//页面增加/  减少
				if (number) {
					this.list[index].num = this.list[index].num + number;
				}
				//调用接口更新数据
				let {
					id,
					num,
					checked
				} = this.list[index];
				checked = checked ? 1 : 0; //数据库需要的是 1 ，0
				var data = {
					id: id,
					num: num,
					checked: checked,
				}
				var token = {
					authorization: uni.getStorageSync('userInfo').token
				}
				var result = await cartedit(data, token) //修改数据库
				// console.log(result)
			},
			async add(index) {
				this.comment(index, 1) //点击增加
			},
			down(index) {
				if (this.list[index].num <= 1) {
					uni.showToast({
						title: '宝贝不能再少了',
						icon: 'none'
					})
					return
				}
				this.comment(index, -1)
			},
			switchCheck(e, index) { //点击单选
				console.log(e.detail.value)
				console.log(index)
				//当复选框的checked的值改变时,,,,,修改页面的数据
				var value = e.detail.value;
				this.list[index].checked = value;
				//同步数据 ,把数据库中的checked  改了
				this.comment(index) //只传了个下标
			},
			//点击全选
			doAllCheck() {
				this.isAllCheck = !this.isAllCheck
			},
			toConfirm() {
				if(this.list ==null){
					uni.showToast({
						title:'购物车还有没商品，快去看看吧',
						icon:'none'
					})
					return
				}
				//当都是不选的时候 ，不让去结算跳转
				var a=this.list.some(item =>{
					return item.checked == true
				})
				if(a!=true){
					return
				}
				
				// console.log(this.list)
				var arr = []
				this.list.forEach(item => {
					if (item.checked == true) {
						arr.push(item)
						uni.setStorageSync('shopInfo', arr)
						var aa = uni.getStorageSync('shopInfo')
					}
				})
				uni.navigateTo({
					url: '/pages/confirm/confirm'
				})
			},
			remove(index) {
				console.log('删除')
				// console.log(this.list[index].id)
				//确定要删除吗
				uni.showModal({
					title: '你确定要删除吗',
					success: async res => {
						if (res.confirm) {
							console.log('用户点击确定');

							var data = {
								id: this.list[index].id
							}
							var token = {
								authorization: uni.getStorageSync('userInfo').token
							}
							var result = await cartdelete(data, token)

							var data = {
								uid: uni.getStorageSync('userInfo').uid
							}
							var token = {
								authorization: uni.getStorageSync('userInfo').token
							}
							var result = await cartlist(data, token)
							// console.log(result[1].data.list) 
							if (result[1].data.list) {
								result[1].data.list.forEach(item => {
									item.checked = item.checked == 1 ? true : false;
									item.img = baseUrl + item.img
								})
								this.list = result[1].data.list
							} else {
								this.list = result[1].data.list
							}

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			//公共读取 购物车列表
			async readShopCart() {
				var data = {
					uid: uni.getStorageSync('userInfo').uid
				}
				var token = {
					authorization: uni.getStorageSync('userInfo').token
				}
				var result = await cartlist(data, token)
				// console.log(result[1].data.list)
				if (result[1].data.list) {
					result[1].data.list.forEach(item => {
						item.checked = item.checked == 1 ? true : false;
						item.img = baseUrl + item.img
					})
					this.list = result[1].data.list
				} else {
					this.list = result[1].data.list
				}
			}



		},
		async onLoad(e) {
			// console. log(e)
			this.readShopCart()

		},
		async onShow() {
			this.readShopCart()
		},

		//计算属性
		computed: {
			//数值改变时，自动计算，总价格
			total() {
				var sum = 0;
				var shopNumber = 0
				if (this.list) {
					this.list.forEach(item => {
						if (item.checked) {
							sum += item.price * item.num;
							shopNumber = shopNumber + item.num
							// 计算一共多少件商品
						}
					})
					this.sum = sum;
					this.shopNumber = shopNumber
				}

			},
			// 全选 ，全不选
			isAllCheck: {
				get: function() { //其他项（单个复选框）改变，影响  全选项
					// 全为true 则为true, 有一个不是，为false
					// console.log(222)
					if(this.list){
						return this.list.every(item => {
							return item.checked == true
						})
					}
				},
				set: function(val) {
					// console.log(val)   val 拿到的是，点击后的修改掉的值   this.isAllCheck
					//把每个商品的checked状态和全选保持一致
					if(this.list){
						this.list.forEach(item => {
							item.checked = val
						})
					}
				}
			},

		}

	}
</script>

<style>
	@import url('../../common/css/cart.css');

	.scroll-view_H {
		height: 100% !important;
	}

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
