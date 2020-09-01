import {
  get,add
} from '../../utils/db'
const app = getApp();
import {multiUpload} from '../../utils/tools'
console.log(app.gloablData)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[]
  },
  //读取数据
  async onLoad() {
    //读取数据
    var openid=wx.getStorageSync('openid')
    var result = await get("menuType", {
      _openid: openid
    })
    // console.log(result.data)
    this.setData({
      caipuInfo: result.data
    })
  },
  //把临时路径，渲染到页面  需要用到	files="{{files}}"
  imgBindselect(e){
    //  console.log(e)
    var tempFilePaths =e.detail.tempFilePaths
    var files = tempFilePaths.map(item=>{
      return{
        url:item
      }
    })
    this.setData({
      files   //临时路径存起来
    })
  },
  //点击发布
  async mySubmit(e){
    // 上传图片到数据库
    // console.log(this.data.files)
    var result =await multiUpload(this.data.files)  //将所选的所有本地路径存传过去
    var cloudImage= result
    

     var submitinfo =e.detail.value
     //把用户信息也在数据中中
     var userInfo=wx.getStorageSync('userInfo')
     var data={
      menuName:submitinfo.menuName,  //菜名
      fileIds:this.data.files,    //图片地址
      desc:submitinfo.desc,    // 菜品做法
      addtime: new Date().getTime(),  //时间戳
      typeId:submitinfo.typeId,
      cloudImage:cloudImage,     //图片的云地址
      userInfo:userInfo,
      follows:0,
      views:0
     }

    await add('menu',data)

    wx.reLaunch({
      url: '/pages/personal/personal',
    })
    wx.showToast({
      title: '发布成功',
    })
  
  }
})