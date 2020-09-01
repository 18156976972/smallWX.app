import {
  get,
  add,
  reomve
} from '../../utils/db'
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    readNumber: 0,
    guanzhu: true,
    id: '',
    followsId:'',
    nickName:''
  },
  async onLoad(e) {
    var a =wx.getStorageSync('userInfo').nickName
    console.log(a)

    //读取数据
    this.data.id=e.id
    // console.log(this.data.id)
    var result = await get('menu', {
      _id: e.id
    })
    ///////////////////////////导航表头
    wx.setNavigationBarTitle({
      title: result.data[0].menuName
    })
    
    // result.data.forEach(item => {
    //   //  console.log(new Date(Number(item.addtime)).getDay())
    //   var time = new Date(Number(item.addtime)).getDay()
    //   if (time == 0) time = "星期日"
    //   if (time == 1) time = "星期一"
    //   if (time == 2) time = "星期二"
    //   if (time == 3) time = "星期三"
    //   if (time == 4) time = "星期四"
    //   if (time == 5) time = "星期五"
    //   if (time == 6) time = "星期六"
    //   item.addtime = time
    // })

    // 浏览后自动增加
    db.collection('menu').doc(e.id).update({
      data: {
        views: _.inc(1)
      }
    })
    this.setData({
      detail: result.data[0],
      nickName :a
    })

  
  },
  //  进去页面判断有没有关注
  async onShow(){ 
    var openid=wx.getStorageSync('openid')
    var result = await get('follow',{
      menuId:this.data.id,
      _openid:openid
    })
    console.log(openid)
    if(result.data.length>0){
      this.data.followsId =result.data[0]._id
      this.setData({
        guanzhu: false , //显示已经关注
      })
    }

  },
  // 点击 选择关注
  async addGuan1() {
    //上传 收藏量，id,时间戳

    db.collection('menu').doc(this.data.id).update({
      data: {
        follows: _.inc(1)
      }
    })
    var data = {
      menuId: this.data.id,
      addtime: new Date().getTime()
    }
    await add("follow", data)
   var res= await get('menu', {
      _id: this.data.id
    })
    this.setData({
      guanzhu: false,
      detail: res.data[0],
    })
    wx.showToast({
      title: '关注成功',
    })
  },
  //  点击的时候取消收藏
  async addGuan2() {
    //减少收藏

    db.collection('menu').doc(this.data.id).update({
      data: {
        follows: _.inc(-1),
      }
    })
    //删除记录 ,先读取
    var result = await get('follow',{menuId:this.data.id})
    ///////////////////////////////////////////
  //  console.log(result.data[0]._id)
    await reomve("follow",result.data[0]._id)

    var res= await get('menu', {
      _id: this.data.id
    })
    
    this.setData({
      guanzhu: true,
      detail: res.data[0],
    })
    wx.showToast({
      title: '已取关',
    })

  },

})