// 链接数据库
const db =wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
     keyword:'',
     arr:[],  //最近搜索
     isShow: false,
     hotSearch:[]
  },
  myInput(e){
    this.data.keyword=e.detail.value
  },
  async onShow(){
    //热门搜索  示例代码：按一个字段排序  'desc'  表示降序序排列
    var result = await db.collection('menu').orderBy('views','desc').limit(6).get();
    console.log(result.data)
    // 读取缓存的arr 搜索过的内容
    var arr =wx.getStorageSync('keyword')||[];
    this.setData({
      arr,
      hotSearch:result.data 
    })
    if(arr.length){
      this.setData({
        isShow :true
      })
    }
     
    
  },
  onSearch(){
     var keyword =this.data.keyword
     //将搜索的数据缓存
     var arr =wx.getStorageSync('keyword')||[]
     var index =arr.findIndex(item=>{
       return item ==keyword
     })
     if(index!=-1){    // 查重，有重复的就删除
       arr.splice(index,1)
     }
     arr.unshift(keyword);  //加在数组前
     //操作后将数据缓存
     wx.setStorageSync('keyword', arr)
     
     // 跳转页面
     wx.navigateTo({
       url: '/pages/recipelist/recipelist?keyword='+keyword,
     })
    //跳转后呈现页面
     


  },
  toMenuDetail(e){
    var id =e.currentTarget.id
     wx.navigateTo({
       url: '/pages/recipeDetail/recipeDetail?id='+id,
     })
  },
  toShopDetail(e){
    console.log(e.currentTarget.id)
    var id =e.currentTarget.id
    wx.navigateTo({
      url: '/pages/recipeDetail/recipeDetail?id='+id,
    })
  },
  toshopList(e){
    console.log(e.currentTarget.id)

    var keyword =this.data.arr[e.currentTarget.id]
     //将搜索的数据缓存
     var arr =wx.getStorageSync('keyword')||[]
     var index =arr.findIndex(item=>{
       return item ==keyword
     })
     if(index!=-1){    // 查重，有重复的就删除
       arr.splice(index,1)
     }
     arr.unshift(keyword);  //加在数组前
     //操作后将数据缓存
     wx.setStorageSync('keyword', arr)
     
     // 跳转页面
     wx.navigateTo({
       url: '/pages/recipelist/recipelist?keyword='+keyword,
     })
    //跳转后呈现页面
  }
})