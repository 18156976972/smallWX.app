import {
  get,
  add
} from '../../utils/db'
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    islist: true,
    listinfo: [],
    /////   ////
    flag: 3,
    info: "",
    //下拉刷新
    pageSize: 4,
    page: 0,
    isDown:false,
    typeName:''
  }, 
  async onLoad(e) {
     //页面加载，获取第一页的内容
    let {
      page,
      pageSize
    } = this.data
    // this.getList(page, pageSize)

    //读取数据
    console.log(e)
    if (e.typeName) {
      this.data.typeName =e.typeName
      // var result = await get("menu", {
      //   typeId: e.typeName
      // })
      // // console.log(result.data) 
      // this.setData({
      //   listinfo: result.data
      // })
      this.getList(page, pageSize,{typeId: e.typeName})
    } 
    if(e.keyword){
      let keyword = e.keyword;
      // console.log(keyword)
      // 查询数据库
      var res = await get("menu", {
        menuName: db.RegExp({ // 数据库关键字查询
          regexp: keyword,
          options: 'i',
        })
      })
      // console.log(res)
      this.setData({
        listinfo: res.data
      })
    }
    if(e.tuijian =='推荐菜谱'){
      var result = await db.collection('menu').orderBy('views','desc').limit(10).get();
      this.setData({
        listinfo: result.data
      })
    }


  },
  //触底加载更多
  onReachBottom() {
    this.data.page += 1
    var pageSize = this.data.pageSize;
    console.log(this.data.typeName)
    this.getList(this.data.page, pageSize,{typeId: this.data.typeName})
  },
  //获取列表的数据
  async getList(page, pageSize,_where) {
    var result = await db.collection('menu').skip(page * pageSize).limit(pageSize).where(_where).get()
    
   
      this.setData({
        //拼接数组
listinfo: this.data.listinfo.concat(result.data)

})
      if(page * pageSize>=this.data.listinfo.length){
        this.setData({
          isDown: true
        })
        return
      }
 
  },

  ///////////////////////////////星星模块
   // 监听字数
   bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({ info: value, noteNowLen: len })

  },
  
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
  }


})