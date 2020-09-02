]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff" ></uni-search-bar>
		<view class="list" v-for="(item,index) in info" :key="item.id" v-if="isShow">
			<view class="row" v-for="(item2,index2) in item.child" :key="item2.goodsname" >
				<view class="products">
					<view class="imagebox" >
						<image :src="baseUrl+item2.img" mode="widthFix"></image>
						<text>{{item2.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text space="nbsp">总计45商品 </text>
					<text>应付金额 ￥56</text>
				</view>
			</view>
			
			<view class="row" v-for="(item,index) in info2" :key="item.id" v-show="isTrue">
				<view class="products">
					<view class="imagebox" >
						<image :src="baseUrl+item.img" mode="widthFix"></image>
						<text>{{item.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text space="nbsp">总计45商品 </text>
					<text>应付金额 ￥56</text>
				</view>
			</view>
		</view>
		
		<view class="list">
		<view class="row" v-for="(item,index) in info2" :key="item.id" v-show="isTrue">
			<view class="products">
				<view class="imagebox" >
					<image :src="baseUrl+item.img" mode="widthFix"></image>
					<text>{{item.goodsname}}</text>
				</view>
			</view>
			<view class="info">
				<text space="nbsp">总计45商品 </text>
				<text>应付金额 ￥56</text>
			</view>
		</view>
		</view>
		<view class="tishi"  v-if="!isShow">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import {
		baseUrl
	} from '@/utils/tools.js'
	import {
		orders,search
	} from '../../utils/api.js'
	export default {
		components: {
			uniSearchBar
		}, 
		data() {
			return {
				info: [],
				info2: [],
				baseUrl: baseUrl,
				isShow: false,
				isTrue:false,
			}
		},
		methods: {
			async searchinfo(e) {
				console.log(e.value)
				var data = {
					keywords: e.value
				}
				var result = await search(data)
				console.log(result[1].data.list)
				this.info2 = result[1].data.list
				if (this.info) {
					this.isTrue=true;
					this.isShow = false;
				}

			}
		},
		async onLoad(e) {
			console.log(e.index)
			var data = {
				uid: uni.getStorageSync('userInfo').uid
			}
			var token={
				authorization: uni.getStorageSync('userInfo').token
			}
			console.log(token)
			var result = await orders(data,token)
			console.log(result)
			this.info = result[1].data.list
			if (this.info) {
				this.isShow = true;
			}
		}
	}
</script>
<style>
	.row {
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}

	.imagebox {
		float: left;
		margin: 10rpx;
	}

	.products {
		overflow: hidden;
	}

	image {
		width: 160rpx;
		margin-left: 10rpx;
	}

	.info {
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
