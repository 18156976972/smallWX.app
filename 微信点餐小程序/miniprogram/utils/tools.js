//封装单个上传图片
/* 
   上传文件到云储存
    filePath  文件临时路径
    cloudPath 文件上传服务器后的云端路径
    _filepath   图片本地的路径
*/
async function upload(_filepath){
  var ext=_filepath.split(".").pop()
  var nowtime =new Date().getTime();
   //promise写法
  /* return Promise((resolve,reject)=>{
     wx.cloud.uploadFile({
       cloudPath:nowtime+'.'+ext,
       filePath:_filepath,
       success:res=>{
         resolve(res)
       },
       fail:err=>{
         reject(err)
       }
     })
  }) */

  //高版本wx.cloud.uploadFile 返回的就是一个promise对象
  return await wx.cloud.uploadFile({
    cloudPath:nowtime+"."+ext,
    filePath:_filepath
  })
}

//批量上传数据库  
//tempFilePahrs    这里传的时一个数组对象
//例
async function multiUpload(tempFilePahrs){
  var arr =[]   //定义一个数组
  tempFilePahrs.forEach(item=>{
    var nowtime =new Date().getTime() //定义文件名称
    var ext = item.url.split(".").pop() //文件扩展名   //这里传多个 ，用了 
     var item1 =wx.cloud.uploadFile({
       cloudPath:'image/'+nowtime+"."+ext,
       filePath:item.url     //这里必须时字符串
     })
     arr.push(item1)
  })
  //当所有的上传都完成时，返回一个结果
  var result1 =await Promise.all(arr)  //这时候数组里面存的是对象
  var result = result1.map(item=>{
    return item.fileID
  })
  
  return result;
}
export {upload,multiUpload}