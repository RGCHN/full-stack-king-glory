//分类模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // 定义模型字段（这里是分类名称)
    name:{
        type:String
    },
    parent:{
        //表示数据库里的Object的ID 不能直接用String
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category'
    }

})

module.exports = mongoose.model('Category',schema)