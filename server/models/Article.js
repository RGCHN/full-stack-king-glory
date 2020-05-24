//英雄模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    categories:[{type:mongoose.SchemaTypes.ObjectID,ref:'Category'}],
    title:{type:String},
    body:{type:String},
},{
    timestamps:true
})

module.exports = mongoose.model('Article',schema)