//分类模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // 定义模型字段（这里是分类名称)
    name:{type:String},
    parent:{
        //表示数据库里的Object的ID 不能直接用String
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category'
    }
})
//设置虚拟字段
//子分类
schema.virtual('children',{
    localField:'_id',//內键 Category模型的_id字段
    ref:'Category',//关联的模型
    foreignField:'parent',//外键 关联模型的parent字段
    justOne:false,//表示返回的不是单条数据 是一个数组

})
schema.virtual('newsList',{
    localField:'_id',
    ref:'Article',
    foreignField:'categories',
    justOne:false,

})

module.exports = mongoose.model('Category',schema)