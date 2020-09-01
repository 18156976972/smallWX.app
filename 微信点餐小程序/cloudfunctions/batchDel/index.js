// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db =cloud.database();  //拿到数据库的应用

// 云函数入口函数
exports.main = async (event, context) => {
   return await db.collection('usersname').where({nickName:'木木王大可'}).remove()
}