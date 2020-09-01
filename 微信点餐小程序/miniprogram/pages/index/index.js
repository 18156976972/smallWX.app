import {
  add,
  get,
  updateRecord,
  reomve
} from '../../utils/db'
const app = getApp();
const db = wx.cloud.database()

Page({
  data: {
    menuinfo: [],
    userInfo: [],
    keyword: "",
    //下拉刷新
    pageSize: 4,
    page: 0,
   
  },
  // 进来加载
  async onLoad() {
    //读取 菜单 数据
    /* var openid=wx.getStorageSync('openid')
   var result = await get("menu", {
   })
   this.setData({
      menuinfo:result.data
   }) */
    //页面加载，获取第一页的内容
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
      menuinfo: this.data.menuinfo.concat(result.data)
    })
  },


  toMenuDetail(e) {
    //  console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/recipeDetail/recipeDetail?id=' + id,
    })
  },
  //搜索栏
  myInput(e) { //输入框输入时，取到输入的值
    this.data.keyword = e.detail.value

  },
  doSearch() {
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?keyword=' + this.data.keyword,
    })
  },
  //跳转到 toTypelist 
  toTypelist() {
    wx.navigateTo({
      url: '/pages/typelist/typelist',
    })
  },
  //到儿童菜谱
  toChildMenu(e) {
    // console.log(e.currentTarget.id)
    var typeName = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?typeName=' + typeName,
    })
  },
  //去养生菜谱
  toYangShen(e) {
    var typeName = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?typeName=' + typeName,
    })
  },
  //去推荐菜谱
  toTuiJian(e) {
    var tuijian = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?tuijian=' + tuijian,
    })
  }


})