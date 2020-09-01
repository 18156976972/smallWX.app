<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view v-for="(item,index) in list" :key="item.id" :class="[number ==index? 'left_list activeList':'left_list']"
			 @click="change(index)">
				<label for="">{{item.catename}}</label>
			</view>

		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="item in shopInfo" :key="item.id" v-show="isShow">
						<!-- 每个最多显示6个 -->
						<view>
							<image :src="baseUrl+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>

			</view>
		</view>



	</view>
</template>

<script>
	import {
		baseUrl
	} from '@/utils/tools.js'
	import {
		getcates
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				list: [],
				number: 0,
				shopInfo:[],
				baseUrl:baseUrl,
				isShow:true
			}
		},
		methods: {
			change(index) {
				// console.log(index)
				this.number = index  ///        有问题
				//找下标 this.number-1
				if(this.list[this.number].children){
					this.isShow=true
					this.shopInfo = this.list[this.number].children
				}else{
					this.isShow=false
					wx.showToast({
						title:'暂无数据',
						icon:"none"
					})
				}
                 //这是个数组
				// console.log(this.shopInfo)
			}
		},
		async onLoad() {
			var result = await getcates()
			console.log(result[1].data.list)
			this.list = result[1].data.list
			//默认显示第一个
			this.shopInfo = this.list[0].children


		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
