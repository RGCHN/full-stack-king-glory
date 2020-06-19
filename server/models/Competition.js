//文章模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    categories:[{type:mongoose.SchemaTypes.ObjectID,ref:'Category'}],
    title:{type:String},
    image:{type:String},
},{
    //记录操作时间
    timestamps:true
})

module.exports = mongoose.model('Competition',schema)