// pages/typelist/typelist.js
import {get} from '../../utils/db'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    keyword:'',
      //下拉刷新
     pageSize: 4,
     page: 0,
  },
  async onLoad(){
  /*  var result= await get("menuType",{})
  //  console.log(result.data)
   this.setData({
    info:result.data
   }) */
   let {
    page,
    pageSize
  } = this.data
  this.getList(page, pageSize)
  },
  //触底加载更多
  onReachBottom() {
    this.data.page += 1
    var pageSize = this.data.pageSize;
    this.getList(this.data.page, pageSize)
  },
  //获取列表的数据
  async getList(page, pageSize) {
    var result = await db.collection('menu').skip(page * pageSize).limit(pageSize).get()
    this.setData({
                   //拼接数组
       info: this.data.info.concat(result.data)
    })
  },
  toMenu(e){
    var typeName= e.currentTarget.id
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?typeName='+typeName,
    })
  },
  //搜索时跳转
  myInput(e){
    this.data.keyword=e.detail.value
  },
  toMenulist(){
    // 跳转页面
    var a =this.data.info.findIndex(item =>{
      return item.typeName ==this.data.keyword
    })
    if(a!=-1){
      var typeName = this.data.keyword
      wx.navigateTo({
        url: '/pages/recipelist/recipelist?typeName='+typeName,
      })
    }else{
      wx.showToast({
        title: '没有这个菜谱哦',
        icon: 'none',
        duration: 1500
      })
    }
    
  }

})