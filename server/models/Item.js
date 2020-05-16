//物品模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type:String},
    //存放图标地址
    icon:{type: String},
})

module.exports = mongoose.model('Item',schema)