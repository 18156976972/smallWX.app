import {
  add,
  get,
  updateRecord,
  reomve
} from '../../utils/db'
var db = wx.cloud.database();

const app = getApp();

Page({

  data: {
    userInfo: {},
    isLogin: false,
    ids: 0,
    caipuInfo: [],
    caidaninfo: [],
    list: [],
    isAdd:true,
    //下拉刷新
    pageSize: 4,
    page: 0,
  },
  aa(){
    this.setData({
      isAdd:true,
    })
  },
  async onLoad() {
    if (app.gloablData.userInfo) {
      this.setData({
        userInfo: app.gloablData.userInfo,
        isLogin: true
      })
    } else {
      app.userInfoReadyCallback = res => { //如果没有值，回头去app.js中取值
        this.setData({
          userInfo: res.userInfo,
          isLogin: true
        })
      }
    }
    //页面加载，获取第一页的内容
    let {
      page,
      pageSize
    } = this.data
    this.getList(page, pageSize)
    //读取 菜单 数据
    /* var openid = wx.getStorageSync('openid')
    console.log(openid)
    var result = await get("menu", {
      _openid: openid
    })
    // console.log(result.data)
    this.setData({
      caidaninfo: result.data
    }) */

  },
  //触底加载更多
  onReachBottom() {
    this.data.page += 1
    var pageSize = this.data.pageSize;
    this.getList(this.data.page, pageSize)
  },
  async getList(page, pageSize) {
    var result = await db.collection('menu').skip(page * pageSize).limit(pageSize).get()
    this.setData({
      //拼接数组
      caidaninfo: this.data.caidaninfo.concat(result.data)
    })
  },
  //用户登录
  myInfo(e) {
    // console.log(e) //得到用户信息
    if (app.gloablData.userInfo) {
      this.setData({
        userInfo: app.gloablData.userInfo,
        isLogin: true
      })
    } else {
      app.onLaunch()
    }
  },

  add() {
    if (this.data.isLogin == false) {
      return
    } else {
      wx.navigateTo({
        url: '/pages/submit/submit',
      })
    }
  },

  //    菜单切换
  change1(e) {
    this.setData({
      ids: e.currentTarget.id
    })
  },

  //  菜  谱 
  async change2(e) {
    this.setData({
      ids: e.currentTarget.id
    })
    //读取数据
    var openid = wx.getStorageSync('openid')
    var result = await get("menuType", {
      _openid: openid
    })
    // console.log(result.data)
    this.setData({
      caipuInfo: result.data
    })

  },

  //关注的公共内容
  async guanzhuCommont() {
    var openid = wx.getStorageSync('openid')
    var result = await get('follow', {
      _openid: openid
    })
    //把所有的menuId 放在一个arr数组中
    var arr = result.data.map(item => {
      return item.menuId
    })
    // 根据menuId数组，获取menu详情 ,一下查找真个数组db.command.in(arr)
    var list = await get('menu', {
      _id: db.command.in(arr)
    })
    //  console.log(list)
    this.setData({
      list: list.data
    })
  },
  // onShow
  async onShow() {
    this.guanzhuCommont()
  },
  //关  注
  async change3(e) {
    this.setData({
      ids: e.currentTarget.id
    })
    //调用的    关注的公共内容 的代码
    this.guanzhuCommont()
  },




  //跳转到提交菜单
  pbmenu() {
    wx.navigateTo({
      url: '/pages/pbmenu/pbmenu',
    })
  },

  //删除菜单里面的
  delmenu(e) {
    // console.log(e.currentTarget.id)
    let {
      id,
      index
    } = e.currentTarget.dataset
    // return
    wx.showModal({
      title: '确定要删除吗？',
      success: async res => {
        if (res.confirm) {
          //删除 图片
          var result = await get("menu", {
            _id: id
          })
          // console.log(result.data[0])
          wx.cloud.deleteFile({
            fileList: result.data[0].cloudImage
          }).then(res => {
            // console.log(res.fileList)
          }).catch(error => {
            console.log(error)
          })



          //删除数据库中的数据
          reomve("menu", id) //在异步的回调函数中不用家await
          // 删除页面的数据
          this.data.caidaninfo.splice(index, 1)
          this.setData({
            caidaninfo: this.data.caidaninfo
          })

        }
      }
    })

  },
  // 跳转到分类
  tofenlei() {
    wx.navigateTo({
      url: '/pages/pbmenutype/pbmenutype',
    })
  },
  //跳转到菜单详情
  toMenuDetail(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/recipeDetail/recipeDetail?id=' + id,
    })
  },
  //分类查看跳转
  slideButtonTap(e) {
    console.log(e)
    var typeName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?typeName=' + typeName,
    })
  }

})