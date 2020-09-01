<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffffff" class="input_"  @confirm="searchinfo"></uni-search-bar>
		<view class="list" v-if="isShow">
			<view class="row" v-for="item in info" :key='item.id'>
				<image :src="baseUrl+item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>原价￥{{item.market_price}}</text>
					<text>现价￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {baseUrl} from '@/utils/tools.js'
	import {search,getcategoods} from '../../utils/api.js'
	export default {
		data() {
			return {
               info:[],
			   baseUrl:baseUrl,
			   isShow:false
			}
		},
		methods: {
          async searchinfo(e){
			   // console.log(e.value)
			   var data={keywords:e.value}
			  var result= await search(data)
			  // console.log(result[1].data.list)
			  this.info =result[1].data.list
			  if(this.info){
				  this.isShow =true;  
			  }
			  
		   } 
		},
	   async onLoad(e){
		   console.log(e.index)
			var data={ fid :e.index} 
			var result= await getcategoods(data)
			// console.log(result[1].data.list)
			this.info =result[1].data.list
			 if(this.info){
			 	 this.isShow =true;  
			 }
		}
	}
</script>

<style>
	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 160rpx;
	}

	.info {
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
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
