<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
		  <view class="logoView">
			<!-- logo -->
			<img class="logo" src="/static/index/logo.jpg" alt="" />
		  </view>
		  <view class="inputView">
			<input class="textinput" style="center" type="text"   placeholder="寻找商品"/>
		  </view>
		</view>
		
		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
		    <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
		        <view class="uni-tab-item"  data-current="0" v-for="(item,index) in navInfo"
					:key="item.id">
		            <text class="uni-tab-item-title uni-tab-item-title-active nav" 
					@click="toSearchInfo(index)">
						{{item.catename}}
					</text>
		        </view>
		    </scroll-view> 
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				
				<swiper-item  v-for=" item in swiperList" :key="item.id">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>
				
				
			</swiper>
		</view>
		
		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
		  <view class="FunctNavLi">
			<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
			<p>限时抢购</p>
		  </view>
		  <view class="FunctNavLi">
		  			<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
		  			<p>积分商城</p>
		  </view>
		  <view class="FunctNavLi">
		  			<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
		  			<p>联系我们</p>
		  </view>
		  <view class="FunctNavLi" @click="toClassify">
		  			<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
		  			<p>限时抢购</p>
		  </view>
		</view>
		
		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
				  <image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
				  <label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
				  <label class="LimitTime">{{hour}} </label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">{{minute}}</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">{{second}}</label>
				  <label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>
			
			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>		
					<!-- <div> -->
					<view class="Cloth">
						<image  src="../../static/index/goods1.jpg" alt="">
					</view>
					
					<!-- </div> -->				
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		  <!-- 轮播图2 -->
		<div class="Swiper2">
		  <image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>
		
		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view :class="[number ==0? 'tag_list active_tag_list':'tag_list'] " @click="change1($event)" id='0'>
					<label for="" >热门推荐</label>
				</view>
				<view :class="[number ==1? 'tag_list active_tag_list':'tag_list']" @click="change2($event)" id='1'>
					<label for="">最新好货</label>
				</view>
				<view :class="[number ==2? 'tag_list active_tag_list':'tag_list']" @click="change3($event)" id='2'>
					<label for="">只看商品</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="(item,index) in goodsinfo[number].content" :key='item.id'>
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="baseUrl+item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.market_price}}</view>
						<view class="yimai">已售{{item.price}}件</view>
						<view class="Immed" @click="toShopDetail(item.id)">立即抢购</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {myRequest,baseUrl} from '@/utils/tools.js'
	import {getseckill,getindexgoods,getcategoods} from '@/utils/api.js'
	export default{
		data() {
		    return {
				navInfo:[],
				swiperList:[],
				hour:'',
				minute:'',
				second:'',
				number:0,
				goodsinfo:[], //商品信息 数组下三个对象
				baseUrl:baseUrl
			};
		  },
		  //方法
		 methods: {
			 //去分类页面
			 toClassify(){
				 uni.navigateTo({
				     url: '/pages/classify/classify'
				 });
			 },
			 //热门推荐模块
			 change1(e){
				  this.number = e.currentTarget.id
			 },
			 change2(e){
			 	     this.number = e.currentTarget.id
			 },
			 change3(e){
			 		  this.number = e.currentTarget.id
			 },
			 toShopDetail(id){
				 // console.log(id)
				 uni.navigateTo({
				     url: '/pages/details/details?id='+id
				 });
			 },
			 toSearchInfo(index){
				 console.log(index) 
				 uni.navigateTo({
				     url: '/pages/search/search?index='+index
				 }); 
			 }
		 },
		 //加载的时候
		async onLoad() {
		    //nav 数据
		    var navInfo =await myRequest("/api/getcate");
			this.navInfo =navInfo[1].data.list
			console.log(navInfo)
			
			
			//请求banner图	
		 	var result =await myRequest("/api/getbanner");
			this.swiperList=result[1].data.list
			this.swiperList.forEach(item=>{
				item.img =baseUrl+item.img
			})
            //限时秒杀
			var  seckill =await getseckill()
			var endtime=seckill[1].data.list[0].endtime
			setInterval( ()=>{
				var nowtime =new Date().getTime(); 
				var distance = endtime -nowtime;
				//变成秒
				distance =Math.floor(distance/1000)
				//小时 分钟  秒
				var hour =Math.floor(distance/3600);
				var minute =Math.floor(distance%3600/60)
				var second =Math.floor(distance%3600%60)
				hour =hour<10 ? '0'+hour :hour;
				minute =minute<10 ? '0'+minute :minute;
				second =second<10 ? '0'+second :second;
				//传给变量
				this.hour =hour
				this.minute =minute
				this.second =second
			},1000)
			//获取商品信息(首页)
			var indexgoods = await getindexgoods()
			this.goodsinfo =indexgoods[1].data.list //三个大的数组
			console.log(this.goodsinfo) 
			
			// var aa = await getcategoods({fid:5}) 
			// console.log(aa)
    			 
		 }
		 
		 
		 
	}
</script>

<style scoped>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
	.nav{
		border-bottom: 0;

	}
	.swiper-item{
		width: 100% !important;
		height: 100% !important;
	}
	.swiper-item image{
		height: 100% !important;
	}
</style>
