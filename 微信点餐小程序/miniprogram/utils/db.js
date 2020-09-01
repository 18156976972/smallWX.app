const db=wx.cloud.database()
//在异步的回调函数中不用家await

//条件查询
async function get(_collection='',_where={}){
  var result=await db.collection(_collection).where(_where).get()
  return result
}

//添加数据
async function add(_collection="",_data={}){
    return await db.collection(_collection).add({
      data:_data
    })
}
// 修改数据
async function updateRecord(_collection="",id,_data={}){
  return await db.collection(_collection).doc(id).update({
    data:_data
  })
}
// 删除数据   

async function reomve(_collection="",id){
  return await db.collection(_collection).doc(id).remove()
}

export {get,add,updateRecord,reomve}