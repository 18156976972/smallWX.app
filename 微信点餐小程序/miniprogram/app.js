//app.js
App({
  onLaunch(){
    wx.getSetting({  //1.看用户是否同意
      success:res=>{
        // console.log(res)
        if(res.authSetting['scope.userInfo']){
           wx.getUserInfo({ //同意，则获取用户信息
             success:res =>{ 
               this.gloablData.userInfo=res.userInfo;
                 // 也可以存在缓存区
               wx.setStorageSync('userInfo', res.userInfo)
            // 如果有人来拿用户信息就给他
               if(this.userInfoReadyCallback){
                 this.userInfoReadyCallback(res)
               }
             }
           })
        }
      }
    })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'test-qyglw',
        traceUser: true,
      })
    }
  // 云函数 
    wx.cloud.callFunction({
       name:"login",  //数据的集合名
       success:res=>{  
          //存在缓存区
          wx.setStorageSync('openid', res.result.openid)
       }
    })
   

  },
  
  gloablData:{
    userInfo:null,
    // openid:null
  }
})

////////////后面改改成，缓存区