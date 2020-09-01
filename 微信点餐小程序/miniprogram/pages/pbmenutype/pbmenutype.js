import {
  add,get,updateRecord,reomve
} from '../../utils/db'

Page({

  /**
   * 页面的初始数据
   */
  data: {
     isadd:'',
     info:[],
     menuId:"",
     ischangadd:false,
     ischangupdate:false,
  },
  async onLoad(){
    //读取数据
    var openid=wx.getStorageSync('openid')
    var result= await get("menuType",{_openid:openid})
    this.setData({
     info:result.data
   })
  },
   //添加
  async mySubmit(e) {
    if(e.detail.value.menuName.length ==0){
      wx.showToast({
        title: '不能为空',
        icon: 'none',
      })
      return
    }
    var data = {
      typeName: e.detail.value.menuName,
      addtime: new Date().getTime()
    }
    //上传数据
    await add('menuType', data)
     this.setData({
      isadd:''
     })
    wx.showToast({
      title: '添加成功',
    })

    //读取数据
    var openid=wx.getStorageSync('openid')
   var result= await get("menuType",{_openid:openid})
   this.setData({
    info:result.data,
    ischangadd:false,
  })

    
  },
  /////  修 改
  changmenu(e){
    this.setData({
      menuId:e.currentTarget.id,
      ischangupdate:!this.data.ischangupdate,
    })
  },

  async mySubmitchange(e){
    console.log(e)
    if(e.detail.value.changMenuName){
      var data = {
        typeName: e.detail.value.changMenuName,
        addtime: new Date().getTime()
      }
      var id =this.data.menuId
       await updateRecord("menuType",id,data)   
       wx.showToast({
        title: '修改成功',
      })
      // 修改成功后读取数据
      var openid=wx.getStorageSync('openid')
     var result= await get("menuType",{_openid:openid})
     this.setData({
      info:result.data,
      ischangupdate:false,
    })
    }else{
      wx.showToast({
        title: '不能为空',
        icon: 'none',
      })
    }
  },
  //删除数据
  async removeMenu(e){
     let {id,index}=e.currentTarget.dataset
     wx.showModal({
       title:'确定要删除吗？',
       success:res=>{
        //  console.log(res)
        if(res.confirm){
          //删除数据库中的数据
           reomve("menuType",id)  //在异步的回调函数中不用家await
          // 删除页面的数据
          this.data.info.splice(index,1)
          this.setData({
            info:this.data.info
          })
          
        }
       }
     })
     
  },



  //  添加  ，修改  的显示隐藏
  menuAdd(){
      this.setData({
        ischangadd:!this.data.ischangadd,
      })
  }
  

})